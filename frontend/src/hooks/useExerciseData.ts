import {useState} from 'react';

const useExerciseData = (exerciseTypes:string[]) => {
    const [selectedExerciseType, setSelectedExerciseType] = useState<string|null>(null);
    
    const selectExerciseType = (exerciseType: string) => {
        setSelectedExerciseType(exerciseType);
    }
    
    return {selectedExerciseType, selectExerciseType};
}

export default useExerciseData;