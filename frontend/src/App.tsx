import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import useModelViewerRef from "./hooks/useModelViewerRef";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthButtons from "./components/AuthButtons";
import "./app.css";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ExerciseTypeSelector from "./components/ExerciseTypeSelector";
import useExerciseData from "./hooks/useExerciseData";
import ExerciseList from "./components/ExerciseList";
import WorkoutPlan from "./components/WorkoutPlan";

function HomePage() {
  const modelViewerElementRef = useModelViewerRef();

  const {
    selectedExerciseType,
    selectExerciseType,
    selectedMuscle,
    selectMuscle,
    exercises,
    addExerciseToWorkoutPlan,
    removeExerciseFromWorkoutPlan,
    workoutPlan,
  } = useExerciseData([]);

  console.log("Selected Exercise Type:", selectedExerciseType);
  console.log("Exercises:", exercises);
  console.log("Workout Plan:", workoutPlan);
  console.log("Muscle:", selectedMuscle);

  return (
    <div className="parent">
      <Grid
        container
        sx={{ height: "100vh", padding: "16px", backgroundColor: "#F5F0F9" }}
      >
        <Grid
          item
          xs={12}
          className="div4"
          sx={{
            marginBottom: "16px",
            backgroundColor: "#F5F0F9",
          }}
        >
          <AuthButtons/>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          sx={{
            flexGrow: 1,
            minWidth: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "#F5F0F9",
            paddingTop: "16px",
            paddingLeft: "16px",
          }}
        >
          <ModelViewer
            modelViewerRef={modelViewerElementRef}
            onMuscleSelected={selectMuscle}
          />
          <Box
            sx={{
              marginLeft: "16px",
              flexGrow: 1,
              maxWidth: "64%",
              flexShrink: 1,
            }}
          >
            <Paper sx={{ padding: "16px", width: "100%" }}>
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 500,
                    color: "#5C527F",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  Apparatus
                </Typography>
              </div>
              <ExerciseTypeSelector
                selectedType={selectedExerciseType}
                onSelect={selectExerciseType}
              />
            </Paper>
            {selectedExerciseType && exercises && exercises.length > 0 && (
              <Paper sx={{ padding: "16px", marginTop: "16px" }}>
                <div>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 500,
                      color: "#5C527F",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Exercises
                  </Typography>
                </div>
                <ExerciseList
                  exercises={exercises}
                  onSelect={addExerciseToWorkoutPlan}
                />
              </Paper>
            )}
            {workoutPlan.length > 0 && (
              <Paper sx={{ padding: "16px", marginTop: "16px" }}>
                <div>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 500,
                      color: "#5C527F",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                    }}
                  >
                    Workout Plan
                  </Typography>
                </div>
                <WorkoutPlan
                  workoutPlan={workoutPlan}
                  onSelect={removeExerciseFromWorkoutPlan}
                />
              </Paper>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          className="div3"
          // sx={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
        ></Grid>
      </Grid>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
