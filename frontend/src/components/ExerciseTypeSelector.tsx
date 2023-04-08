import React from 'react';
import {List, ListItem, ListItemText} from '@mui/material';

interface ExerciseTypeSelectorProps {
    exerciseTypes: string[];
    selectedType: string|null;
    onSelect: (type: string) => void;
}

const ExerciseTypeSelector: React.FC<ExerciseTypeSelectorProps> = ({exerciseTypes, selectedType, onSelect}) => {
    return (
        <List>
            {exerciseTypes.map((type) => (
                <ListItem
                    key={type}
                    button
                    selected={type === selectedType}
                    onClick={() => onSelect(type)}
                >
                    <ListItemText primary={type} />
                </ListItem>
            ))}
        </List>
    );
};

export default ExerciseTypeSelector;