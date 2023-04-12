import React from "react";
import { Button, Box } from "@mui/material";

interface ExerciseTypeSelectorProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

const ExerciseTypeSelector: React.FC<ExerciseTypeSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
    // Api doesnt have a query to get a list of apparatus types, so we hardcode them here, these are hardly ever going to change
  const apparatusTypes = [
    "Dumbbell",
    "Lever",
    "Bodyweight",
    "Barbell",
    "Lever (plate loaded)",
    "Cable",
    "Sled",
    "Weighted",
    "Lever (selectorized)",
    "Isometric",
    "Rope",
    "Self-assisted",
    "Machine-assisted",
    "Partner-assisted",
    "Smith",
    "Suspended",
    "Special Barbell",
    "Band Resistive",
    "Band-assisted",
    "Atlas Stone",
  ];

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="align-left"
      flexWrap="wrap"
      gap={1}
    >
      {apparatusTypes.map((type) => (
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
