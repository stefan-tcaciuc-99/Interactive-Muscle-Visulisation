import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import useModelViewerRef from "./hooks/useModelViewerRef";
import Login from "./components/Login";
import Register from "./components/Register";
import "./app.css";

function App() {
  const modelViewerElementRef = useModelViewerRef();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="parent">
            <div className="div1">
              <ModelViewer modelViewerRef={modelViewerElementRef} />
              <div className="div2"></div>
              <div className="div3"></div>
            </div>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
