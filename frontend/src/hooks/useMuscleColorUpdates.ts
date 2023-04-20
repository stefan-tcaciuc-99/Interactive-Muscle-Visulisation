import { useEffect } from "react";
import type { ModelViewerElement } from "@google/model-viewer";

export const getMuscleColor = (count: number): string | null => {
  if (count === 0) return null;
  if (count === 1) return "rgba(144, 238, 144, 0.3)"; // Light green
  if (count === 2) return "rgba(60, 179, 113, 0.3)"; // Medium green
  if (count === 3) return "rgba(34, 139, 34, 0.3)"; // Dark green
  if (count === 4) return "rgba(255, 140, 0, 0.3)"; // Orange
  return "rgba(255, 0, 0, 0.3)"; // Red
};


export default function useMuscleColorUpdates(
  modelViewerRef: React.MutableRefObject<ModelViewerElement | null>,
  exerciseCountPerMuscle: Record<string, number>
) {
  useEffect(() => {
    const modelViewerElement = modelViewerRef.current;

    const updateMuscleColors = async () => {
      if (modelViewerElement) {
        await modelViewerElement.updateComplete;
        const model = modelViewerElement.model;
        const materials = model ? model.materials : [];
        materials.forEach((material) => {
          if (material.name !== "default") {
            const count = exerciseCountPerMuscle[material.name] || 0;
            const color = getMuscleColor(count);
            console.log(`Updating color for ${material.name}:`, color);
            if (color) {
              material.pbrMetallicRoughness.setBaseColorFactor(color);
            } else {
              material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
            }
          }
        });
      }
    };
  
    updateMuscleColors();
  }, [modelViewerRef, JSON.stringify(exerciseCountPerMuscle)]);
}
