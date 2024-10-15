// import React, { useState, useEffect } from "react";
// import { useCart } from "react-use-cart";
// import apiClient from "../apiServices";

// interface Category {
//   categoryName: string;
// }

// interface Menu {
//   id: number;
//   name: string;
//   price: number;
//   imgUrl: string;
//   description?: string; // Optional description
//   Category: Category;
// }

// const getMenuItems = async (restaurantId: string | number): Promise<Menu[]> => {
//   try {
//     const response = await apiClient.get(`/restaurants/${restaurantId}/menu`);
//     return response.data.menus;
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     throw error;
//   }
// };

// const groupMenusByCategory = (menus: Menu[]): Record<string, Menu[]> => {
//   return menus.reduce((acc, menu) => {
//     const category = menu.Category.categoryName;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(menu);
//     return acc;
//   }, {} as Record<string, Menu[]>);
// };

// interface MenuItemsProps {
//   id: string | number;
// }

// const MenuItems: React.FC<MenuItemsProps> = ({ id }) => {
//   const { addItem } = useCart();
//   const [groupedMenus, setGroupedMenus] = useState<Record<string, Menu[]>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedItem, setSelectedItem] = useState<Menu | null>(null);

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const response = await getMenuItems(id);
//         const grouped = groupMenusByCategory(response);
//         setGroupedMenus(grouped);
//       } catch (err) {
//         setError("Failed to fetch menus");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenus();
//   }, [id]);

//   const handleCardClick = (item: Menu) => {
//     setSelectedItem(item);
//   };

