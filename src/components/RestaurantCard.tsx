import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedRestaurantId } from "../Redux/reducers/restaurantSlicer";

interface RestaurantCardProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  link: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ id, name, location, rating, link }) => {
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setSelectedRestaurantId(id)); 
  };

  const cardClasses =
    id === 1
      ? 'block bg-white p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-light-blue-300'
      : 'block bg-white p-4 m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow';

  return (
    <Link to={link} className={cardClasses} onClick={handleCardClick}>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{location}</p>
      <p className="text-blue-400">Rating: {rating}</p>
      <p className="text-gray-400">Restaurant ID: {id}</p>
    </Link>
  );
};

export default RestaurantCard;
