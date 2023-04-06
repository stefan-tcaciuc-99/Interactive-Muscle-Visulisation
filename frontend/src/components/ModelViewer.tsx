import React from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import useHighlightMaterial from "../hooks/useHighlightMaterial";

interface ModelViewerProps {
  modelViewerRef: React.MutableRefObject<ModelViewerElement | null>;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelViewerRef }) => {
  useHighlightMaterial(modelViewerRef);

  return (
    <model-viewer
      ref={modelViewerRef}
      className="model-viewer"
      alt="A 3D model"
      camera-controls
      disable-tap
      exposure="0.6"
      shadow-intensity="1.5"
      orbit="45deg 55deg 4m"
      style={{
        border: "3px solid #333",
        height: "80vh",
        width: "20vw",
      }}
    />
  );
};

export default ModelViewer;
