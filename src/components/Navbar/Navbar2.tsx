import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Landing/logo.png";
import search from "../../assets/Restaurant/search.png";
import apiClient from "../../apiServices";
import { useCart } from "react-use-cart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { HiSearch, HiUser, HiHome, HiX, HiLogout } from "react-icons/hi";
import { logout } from "../../Redux/reducers/authSlicer"; // Import your logout action
import { setSelectedRestaurantId, selectSelectedRestaurantId } from "../../Redux/reducers/restaurantSlicer"; // Import setSelectedRestaurantId and selector

interface SearchResult {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addItem } = useCart();

  // Use the selector to get the selected restaurant ID
  const selectedRestaurantId = useSelector(selectSelectedRestaurantId);
  const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {
    // Automatically select the restaurant if there is a selected restaurant ID
    if (selectedRestaurantId) {
      handleRestaurantSelect(selectedRestaurantId);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }

      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedRestaurantId]); // Add selectedRestaurantId to the dependency array

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await apiClient.get("/search", {
          params: {
            query: searchQuery,
            restaurantId: selectedRestaurantId,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching items:", error);
      }
    }
  };

  const handleResultClick = (item: SearchResult) => {
    setSelectedItem(item);
    setIsPopupVisible(true);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const sidebarNav = () => {
    setIsSidebarOpen(false);
    navigate("/signInOpt");
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch your logout action
    navigate("/"); // Optionally navigate to a different page
  };

  const handleRestaurantSelect = (restaurantId: number) => {
    dispatch(setSelectedRestaurantId(restaurantId));
  };

  return (
    <div className="bg-white text-black sticky top-0 z-50  border border-b-1 min-w-full flex ">
      {/* Navbar */}
      <div className="flex flex-1 space-x-10 items-center justify-between  h-16  container mx-auto max-w-screen-2xl w-full">
        {/* Logo Section */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Search Section */}
        <div className="overflow-hidden hidden  md:flex items-center   flex-grow mx-4 border border-gray-400">
          <div className="flex">
            <div className="flex justify-center items-center w-1/10">
              <HiSearch className=" transform -translate-y-1/2 text-gray-400 pt-[5px]" />
            </div>

            <div className="w-full">
              <form onSubmit={handleSearchSubmit} className="flex w-full">
                <input
                  type="text"
                  placeholder="Search.. St.Martine's Lane"
                  className="w-full py-2 rounded focus:outline-none focus:ring-light-blue-500 focus:ring-opacity-50"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div ref={searchDropdownRef} className=" z-50 absolute left-0 mt-2 bg-white border border-gray-300 rounded w-full max-w-lg">
              {searchResults.map((item) => (
                <div key={item.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleResultClick(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button className="border rounded px-4 py-2">
            <img src={search} alt="search" className="h-6 shrink-0" onClick={toggleSearch} />
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-6">
          {/* Account Button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center bg-white border border-gray-200 text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50 py-2 px-4 rounded-sm transition-all"
          >
            <HiUser className="mr-2" style={{ color: "#81D8D0" }} />
            <span className="hidden md:inline">Account</span>
          </button>

          {/* Sign Up or Log In Button */}
          {!(accessToken && userId) ? (
            <NavLink to="/signinOpt">
              <button className="flex items-center bg-white border border-gray-200 text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50 py-2 px-4 rounded-sm transition-all">
                <HiHome className="mr-2" style={{ color: "#81D8D0" }} />
                <span className="hidden md:inline">Sign up or Log in</span>
              </button>
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center bg-white border border-gray-200 text-gray-800 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50 py-2 px-4 rounded-sm transition-all"
            >
              <HiLogout className="mr-2" style={{ color: "#81D8D0" }} />
              <span className="hidden md:inline">Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300"
          style={{ transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          <div className="p-4 border-b">
            <button onClick={toggleSidebar}>
              <HiX style={{ color: "#81D8D0" }} />
            </button>
            {/* Sidebar content */}
          </div>
        </div>
      )}

      {/* Popup */}
      {isPopupVisible && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-100">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            <p>${selectedItem.price}</p>
            <button onClick={() => addItem(selectedItem)} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
              Add to Cart
            </button>
            <button onClick={handleClosePopup} className="bg-red-500 text-white py-2 px-4 rounded mt-4 ml-2">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
