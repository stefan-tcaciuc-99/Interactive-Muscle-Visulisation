import { useState, useEffect } from "react";

const useExerciseData = (exerciseData: any) => {
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [exercises, setExercises] = useState<string[]>([]);

  const selectExerciseType = (exerciseType: string) => {
    setSelectedExerciseType(exerciseType);
  };

  useEffect(() => {
    if (selectedExerciseType) {
      setExercises(exerciseData[selectedExerciseType]);
    } else {
      setExercises([]);
    }
  }, [selectedExerciseType]);
  
  return { selectedExerciseType, selectExerciseType, exercises };
};

export default useExerciseData;
