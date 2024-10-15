import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "react-use-cart";
import plus from "../assets/Restaurant/plus_1.png";

const settings = {
  accessibility: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6.5,
  arrows: true,
  slidesToScroll: 1,
  cardMargine: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const data = [
  {
    id: 1,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=4d7808ff-428f-4cbe-84dd-e364e3adc6ea&scope=grid", // Replace with a valid image URL
  },
  {
    id: 2,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=9d1f8cd0-76e1-439d-a87e-4075a6a782b2&scope=grid", // Replace with a valid image URL
  },
  {
    id: 3,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=fdae0590-9d7b-45f3-8745-eef09492572f&scope=grid", // Replace with a valid image URL
  },
  {
    id: 4,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=3c735e84-07b4-47d6-8541-9f67adc95f2d&scope=grid", // Replace with a valid image URL
  },
  {
    id: 5,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl: "https://tosseduk.com/wp-content/uploads/2019/11/201809_parmesanchickensalad_RGB.jpg", // Replace with a valid image URL
  },
  {
    id: 6,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=5a8aad7f-56db-4d11-9e74-49e717bcce87&scope=grid", // Replace with a valid image URL
  },
  {
    id: 7,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=e9c3bcb8-aab2-485e-bc02-dc3be5f70ff7&scope=grid", // Replace with a valid image URL
  },
  {
    id: 8,
    name: "Salad",
    calory: "150 kcal",
    price: "$7.99",
    imageUrl:
      "https://multitenant.vmos-static.com/cdn-cgi/image/fit=cover,width=960/https://media-multitenant.vmos-static.com/media/v1/media?entityUUID=9d1f8cd0-76e1-439d-a87e-4075a6a782b2&scope=grid", // Replace with a valid image URL
  },

  // Add more items as needed
];

const Popular = () => {
  const { addItem } = useCart();
  return (
    <div className="overflow-x-slick-hidden">
      <div className="bg-transparent  md:w-full lg:w-3/4 mx-auto">
        {" "}
        {/* Set width with responsive classes */}
        <Slider {...settings}>
          {data.map((menu, index) => (
            <div
              className={`flex h-auto text-sm text-gray-500 bg-white border shadow-lg ${index === data.length - 1 ? "blur" : ""}`}
              key={menu.id}
              style={{ width: "calc(100% * 0.15)" }}
            >
              <div
                className="h-[140px] w-full flex justify-center"
                style={{
                  backgroundImage: `url(${menu.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="flex flex-col justify-start items-start gap-1 p-3">
                <p className="font-bold text-lg text-gray-700 pb-2">{menu.name}</p>
                <p className="text-gray-500">{menu.calory}</p>
                <p className="text-gray-600 font-semibold">{menu.price}</p>
                <div className="flex justify-center item-center w-full border border-gray-300">
                  <button
                    className="bg-white text-gray-300 hover:bg-blue-600 transition"
                    onClick={() => {
                      addItem(menu);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Popular;
