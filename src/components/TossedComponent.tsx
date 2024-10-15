// import React from "react";
// import TossedImage from "../assets/Restaurant/image.jpeg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import deliveryIcon from "../assets/Restaurant/delivery-man.png";
// import groupIcon from "../assets/Restaurant/people.png";
// import tossedImage from "../assets/Restaurant/image.jpeg";
// import info from "../assets/Restaurant/info.png";
// import right_arrow from "../assets/Restaurant/right-arrow_1.png";

// const TossedComponent : React.FC = () => {
//   return (
//     <div className="bg-white mt-16  p-10 font-serif border-b-2">
//       <div className="flex items-center mb-4 text-cyan-500 cursor-pointer">
//         <FontAwesomeIcon icon={faArrowLeft} className="p-5" />
//         <span>Back</span>
//       </div>
//       <div className="flex flex-col md:flex-row flex-1 items-stretch">
//         <div  className="relative w-full min-h-[200px] md:w-1/3 bg-cover bg-center rounded-md"
//   style={{ backgroundImage: `url(${tossedImage})` }}>
//           <div
//   className="absolute bottom-2 left-2 inline-block bg-white"
//   style={{ display: window.innerWidth <= 920 ? 'block' : 'none' }}
// >
//   <button>
//     <div className="flex flex-row">
//       <div className="pt-2 pr-2 pl-1">
//         <span>
//           <img src={groupIcon} alt="" />
//         </span>
//       </div>
//       <div className="p-1">
//         <span>Start group orders</span>
//       </div>
//     </div>
//   </button>
// </div>

//         </div>

//         <div className="flex flex-col w-full md:w-4/5 lg:flex-row  font-sans">
//           <div className="flex-1 pl-5 lg:w-4/5">
//             <div className="pb-1 ">
//               <span className="text-5xl text-gray-700 font-sans font-bold">Tossed - St Martin's Lane</span>
//             </div>
//             <div className="pt-2 pb-2 text-gray-700 text-2xl">
//               <span>
//                 <span>Chicken</span>
//               </span>
//               <span></span>
//               <span>
//                 <span>. </span>
//               </span>
//               <span>
//                 <span>Salad</span>
//               </span>
//               <span></span>
//               <span>
//                 <span>.</span>
//               </span>
//               <span>
//                 <span>Healthy</span>
//               </span>
//               <span></span>
//             </div>
//             <div className="pb-3">
//               <p>Opens at 11:00·£7.00 minimum·£2.50 delivery</p>
//             </div>
//             <div>
//               <span>
//                 <button>
//                   <div className="flex flex-row">
//                     <div className="p-2">
//                       <span>
//                         {" "}
//                         <img src={info} alt="" />
//                       </span>
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <div>Info</div>
//                       <div>Map, allergens and hygiene</div>
//                     </div>
//                     <div className="p-3">
//                       {" "}
//                       <span>
//                         {" "}
//                         <img src={right_arrow} alt="" />
//                       </span>{" "}
//                     </div>
//                   </div>
//                 </button>
//               </span>
//             </div>
//             <div className="pt-5">
//               <span>
//                 <button>
//                   <div className="flex flex-row">
//                     <div className="p-2">
//                       <span>*</span>
//                     </div>
//                     <div className="flex flex-col items-start">
//                       <div className="text-green-600">4.7 rating</div>
//                       <div>Map, allergens and hygiene</div>
//                     </div>
//                     <div className="p-3">
//                       {" "}
//                       <span>
//                         {" "}
//                         <img src={right_arrow} alt="" />
//                       </span>{" "}
//                     </div>
//                   </div>
//                 </button>
//               </span>
//             </div>
//           </div>

//           <div className=" flex flex-1 flex-col lg:items-end  md:items-start lg:pl-0 pr-1">
//             <div className="mb-2">
//               <button className="py-2 text-black text-lg">
//                 <div className="flex flex-row">
//                   {" "}
//                   <div className="p-1 pr-4">
//                     <img src={deliveryIcon} alt="delivery" />
//                   </div>
//                   <div className="p-1 pr-4"> No Location Selected </div>
//                   <div className="p-1 pr-4">
//                     <span>
//                       <a href="#" className="text-blue-400">
//                         {" "}
//                         Change
//                       </a>
//                     </span>
//                   </div>
//                 </div>
//               </button>
//             </div>
//             <div className="hidden md:block p-1 border border-gray-300 rounded-md bg-white">
//               <button>
//                 <div className="flex flex-row">
//                   <div className="pt-2 pr-2 pl-1">
//                     <span>
//                       <img src={groupIcon} alt="groupOrder" />
//                     </span>
//                   </div>
//                   <div className="p-1">
//                     <span>Start group orders</span>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TossedComponent;
import React, { useState, useEffect } from "react";
import TossedImage from "../assets/Restaurant/image.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import deliveryIcon from "../assets/Restaurant/delivery-man.png";
import groupIcon from "../assets/Restaurant/people.png";
import tossedImage from "../assets/Restaurant/image.jpeg";
import info from "../assets/Restaurant/info-2.png";
import star from "../assets/Restaurant/start-green.png";
import right_arrow from "../assets/Restaurant/right-arrow_1.png";

