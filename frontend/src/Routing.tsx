import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTemplate from "./pages/addTemplate";
import Home from "./pages/Home";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddTemplate" element={<AddTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
