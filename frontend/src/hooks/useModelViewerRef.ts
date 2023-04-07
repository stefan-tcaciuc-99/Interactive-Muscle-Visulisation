import {useEffect, useRef } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
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
          const response = await cache.match("/model1.glb");

          if (response) {
            // If the model is found in the cache, set the model URL to the cache URL

            console.log("model found in cache");
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log("setting modelUrl:", url);
            if (modelViewerElement) {
              modelViewerElement.src = url;
            }
          } else {
            // Else if the model is not found in the cache, fetch it from the server and put the model in the cache for future use

            console.log("model not found in cache");
            const response = await fetch("/model1.glb");
            await cache.put("/model1.glb", response.clone());
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            console.log("setting modelUrl:", url);
            if (modelViewerElement) {
              modelViewerElement.src = url;
            }
          }
        } catch (error) {
          // On error loading the model from the cache set the model URL to the default URL

          console.log("Error loading model from cache:", error);
          if (modelViewerElement) {
            modelViewerElement.src = "/model1.glb";
          }
        }
      } else {
        // If caches are not available in the browser, set the model URL to the default

        console.log("caches not available");
        if (modelViewerElement) {
          modelViewerElement.src = "/model1.glb";
        }
      }
    }

    loadModel();
  
  }, []);
  

  return modelViewerElementRef;
}

export default useModelViewerRef;
