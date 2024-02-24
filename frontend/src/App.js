import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Spinner } from "./components/loader/loader";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Spinner/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
