// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchRestaurants } from '../Redux/reducers/restaurantSlicer';
// import { RootState } from '../Redux/store';

// const RestaurantList: React.FC = () => {
//   const dispatch = useDispatch();
//   const { restaurants, status, error } = useSelector((state: RootState) => state.restaurants);
//   const { userId } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     console.log('Dispatching fetchRestaurants');
//     if (userId) {
//       dispatch(fetchRestaurants());
//     }
//   }, [dispatch, userId]);

//   if (status === 'loading') {
//     return <p>Loading restaurants...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Restaurants</h2>
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.id}>{restaurant.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RestaurantList;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurants } from "../Redux/reducers/restaurantSlicer"; // Redux action
// import { RootState } from "../Redux/store";
// import RestaurantCard from "../components/RestaurantCard";

// const RestaurantList: React.FC = () => {
//   const dispatch = useDispatch();
//   const { restaurants, status, error } = useSelector((state: RootState) => state.restaurants);

//   useEffect(() => {
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="restaurant-list pt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {restaurants.map((restaurant) => (
//         <RestaurantCard
//           key={restaurant.id}
//           id={restaurant.id}
//           name={restaurant.name}
//           location={restaurant.location}
//           rating={restaurant.rating}
//           link={`/restaurant/${restaurant.id}`}
//         />
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurants } from "../Redux/reducers/restaurantSlicer"; // Redux action
// import { RootState } from "../Redux/store";
// import RestaurantCard from "../components/RestaurantCard";

// const RestaurantList: React.FC = () => {
//   const dispatch = useDispatch();
//   const { restaurants, status, error } = useSelector((state: RootState) => state.restaurants);

//   useEffect(() => {
//     console.log("Dispatching fetchRestaurants...");
//     dispatch(fetchRestaurants());
//   }, [dispatch]);

//   console.log("Restaurants:", restaurants);
//   console.log("Status:", status);
//   console.log("Error:", error);

//   if (status === "loading") return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="restaurant-list pt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {restaurants.map((restaurant) => (
//         <RestaurantCard
//           key={restaurant.id}
//           id={restaurant.id}
//           name={restaurant.name}
//           location={restaurant.location}
//           rating={restaurant.rating}
//           link={`/restaurant/${restaurant.id}`}
//         />
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../Redux/reducers/restaurantSlicer"; // Redux action
import { RootState } from "../Redux/store";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantList: React.FC = () => {
  const dispatch = useDispatch();
  const { restaurants = [], status, error } = useSelector((state: RootState) => state.restaurants);

  useEffect(() => {
    console.log("Dispatching fetchRestaurants...");
    dispatch(fetchRestaurants());
  }, [dispatch]);

  console.log("Restaurants:", restaurants);
  console.log("Status:", status);
  console.log("Error:", error);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>{error || "An error occurred"}</p>;
  if (status === "idle" && restaurants.length === 0) return <p>No restaurants available</p>;

  return (
    <div className="restaurant-list pb-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          location={restaurant.location}
          rating={restaurant.rating}
          link={`/restaurant/${restaurant.id}`}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
