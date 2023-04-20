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
  const [exerciseCountPerMuscle, setExerciseCountPerMuscle] = useState<
    Record<string, number>
  >({});

  const selectExerciseType = (exerciseType: string | null) => {
    setSelectedExerciseType(exerciseType);
  };

  const selectMuscle = (muscle: string | null) => {
    setSelectedMuscle(muscle);
  };

  const updateExerciseCountPerMuscle = (
    exercise: ExerciseData,
    increment: boolean
  ) => {
    const muscle = exercise.overallCategory;
    setExerciseCountPerMuscle((prevState) => {
      const count = prevState[muscle] || 0;
      const newCount = increment ? count + 1 : count - 1;
      console.log(`Updating count for ${muscle}:`, newCount);
      return {
        ...prevState,
        [muscle]: newCount,
      };
    });
  };

  const addExerciseToWorkoutPlan = (exercise: ExerciseData) => {
    console.log(`Adding exercise to workout plan:`, exercise);
    updateExerciseCountPerMuscle(exercise, true);
    setWorkoutPlan([...workoutPlan, exercise]);
    setExercises(
      exercises.filter((ex) => ex.Exercise_Id !== exercise.Exercise_Id)
    );
  };

  const removeExerciseFromWorkoutPlan = (exercise: ExerciseData) => {
    console.log(`Removing exercise to workout plan:`, exercise);
    updateExerciseCountPerMuscle(exercise, false);
    setExercises([...exercises, exercise]);
    setWorkoutPlan(
      workoutPlan.filter((ex) => ex.Exercise_Id !== exercise.Exercise_Id)
    );
  };

  useEffect(() => {
    if (selectedExerciseType && selectedMuscle) {
      getExercisesBySelection(selectedMuscle, selectedExerciseType).then(
        (response) => {
          setExercises(response);
        }
      );
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
    exerciseCountPerMuscle,
  };
};

export default useExerciseData;