const TossedComponent: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="top-16 bg-white lg:pl-16 lg:pr-16 md:pl-8 md:pr-8 sm-540:pl-8 sm-540:pr-4 font-serif border-b-2 max-w-screen-2xl mx-auto">
      <div className="flex items-center lg:pt-6 md:pt-6 md:pb-1  sm:pt-6 sm:pb-1 text-cyan-500 cursor-pointer">
        <div>
          <FontAwesomeIcon icon={faArrowLeft} className="pl-1 pr-4 py-2" />
        </div>
        <div>
          <span>Back</span>
        </div>
      </div>

      {/* Main container */}
      <div className="mb-6 grid grid-cols-1 gap-4 items-stretch py-2 sm-540:grid-cols-[30%_1fr] sm-540:gap-6">
        {/* Image section */}
        <div className="relative w-full min-h-[200px] bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${tossedImage})` }}>
          {/* Group button in top section if screen width is 920px or smaller */}
          {windowWidth <= 920 && (
            <div className="absolute bottom-2 left-2 inline-block bg-white">
              <button>
                <div className="flex flex-row">
                  <div className="pt-2 pr-2 pl-1">
                    <span>
                      <img src={groupIcon} alt="Group order" />
                    </span>
                  </div>
                  <div className="p-1">
                    <span>Start group orders</span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-4 w-full font-sans">
          {/* Left column with the description */}
          <div className="flex-1 pl-5">
            <div className="pt-2 pb-3">
              <span className="text-base sm:text-[28px] md:text-2xl lg:text-3xl text-gray-700 font-bold">Tossed - St Martin's Lane</span>
            </div>
            <div className="pt-1 pb-1 text-gray-800 text-[16px]">
              <span>10 - 20 min · Chicken · Salad · Healthy</span>
            </div>
            <div className="pb-2 text-gray-500 text-[18px]">
              <p>0.20 miles away · Closes at 21:00 · £7.00 minimum · £0.79 delivery</p>
            </div>

            {/* Info button */}
            <div>
              <button>
                <div className="flex flex-row">
                  <div className="pl-2">
                    <span className="h-4 w-auto">
                      <img src={info} alt="Info" className="h-5" />
                    </span>
                  </div>
                  <div className="flex flex-col items-start pl-4">
                    <div className="text-[16px]">Info</div>
                    <div className="text-[14px]">Map, allergens, and hygiene</div>
                  </div>
                  <div className="p-3">
                    <span>
                      <img src={right_arrow} alt="Arrow" />
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Rating button */}
            <div className="pt-1">
              <button>
                <div className="flex flex-row">
                  <div className="p-2">
                    <span>
                      <img src={star} alt="" className="h-4" />
                    </span>
                  </div>
                  <div className="flex flex-col items-start pl-4">
                    <div className="text-green-600 text-[16px]">4.7 rating</div>
                    <div className="text-[14px]">Map, allergens, and hygiene</div>
                  </div>
                  <div className="p-3">
                    <span>
                      <img src={right_arrow} alt="Arrow" />
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right column with delivery and group orders */}
          <div className="flex flex-col xl:items-end lg:items-start lg:pl-0 pr-1">
            <div className="text-[16px]">
              <div className=" text-black text-lg">
                <div className="flex flex-row">
                  <div className="pr-1 pl-6">
                    <img src={deliveryIcon} alt="delivery" className="h-6 w-6 " />
                  </div>
                  <div className="pr-4 pl-4 text-[18px]">Deliver in 10 - 20 min</div>
                  <button className="pr-4">
                    <span>
                      <a href="#" className="text-blue-400">
                        Change
                      </a>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Group button in bottom section if screen width is larger than 920px */}
            {windowWidth > 920 && (
              <div className="ml-4 mt-3 pb-1 pt-1 pl-2 pr-2 border border-gray-300 rounded-md bg-white text-[16px]">
                <button>
                  <div className="flex flex-row">
                    <div className="pt-1 pr-2 pl-1">
                      <span>
                        <img src={groupIcon} alt="Group order" />
                      </span>
                    </div>
                    <div className="h-2">
                      <span>Start group orders</span>
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TossedComponent;
