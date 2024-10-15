// import React from 'react';
// import { useParams } from 'react-router-dom';

// const Restaurant = () => {
//   // Get restaurantId from URL
//   const { id } = useParams<{ restaurantId: string }>();

//   return (
//     <div>
//       <h1>RESTAURANT</h1>
//       <p>Restaurant ID: {id}</p> {/* Display the restaurantId */}
//     </div>
//   );
// };

// export default Restaurant;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import apiClient from '../apiServices'; // Assuming this is your Axios instance

// interface MenuItem {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
// }

// const Restaurant: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await apiClient.get(`/restaurants/${id}/menu`);
//         setMenuItems(response.data);
//       } catch (err) {
//         setError('Failed to load menu items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [id]);

//   if (loading) return <p>Loading menu items...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Restaurant ID: {id}</h1>
//       <h2>Menu Items</h2>
//       <ul>
//         {menuItems.map((menuItem) => (
//           <li key={menuItem.id}>
//             <h3>{menuItem.name}</h3>
//             <p>{menuItem.description}</p>
//             <p>Price: ${menuItem.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // export default Restaurant;
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import MenuItems from '../components/MenuItem'; // Import the MenuItems component

// const Restaurant: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   return (
//     <div>
//       <h1>Restaurant ID: {id}</h1>
//       <MenuItems id={id} />
//     </div>
//   );
// };

// export default Restaurant;
// import React from "react";
// import { useParams } from "react-router-dom";
// import TossedComponent from "../components/TossedComponent";
// import FoodCategories from "../components/FoodCategories";
// import Cart from "../components/Cart";
// import Popular from "../components/Popular";
// import MenuItems from "../components/MenuItem";

// const Restaurant: React.FC = () => {
//   const { id } = useParams<{ id: string }>();

//   return (
//     <div>
//       {/* Top section with TossedComponent and FoodCategories */}
//       <div className="bg-white max-w-screen-2xl mx-auto">
//         <div className="restaurant-container-top grid grid-cols-1">
//           <div className="col-span-1">
//             <TossedComponent />
//             <hr />
//             <FoodCategories />
//           </div>
//         </div>
//       </div>

//       {/* Main Container for Menu and Cart using Grid Layout */}
//       <div className="bg-white p-16 max-w-screen-2xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left side: Menu Items and Popular Section (3/4 columns) */}
//           <div className="col-span-1 lg:col-span-3">
//             <div className="overflow-y-auto">
//               <div className="pt-5">
//                 <h3 className="p-2 font-bold">Popular with other People</h3>
//               </div>
//               <div>
//                 <Popular />
//               </div>
//               <div className="mt-10">
//                 <MenuItems id={id} />
//               </div>
//             </div>
//           </div>

//           {/* Right side: Sticky Cart Section (1/4 column) */}
//           <div className="sticky top-[14px] ">
//           <div className="lg:col-span-1">
//             <Cart id={id} />
//           </div>
//           </div>

//         </div>
//       </div>

//       {/* Custom scrollbar removal */}
//       <style>
//         {`
//           .overflow-y-auto::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

import React from "react";
import { useParams } from "react-router-dom";
import TossedComponent from "../components/TossedComponent";
import FoodCategories from "../components/FoodCategories2";
import Cart from "../components/Cart";
import Popular from "../components/Popular";
import MenuItems from "../components/MenuItem";

const Restaurant: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div className="">
        {/* Top section with TossedComponent and FoodCategories */}

        <TossedComponent />
        <FoodCategories />

        {/* Main Container for Menu and Cart using Grid Layout */}
        <div className="bg-slate-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-8 max-w-screen-2xl mx-auto">
            {/* Left side: Menu Items and Popular Section */}
            <div className="col-span-1 md:col-span-3 lg:col-span-4 xl:col-span-5 2xl:col-span-5">
              <div className="overflow-y-auto sm:width-full md:width-full">
                <div className="pt-5">
                  <h3 className="p-2 font-bold">Popular with other People</h3>
                </div>
                <div>
                  <Popular />
                </div>
                <div className="mt-10 ">
                  <MenuItems id={id} />
                </div>
              </div>
            </div>

            {/* Right side: Sticky Cart Section (hidden on small screens, visible on md and larger screens) */}
            <div className="hidden custom-lg:block lg:col-span-3 xl:col-span-3 2xl:col-span-4 vh-100">
              <Cart id={id} />
            </div>
          </div>
        </div>

        {/* Custom scrollbar removal */}
        <style>
          {`
          .overflow-y-auto::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Restaurant;
