import { useState, useEffect } from "react";

const useExerciseData = (exerciseData: any) => {
  const [selectedExerciseType, setSelectedExerciseType] = useState<
    string | null
  >(null);
  const [exercises, setExercises] = useState<string[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<string[]>([]);

  const selectExerciseType = (exerciseType: string) => {
    setSelectedExerciseType(exerciseType);
  };

  const addExerciseToWorkoutPlan = (exercise: string) => {
    setWorkoutPlan([...workoutPlan, exercise]);
    setExercises(exercises.filter((ex) => ex !== exercise));
  };

  const removeExerciseFromWorkoutPlan = (exercise: string) => {
    setExercises([...exercises, exercise]);
    setWorkoutPlan(workoutPlan.filter((ex) => ex !== exercise));
  };

  useEffect(() => {
    if (selectedExerciseType) {
      setExercises(exerciseData[selectedExerciseType]);
    } else {
      setExercises([]);
    }
  }, [selectedExerciseType]);

  return {
    selectedExerciseType,
    selectExerciseType,
    exercises,
    workoutPlan,
    addExerciseToWorkoutPlan,
    removeExerciseFromWorkoutPlan,
  };
};

export default useExerciseData;
