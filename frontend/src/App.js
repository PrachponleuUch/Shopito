import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/home";
import Header from "./components/header/header";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
