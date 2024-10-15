import React, { useState, useEffect, useRef } from "react";
import apiClient from "../apiServices";

// Define the category type
interface Category {
  categoryName: string;
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const FoodCategories: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({}); // Store references to category elements

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const categoryName = entry.target.getAttribute("data-category");
              if (categoryName) setSelectedCategory(categoryName);
            }
          });
        },
        { threshold: 0.7 }
      );

      categories.forEach((category) => {
        const element = document.getElementById(category.categoryName);
        if (element) {
          observer.observe(element);
          categoryRefs.current[category.categoryName] = element;
        }
      });

      return () => {
        categories.forEach((category) => {
          const element = categoryRefs.current[category.categoryName];
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }
  }, [categories]);

  const handleNavigation = (category: string) => {
    setSelectedCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visibleCategories = {
    sm: 4,
    md: 6,
    lg: 11,
  };

  const getCategoryStyle = (category: string) => {
    return category === selectedCategory ? "text-white bg-cyan-500 rounded-2xl px-2 py-1" : "text-cyan-500 hover:text-blue-500";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white w-full  top-12 sticky z-40 border-gray-200 shadow-sm grid grid-rows-[73px_1fr] grid-cols-[100%] max-w-screen-2xl  mx-auto">
      {" "}
      <ul className="flex items-center justify-between ml-6 text-[15px]">
        {/* For small screens */}

        <div className="flex space-x-6 sm:flex md:hidden lg:hidden">
          {categories.slice(0, visibleCategories.sm).map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer mx-1 text-sm ${getCategoryStyle(category.categoryName)}`}
              onClick={() => handleNavigation(category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))}
        </div>
        {/* For medium screens */}
        <div className="hidden md:flex lg:hidden items-center space-x-10">
          {categories.slice(0, visibleCategories.md).map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer mx-2 md:mx-2 ${getCategoryStyle(category.categoryName)}`}
              onClick={() => handleNavigation(category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))}
        </div>
        {/* For large screens */}
        <div className="hidden lg:flex items-center space-x-8">
          {categories.slice(0, visibleCategories.lg).map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer mx-2 lg:mx-4 ${getCategoryStyle(category.categoryName)}`}
              onClick={() => handleNavigation(category.categoryName)}
            >
              {category.categoryName}
            </li>
          ))}
        </div>
        {/* Dropdown for remaining categories */}
        <li className="relative ml-auto mr-10">
          <button className="cursor-pointer hover:text-blue-500" onClick={() => setShowDropdown(!showDropdown)}>
            <span className="text-lg text-cyan-500">More</span>
          </button>
          {showDropdown && (
            <>
              {/* For large screens */}
              <ul className="hidden lg:block absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.slice(visibleCategories.lg).map((category, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${getCategoryStyle(category.categoryName)}`}
                    onClick={() => handleNavigation(category.categoryName)}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>

              {/* For medium screens */}
              <ul className="hidden md:block lg:hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.slice(visibleCategories.md).map((category, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${getCategoryStyle(category.categoryName)}`}
                    onClick={() => handleNavigation(category.categoryName)}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>

              {/* For small screens */}
              <ul className="block md:hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.slice(visibleCategories.sm).map((category, index) => (
                  <li
                    key={index}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${getCategoryStyle(category.categoryName)}`}
                    onClick={() => handleNavigation(category.categoryName)}
                  >
                    {category.categoryName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default FoodCategories;
