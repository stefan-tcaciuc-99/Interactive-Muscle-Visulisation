export const exerciseData={
    push:['Bench','Incline','Dips','Pushups','Chest Fly'],
    machine:['Chest Press','Chest Fly','Chest Pull','Chest Extension'],
    freeWeight:['Deadlift','Squat','Barbell Row']
}

// export const getExerciseByTypeAndMuscle = (type:string,muscle:string) => {
//     return exerciseData[type];
// This is dummy for now untill i implement the api
// }

export const exerciseTypes = Object.keys(exerciseData);