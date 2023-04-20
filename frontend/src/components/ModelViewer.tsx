import React from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import useHighlightMaterial from "../hooks/useHighlightMaterial";
import useMuscleColorUpdates from "../hooks/useMuscleColorUpdates";
import { Paper } from "@mui/material";


interface ModelViewerProps {
  modelViewerRef: React.MutableRefObject<ModelViewerElement | null>;
  onMuscleSelected: (muscle: string | null) => void;
  exerciseCountPerMuscle:Record<string,number>;
}


const ModelViewer: React.FC<ModelViewerProps> = ({ modelViewerRef ,onMuscleSelected,exerciseCountPerMuscle}) => {
  useHighlightMaterial(modelViewerRef,onMuscleSelected);
  useMuscleColorUpdates(modelViewerRef, exerciseCountPerMuscle);

 


  return (
    <Paper elevation={4} sx={{ display: 'inline-block', overflow: 'hidden',padding: "16px", alignItems: "center", justifyContent: "center",marginLeft:"16px"}}>
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
          height: "80vh",
          width: "20vw",
        }}
      />
    </Paper>
  );
};

export default ModelViewer;
