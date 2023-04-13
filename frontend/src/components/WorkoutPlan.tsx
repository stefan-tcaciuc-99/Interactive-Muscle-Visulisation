import React from "react";
import { Button, Box } from "@mui/material";
import { ExerciseData } from "./ExerciseList";

interface WorkoutPlanProps {
  workoutPlan: ExerciseData[]; 
  onSelect: (exercise: ExerciseData) => void; 
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan, onSelect }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      flexWrap="wrap"
      gap={1}
    >
      {workoutPlan.map((exercise, index) => (
        <Button
          key={`${exercise.Exercise_Id}-${index}`}
          variant="outlined"
          onClick={() => onSelect(exercise)} 
        >
          {`${index + 1}. ${exercise.Exercise_Name}`}
        </Button>
      ))}
    </Box>
  );
};

export default WorkoutPlan;
