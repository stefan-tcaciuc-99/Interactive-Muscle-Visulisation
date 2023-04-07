import { useEffect, RefObject } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";

export default function useHighlightMaterial(
  modelViewerRef: RefObject<ModelViewerElement>
) {
  useEffect(() => {
    const modelViewerElement = modelViewerRef.current;
    let selectedMaterial: Material | null = null;

    // Highlight the material clicked on
    function highlightMaterial(event: MouseEvent) {
      const currentMaterial = modelViewerElement?.materialFromPoint(
        event.clientX,
        event.clientY
      );

      if (currentMaterial&& currentMaterial.name !== "defaultMat.003") {
        if (currentMaterial === selectedMaterial) {
          // If the clicked material is already selected, deselect it

          currentMaterial.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
          selectedMaterial = null;
        } else {
          // Else, select the clicked material and deselect the previously selected material

          if (selectedMaterial) {
            selectedMaterial.pbrMetallicRoughness.setBaseColorFactor([
              1, 1, 1, 1,
            ]);
          }

          currentMaterial.pbrMetallicRoughness.setBaseColorFactor([
            1, 0, 0.5, 1,
          ]);
          selectedMaterial = currentMaterial;
          console.log("Material selected:", currentMaterial.name);
        }
      }
    }

    if (modelViewerElement) {
      // Add event listener to model viewer element

      modelViewerElement.addEventListener("click", highlightMaterial);
    }

    return () => {
      if (modelViewerElement) {
        // Remove event listener when component unmounts

        modelViewerElement.removeEventListener("click", highlightMaterial);
      }
    };
  }, [modelViewerRef]);
}
