import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModelViewer from "./components/ModelViewer";
import useModelViewerRef from "./hooks/useModelViewerRef";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthButtons from "./components/AuthButtons";
import "./app.css";
import { Box, Grid, Paper } from "@mui/material";
import ExerciseTypeSelector from "./components/ExerciseTypeSelector";
import useExerciseData from "./hooks/useExerciseData";
import { exerciseData } from "./services/exerciseService";
import ExerciseList from "./components/ExerciseList";
import WorkoutPlan from "./components/WorkoutPlan";
function HomePage() {
  const modelViewerElementRef = useModelViewerRef();

  const {
    selectedExerciseType,
    selectExerciseType,
    exercises,
    addExerciseToWorkoutPlan,
    removeExerciseFromWorkoutPlan,
    workoutPlan,
  } = useExerciseData(exerciseData);

  return (
    <div className="parent">
      <Grid container sx={{ height: "100vh", padding: "16px" }}>
        <Grid
          item
          xs={12}
          className="div4"
          sx={{
            marginBottom: "16px",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          sx={{
            flexGrow: 1,
            minWidth: "60%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            paddingTop: "16px",
            paddingLeft: "16px",
          }}
        >
          <ModelViewer modelViewerRef={modelViewerElementRef} />
          <Box
            sx={{
              marginLeft: "16px",
              flexGrow: 1,
              maxWidth: "64%",
              flexShrink: 1,
            }}
          >
            <Paper sx={{ padding: "16px", width: "100%" }}>
              <ExerciseTypeSelector
                selectedType={selectedExerciseType}
                onSelect={selectExerciseType}
              />
            </Paper>
            {selectedExerciseType && exercises.length > 0 && (
              <Paper sx={{ padding: "16px", marginTop: "16px" }}>
                <ExerciseList
                  exercises={exercises}
                  onSelect={addExerciseToWorkoutPlan}
                />
              </Paper>
            )}
            {workoutPlan.length > 0 && (
              <Paper sx={{ padding: "16px", marginTop: "16px" }}>
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
          sm={4}
          md={3}
          className="div2"
          sx={{
            marginBottom: "16px",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            position: "relative",
          }}
        >
          <header className="header">
            <AuthButtons />
          </header>
        </Grid>
        <Grid
          item
          xs={12}
          className="div3"
          sx={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
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
