import React from "react";

import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductByIdPage from "./Pages/ProductByIdPage";
import CartPage from "./Pages/CartPage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import StartPage from "./Pages/StartPage";
import OrderPage from "./Pages/OrderPage";
import { AuthContext } from "./Context/auth-context";
import { useAuth } from "./Hooks/auth-hook";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

  let router;
  if(!userId){
    router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" elemenet={<StartPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="product/:pid" element={<ProductByIdPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="orders" element={<OrderPage />} />
        </Route>
      )
    )
    }else{
      router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" elemenet={<StartPage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="product/:pid" element={<ProductByIdPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<OrderPage />} />
          </Route>
        )
      )
    }


  return (
    <>
      <AuthContext.Provider  value={{ isLoggedIn: !!token, token: token,userId: userId,login: login,logout: logout}}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
