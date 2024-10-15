// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import RestaurantList from "./pages/RestaurantList";
// import Restaurant from "./pages/Restaurant";
// import SignIn from "./pages/SignIn";


  // interface RefreshTokenResponse {
  //   access_token: string;
  // }

  // Refresh token function
  // const refreshToken = async (): Promise<void> => {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   console.log("----------------------refresh token :-------------------- ", refreshToken);

  //   if (!refreshToken) return;

  //   try {
  //     const response = await apiClient.post<RefreshTokenResponse>("/token", { token: refreshToken });
  //     console.log("authToken :____________________________", response.data.access_token);

  //     localStorage.setItem("authToken", response.data.access_token);
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     localStorage.removeItem("authToken");
  //     localStorage.removeItem("refreshToken");
  //     window.location.href = "/signin";
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshToken();
  //   }, 1 * 60 * 1000); // 1 minute

  //   return () => clearInterval(interval);
  // }, []);

//   return (
//     <Router>
//       <Routes>

//         <Route path="/restaurantList" element={<RestaurantList />} />
//         <Route path="/restaurant/:id" element={<Restaurant/>} />
//                 <Route path="/signin" element={<SignIn />} />
//         {/* Redirect unknown paths to the signin page */}
//         <Route path="*" element={<Navigate to="/signin" />} />
//       </Routes>
//     </Router>
//   );
// };


import React, { useEffect, FC } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignInOption from "./pages/SignInOption";
import Account from "./pages/Account";
import Partner from "./pages/Partner";  // Assuming this should be Partner instead of Account
import Restaurant from "./pages/Restaurant";
import Admin from "./pages/Admin";
import Landing from "./pages/Landing/Landing";
import RestaurantList from "./pages/RestaurantList";
import apiClient from "./apiServices";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("authToken");
  return token ? element : <Navigate to="/signin" />;
};


const App: FC = () => {


interface RefreshTokenResponse {
  access_token: string;
}

const refreshToken = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("----------------------refresh token :-------------------- ", refreshToken);

  if (!refreshToken) return;

  try {
    const response = await apiClient.post<RefreshTokenResponse>("/token", { token: refreshToken });
    console.log("authToken :____________________________", response.data.access_token);

    localStorage.setItem("authToken", response.data.access_token);
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/signin";
  }
};

useEffect(() => {
  const interval = setInterval(() => {
    refreshToken();
  }, 15 * 60 * 1000); // 1 minute

  return () => clearInterval(interval);
}, []);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} /> {/* Add LandingPage route */}
      <Route path="/" element={<Layout />}>
        <Route path="/partner" element={<Partner />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signinOpt" element={<SignInOption />} />
        <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
        <Route path="/restaurantList" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<ProtectedRoute element={<Restaurant />} />} />
        {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
      </Route>
    </Routes>
  </Router>
  );
};

export default App;