//   const handleClosePopup = () => {
//     setSelectedItem(null);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="mx-2 mt-10 overflow-x-hidden">
//       {Object.keys(groupedMenus).map((categoryName) => (
//         <div key={categoryName} id={categoryName} className="mb-8">
//           <h2 className="text-2xl font-bold pl-5 mb-4">{categoryName}</h2>
//           <div className="flex flex-wrap p-4">
//             {groupedMenus[categoryName].map((item) => (
//               <div key={item.id} className="w-full sm:w-full lg:w-1/2 xl:w-1/2 p-5">
//                 <div
//                   className="flex flex-row items-stretch bg-white h-full border p-3 shadow-lg overflow-hidden cursor-pointer"
//                   onClick={() => handleCardClick(item)}
//                 >
//                   <div className="flex-4 p-4">
//                     <h3 className="text-xl font-semibold">{item.name}</h3>
//                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, minima.</p>
//                     <p className="text-lg text-gray-800">{item.price}$</p>
//                   </div>
//                   <div className="h-full flex items-center">
//                     <img src={item.imgUrl} alt={item.name} className="h-full object-cover" />
//                   </div>
//                   <div className="flex-1 flex items-center justify-center ml-2">
//                     <button
//                       className="border border-gray-300 h-full w-auto px-3"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addItem(item);
//                       }}
//                     >
//                       <p className="text-blue-300 font-extrabold">+</p>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Pop-up Card */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={handleClosePopup}>
//           <div
//             className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
//           >
//             <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>
//               &times;
//             </button>
//             <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
//             <img src={selectedItem.imgUrl} alt={selectedItem.name} className="w-full h-64 object-cover mb-4" />
//             <p className="mb-4">{selectedItem.description || "No description available."}</p>
//             <p className="text-lg font-semibold">Price: ${selectedItem.price}</p>
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               onClick={() => {
//                 addItem(selectedItem);
//                 handleClosePopup();
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuItems;
// import React, { useState, useEffect } from "react";
// import { useCart } from "react-use-cart";
// import apiClient from "../apiServices";

// interface Category {
//   categoryName: string;
// }

// interface Menu {
//   id: number;
//   name: string;
//   price: number;
//   imgUrl: string;
//   description?: string; // Optional description
//   Category: Category;
// }

// const getMenuItems = async (restaurantId: string | number): Promise<Menu[]> => {
//   try {
//     const response = await apiClient.get(`/restaurants/${restaurantId}/menu`);
//     console.log("Fetched menus:", response.data.menus); // Debugging
//     return response.data.menus;
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     throw error;
//   }
// };

// const groupMenusByCategory = (menus: Menu[]): Record<string, Menu[]> => {
//   return menus.reduce((acc, menu) => {
//     const category = menu.Category.categoryName;
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(menu);
//     return acc;
//   }, {} as Record<string, Menu[]>);
// };

// interface MenuItemsProps {
//   id: string | number;
// }

// const MenuItems: React.FC<MenuItemsProps> = ({ id }) => {
//   const { addItem } = useCart();
//   const [groupedMenus, setGroupedMenus] = useState<Record<string, Menu[]>>({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedItem, setSelectedItem] = useState<Menu | null>(null);

//   useEffect(() => {
//     const fetchMenus = async () => {
//       try {
//         const menus = await getMenuItems(id);
//         const grouped = groupMenusByCategory(menus);
//         setGroupedMenus(grouped);
//       } catch (err) {
//         setError("Failed to fetch menus");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenus();
//   }, [id]);

//   const handleCardClick = (item: Menu) => {
//     setSelectedItem(item);
//   };

//   const handleClosePopup = () => {
//     setSelectedItem(null);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="mt-10 overflow-x-hidden ">
//       {Object.keys(groupedMenus).map((categoryName) => (
//         <div key={categoryName} id={categoryName} className="mb-8">
//           <h2 className="text-2xl font-bold pl-5 mb-4">{categoryName}</h2>
//           <div className="flex flex-wrap">
//             {groupedMenus[categoryName].map((item) => (
//               <div key={item.id} className="md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/3 p-2 flex min-h-36">
//               <div
//                 className="flex flex-row bg-white border px-4 py-4 shadow-lg overflow-hidden cursor-pointer flex-1 card" // Added 'card' class here
//                 onClick={() => handleCardClick(item)}
//               >
//                 {/* First div - 75% width */}
//                 <div className="flex flex-col pl-2 pr-2 text-inherit my-0 items-start basis-[70%] flex-1">
//                   <div>
//                   <p className="text-gray-700 font-semibold">{item.name}</p>
//                   </div>
//                   <div>
//                   <p className="text-gray-500">{item.description || "No description available."}</p>
//                   </div>
//                   <div>
//                   <p className="text-gray-500">100 kcal</p>
//                   </div>
//                   <div>
//                   <p className="text-gray-500 ">{item.price}$</p>

//                   </div>
//                 </div>
            
//                 {/* Second div (image) - 16.67% width */}
//                 <div className="flex items-center basis-[25%] h-auto flex-1">
//                   <img 
//                     src={item.imgUrl} 
//                     alt={item.name} 
//                     className="bg-cover  aspect-square h-[100px] w-[100px]"  // Ensure image is square
//                   />
//                 </div>
            
//                 {/* Third div (button) - 8.33% width */}
//                 <div className="flex items-center justify-center ml-1 basis-[5%] flex-1 pl-3">
//                   <button
//                     className="border border-gray-300 px-3 h-full"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       console.log("Adding item:", item);
//                       addItem(item);
//                     }}
//                   >
//                     <p className="text-gray-300 font-extrabold">+</p>
//                   </button>
//                 </div>
//               </div>
//             </div>
            
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Pop-up Card */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={handleClosePopup}>
//           <div
//             className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>
//               &times;
//             </button>
//             <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
//             <img src={selectedItem.imgUrl} alt={selectedItem.name} className="w-full h-64 object-cover mb-4" />
//             <p className="mb-4">{selectedItem.description || "No description available."}</p>
//             <p className="text-lg font-semibold">Price: ${selectedItem.price}</p>
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               onClick={() => {
//                 console.log("Adding selected item:", selectedItem);
//                 addItem(selectedItem);
//                 handleClosePopup();
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MenuItems;
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import apiClient from "../apiServices";

interface Category {
  categoryName: string;
}

interface Menu {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description?: string; // Optional description
  Category: Category;
}

const getMenuItems = async (restaurantId: string | number): Promise<Menu[]> => {
  try {
    const response = await apiClient.get(`/restaurants/${restaurantId}/menu`);
    console.log("Fetched menus:", response.data.menus); // Debugging
    return response.data.menus;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

const groupMenusByCategory = (menus: Menu[]): Record<string, Menu[]> => {
  return menus.reduce((acc, menu) => {
    const category = menu.Category.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(menu);
    return acc;
  }, {} as Record<string, Menu[]>);
};

interface MenuItemsProps {
  id: string | number;
}

const MenuItems: React.FC<MenuItemsProps> = ({ id }) => {
  const { addItem } = useCart();
  const [groupedMenus, setGroupedMenus] = useState<Record<string, Menu[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await getMenuItems(id);
        const grouped = groupMenusByCategory(menus);
        setGroupedMenus(grouped);
      } catch (err) {
        setError("Failed to fetch menus");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [id]);

  const handleCardClick = (item: Menu) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-10 overflow-x-hidden max-w-4xl">
      {Object.keys(groupedMenus).map((categoryName) => (
        <div key={categoryName} id={categoryName} className="mb-8">
          <h2 className="text-2xl font-bold pl-5 mb-4">{categoryName}</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-4">
            {groupedMenus[categoryName].map((item) => (
              <div key={item.id} className="flex flex-col bg-white border px-4 py-4 shadow-lg cursor-pointer">
                <div
                  className="flex flex-row flex-1"
                  onClick={() => handleCardClick(item)}
                >
                  {/* First div - Text Content */}
                  <div className="flex flex-col pl-2 pr-2 text-inherit my-0 items-start flex-1">
                    <div>
                      <p className="text-gray-700 font-semibold line-clamp-2">{item.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 line-clamp-2">{item.description || "No description available."}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">100 kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{item.price}$</p>
                    </div>
                  </div>
  
                  {/* Second div (image) */}
                  <div className="flex items-center w-[100px] h-[100px]">
                    <img 
                      src={item.imgUrl} 
                      alt={item.name} 
                      className="bg-cover aspect-square w-auto"  // Fixed size
                    />
                  </div>
  
                  {/* Third div (button) */}
                  <div className="flex items-center justify-center ml-1 h-[100px] w-[40px] pl-3">
                    <button
                      className="border border-gray-300 h-full w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Adding item:", item);
                        addItem(item);
                      }}
                    >
                      <p className="text-gray-300 font-extrabold">+</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
  
      {/* Pop-up Card */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center" onClick={handleClosePopup}>
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClosePopup}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
            <img src={selectedItem.imgUrl} alt={selectedItem.name} className="w-full h-64 object-cover mb-4" />
            <p className="mb-4">{selectedItem.description || "No description available."}</p>
            <p className="text-lg font-semibold">Price: ${selectedItem.price}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                console.log("Adding selected item:", selectedItem);
                addItem(selectedItem);
                handleClosePopup();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
  };

export default MenuItems;
