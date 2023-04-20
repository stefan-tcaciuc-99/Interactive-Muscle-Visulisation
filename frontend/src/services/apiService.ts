import axios from 'axios';

export const getExercisesBySelection = async (musclegroup: string | null, apparatus: string | null) => {
  try {
    const response = await axios.get("/exercises", {
      params: {
        musclegroup,
        apparatus,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
