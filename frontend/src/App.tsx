import React from "react";
import ModelViewer from "./components/ModelViewer";
import useModelViewerRef from "./hooks/useModelViewerRef";
import "./app.css";

function App() {
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

export default App;
