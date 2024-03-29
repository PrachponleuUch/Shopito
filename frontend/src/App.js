import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import axios from "axios";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/profile";

const App = () => {
  // Every http request using axios will have withCredentials set to true by default
  axios.defaults.withCredentials = true
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
