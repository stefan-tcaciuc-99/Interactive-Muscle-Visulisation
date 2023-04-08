import React from "react";
import { Button, Box } from "@mui/material";

interface ExerciseListProps {
  exercises: string[];
  onSelect: (exercise: string) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onSelect,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      flexWrap="wrap"
      gap={1}
    >
      {exercises.map((exercise) => (
        <Button
          key={exercise}
          variant="outlined"
          onClick={() => onSelect(exercise)}
        >
          {exercise}
        </Button>
      ))}
    </Box>
  );
};

export default ExerciseList;
