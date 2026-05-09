import { useEffect, useState } from "react";
import "./App.css";
import EcommerceDemo from "./components/EcommerceDemo";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import Assignment from "./components/Assignment";

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Assignment />} />
        <Route path="/ecommerce" element={<EcommerceDemo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
