import React from "react";
import { Button, Box } from "@mui/material";

interface WorkoutPlanProps {
  workoutPlan: string[];
  onSelect: (exercise: string) => void;
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
          key={`${exercise}-${index}`}
          variant="outlined"
          onClick={() => onSelect(exercise)}
        >
          {`${index + 1}. ${exercise}`}
        </Button>
      ))}
    </Box>
  );
};

export default WorkoutPlan;
