import React from "react";
import { Button, Box } from "@mui/material";

export interface ExerciseData {
  Exercise_Id: number;
  Exercise_Name: string;
}

interface ExerciseListProps {
  exercises: ExerciseData[];
  onSelect: (exercise: ExerciseData) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onSelect }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      flexWrap="wrap"
      gap={1}
    >
      {exercises.map((exercise) => (
        <Button
          key={exercise.Exercise_Id}
          variant="outlined"
          onClick={() => onSelect(exercise)}
        >
          {exercise.Exercise_Name}
        </Button>
      ))}
    </Box>
  );
};

export default ExerciseList;
