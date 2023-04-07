import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import useModelViewerRef from "./hooks/useModelViewerRef";
import Login from "./components/Login";
import Register from "./components/Register";
import "./app.css";

function HomePage() {
  const modelViewerElementRef = useModelViewerRef();

  return (
    <div className="parent">
      <div className="div1">
        <ModelViewer modelViewerRef={modelViewerElementRef} />
        <div className="div2"></div>
        <div className="div3"></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
