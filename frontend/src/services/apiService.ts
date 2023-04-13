import axios from 'axios';

export const getExercisesBySelection = async (muscle: string | null, apparatus: string | null) => {
  try {
    const response = await axios.get("/exercises", {
      params: {
        muscle,
        apparatus,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};
