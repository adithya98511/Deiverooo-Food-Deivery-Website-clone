// // import React, { useState, FormEvent } from "react";
// // import { useNavigate } from "react-router-dom";
// // import apiClient from "../apiServices";

// // function SignIn() {
// //   const [email, setEmail] = useState<string>("");
// //   const [password, setPassword] = useState<string>("");
// //   const [error, setError] = useState<string>("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();

// //     setError("");

// //     if (!email || !password) {
// //       setError("Both fields are required.");
// //       return;
// //     }

// //     try {
// //       const response = await apiClient.post<{ access_token: string; refresh_token: string }>("/login", { email, password });

// //       if (response.status === 200) {
// //         localStorage.setItem("authToken", response.data.access_token);
// //         localStorage.setItem("refreshToken", response.data.refresh_token);
// //         navigate("/restaurant");
// //       }
// //     } catch (err: any) {
// //       if (err.response && err.response.data) {
// //         setError(`Error: ${err.response.data.error}`);
// //       } else {
// //         setError("Something went wrong. Please try again.");
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //         <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
// //           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

// //           {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //             </div>

// //             <div className="mb-6">
// //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700">
// //                 Sign In
// //               </button>
// //             </div>
// //           </form>

// //           <p className="mt-6 text-center">
// //             Don't have an account?{" "}
// //             <a href="/signup" className="text-blue-500 hover:underline">
// //               Sign Up
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default SignIn;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../Redux/reducers/authSlicer';
// import { RootState } from '../Redux/store';

// const SignIn: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Hook for navigation

//   const { userId, status, error } = useSelector((state: RootState) => state.auth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   // Navigate to /restaurant if the userId is set (user logged in)
//   useEffect(() => {
//     if (userId) {
//       navigate('/restaurantList'); // Redirect to /restaurant
//     }
//   }, [userId, navigate]);

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
//       </form>

//       {status === 'loading' && <p>Logging in...</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default SignIn;
// import React, { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../apiServices";

// const SignIn: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Both fields are required.");
//       return;
//     }

//     try {
//       const response = await apiClient.post<{ access_token: string; refresh_token: string }>("/login", { email, password });

//       if (response.status === 200) {
//         localStorage.setItem("authToken", response.data.access_token);
//         localStorage.setItem("refreshToken", response.data.refresh_token);
//         navigate("/restaurantList");
//       }
//     } catch (err: any) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.error || "Error occurred.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700">
//                 Sign In
//               </button>
//             </div>
//           </form>

//           <p className="mt-6 text-center">
//             Don't have an account?{" "}
//             <a href="/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/reducers/authSlicer';
import { RootState } from '../Redux/store'; // Adjust the import path to where your store is defined
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      if (result.userId) {
        navigate('/restaurantList');
      }
    } catch (err: any) {
      setError(err || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {authState.status === 'loading' && <p className="text-center mb-4">Logging in...</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-6 text-center">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

