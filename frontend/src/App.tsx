import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "@google/model-viewer";
import type { ModelViewerElement } from "@google/model-viewer";
import "./app.css";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";

function useModelViewerRef() {
  const modelViewerElementRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    console.log("useModelViewer start");
    const modelViewerElement = modelViewerElementRef.current;

    async function loadModel() {
      if ("caches" in window) {
        // Check if caches are available in the browser

        try {
          const cache = await caches.open("model-cache");
          const response = await cache.match("/untitled.glb");

          if (response) {
            // If the model is found in the cache, set the model URL to the cache URL

            console.log("model found in cache");
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log("setting modelUrl:", url);
            if (modelViewerElement) {
              modelViewerElement.src = url;
              modelViewerElement.requestUpdate();
            }
          } else {
            // Else if the model is not found in the cache, fetch it from the server and put the model in the cache for future use

            console.log("model not found in cache");
            const response = await fetch("/untitled.glb");
            await cache.put("/untitled.glb", response.clone());
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log("setting modelUrl:", url);
            if (modelViewerElement) {
              modelViewerElement.src = url;
              modelViewerElement.requestUpdate();
            }
          }
        } catch (error) {
          // On error loading the model from the cache set the model URL to the default URL

          console.log("Error loading model from cache:", error);
          if (modelViewerElement) {
            modelViewerElement.src = "/untitled.glb";
            modelViewerElement.requestUpdate();
          }
        }
      } else {
        // If caches are not available in the browser, set the model URL to the default

        console.log("caches not available");
        if (modelViewerElement) {
          modelViewerElement.src = "/untitled.glb";
          modelViewerElement.requestUpdate();
        }
      }
    }

    loadModel();
  }, []);

  return modelViewerElementRef;
}

function App() {
  const [serverMessage, setServerMessage] = useState("");
  const modelViewerElementRef = useModelViewerRef();
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );

  useEffect(() => {
    const modelViewerElement = modelViewerElementRef.current;

    // Highlight the material clicked on
    function highlightMaterial(event: MouseEvent) {
      const currentMaterial = modelViewerElement?.materialFromPoint(
        event.clientX,
        event.clientY
      );

      if (currentMaterial != null) {
        if (currentMaterial === selectedMaterial) {
          // If the clicked material is already selected, deselect it

          currentMaterial.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
          setSelectedMaterial(null);
        } else {
          // Else, select the clicked material and deselect the previously selected material

          if (selectedMaterial != null) {
            selectedMaterial.pbrMetallicRoughness.setBaseColorFactor([
              1, 1, 1, 1,
            ]);
          }

          currentMaterial.pbrMetallicRoughness.setBaseColorFactor([1, 0, 0.5, 1]);
          setSelectedMaterial(currentMaterial);
          console.log("Material selected:", currentMaterial.name);

        }
      }
    }

    if (modelViewerElement != null) {
      // Add event listener to model viewer element
      modelViewerElement.addEventListener("click", highlightMaterial);
    }

    return () => {
      if (modelViewerElement != null) {
        // Remove event listener when component unmounts
        modelViewerElement.removeEventListener("click", highlightMaterial);
      }
    };
  }, [modelViewerElementRef, selectedMaterial]);

  function sendMessageToServer() {
    axios
      .get("/api")
      .then((response) => {
        setServerMessage(response.data);
      })
      .catch((error) => {
        console.log("Error fetching message:", error);
      });
  }

  return (
    <div className="parent">
      <div className="div1">
        <model-viewer
          ref={modelViewerElementRef}
          className="model-viewer"
          alt="A 3D model"
          camera-controls
          exposure="0.6"
          shadow-intensity="1.5"
          orbit="45deg 55deg 4m"
        />
        <div className="div2"></div>
        <div className="div3">
          <button onClick={sendMessageToServer}>Send message to server</button>
          <p>{serverMessage}</p>{" "}
        </div>
      </div>
    </div>
  );
}
export default App;
