import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import apiClient from "../apiServices";

const SignInOption: React.FC= () => {
  const navigate = useNavigate();

  const handleNavigationToSignIn = () => {
    navigate("/signin");
  };
  
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const { access_token } = response;
      try {
        const res = await apiClient.post("/auth/google", { token: access_token });
        localStorage.setItem("authToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        window.location.href = "/restaurantList";
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
  });
  return (
    <div className="mt-16 bg-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-[550px] mx-auto">
        <div>
          <p className="text-2xl font-bold">Sign up or log in</p>
        </div>

        <div className="flex bg-blue-700 text-white font-bold rounded-md py-1 my-5 justify-center items-center">
          <FontAwesomeIcon icon={faFacebook} />
          <button className="p-4 flex items-center justify-center">Continue with Facebook</button>
        </div>
        <div className="flex bg-white text-black font-bold rounded-md py-1 border border-2 border-gray-500 my-5 justify-center items-center">
          <FontAwesomeIcon icon={faGoogle} />
          <button
            className="p-4 flex items-center justify-center"
            onClick={() => {
              googleLogin();
            }}
          >
            Continue with Google
          </button>
        </div>
        <div className="flex bg-black text-white font-bold rounded-md py-1 my-5 justify-center items-center">
          <FontAwesomeIcon icon={faApple} />
          <button className="p-4 flex items-center justify-center">Continue with Apple</button>
        </div>

        <div className="flex items-center justify-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex text-white bg-emerald-300 font-bold rounded-md my-5 justify-center items-center">
          <FontAwesomeIcon icon={faEnvelope} />
          <button
            className="p-4 flex items-center justify-center"
            onClick={() => {
              handleNavigationToSignIn();
            }}
          >
            Continue with email
          </button>
        </div>
        <div>
          <p>
            By continuing you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-500">
              T&Cs
            </a>
            . Please also check out our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-500">
              privacy Policy
            </a>
            . We use your data to offer you a personalised experience and to better understand and improve our services.{" "}
            <a href="#" className="text-blue-400 hover:text-blue-500">
              For more information see here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInOption;
