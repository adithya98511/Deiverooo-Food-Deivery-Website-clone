// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from './App'
import { store } from './Redux/store'
import { CartProvider } from "react-use-cart";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="7028168825-ulisl403obg8ci746rh78ls5utfeqd3s.apps.googleusercontent.com">
      <CartProvider>
        <App />
        </CartProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
