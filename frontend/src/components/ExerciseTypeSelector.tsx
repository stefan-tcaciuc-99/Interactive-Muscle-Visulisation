import React from "react";
import { Button, Box } from "@mui/material";

interface ExerciseTypeSelectorProps {
  exerciseTypes: string[];
  selectedType: string | null;
  onSelect: (type: string) => void;
}

const ExerciseTypeSelector: React.FC<ExerciseTypeSelectorProps> = ({
  exerciseTypes,
  selectedType,
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
      {exerciseTypes.map((type) => (
        <Button
          key={type}
          onClick={() => onSelect(type)}
          variant={selectedType === type ? "contained" : "outlined"}
          color={selectedType === type ? "primary" : undefined}
        >
          {type}
        </Button>
      ))}
    </Box>
  );
};

export default ExerciseTypeSelector;
