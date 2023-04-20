import { useState, useEffect } from "react";
import { getExercisesBySelection } from "../services/apiService";
import { ExerciseData } from "../components/ExerciseList";

const useExerciseData = (exerciseData: any) => {
  
  const [selectedExerciseType, setSelectedExerciseType] = useState<
    string | null
  >(null);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<ExerciseData[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const selectExerciseType = (exerciseType: string|null) => {
    setSelectedExerciseType(exerciseType);
  };

  const selectMuscle = (muscle: string|null) => {
    setSelectedMuscle(muscle);
  };

  const addExerciseToWorkoutPlan = (exercise: ExerciseData) => {
    setWorkoutPlan([...workoutPlan, exercise]);
    setExercises(exercises.filter((ex) => ex.Exercise_Id !== exercise.Exercise_Id));
  };
  
  const removeExerciseFromWorkoutPlan = (exercise: ExerciseData) => {
    setExercises([...exercises, exercise]);
    setWorkoutPlan(workoutPlan.filter((ex) => ex.Exercise_Id !== exercise.Exercise_Id));
  };
  

  useEffect(() => {
    if (selectedExerciseType && selectedMuscle) {
      getExercisesBySelection(selectedMuscle, selectedExerciseType).then((response) => {
        setExercises(response);
      });
    } else {
      setExercises([]);
    }
  }, [selectedExerciseType, selectedMuscle]);


  return {
    selectedExerciseType,
    selectExerciseType,
    selectedMuscle,
    selectMuscle,
    exercises,
    workoutPlan,
    addExerciseToWorkoutPlan,
    removeExerciseFromWorkoutPlan,
  };
};

export default useExerciseData;
