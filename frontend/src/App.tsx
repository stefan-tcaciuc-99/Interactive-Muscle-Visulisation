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
import { exerciseTypes, exerciseData } from "./services/exerciseService";
import ExerciseList from "./components/ExerciseList";

function HomePage() {
  const modelViewerElementRef = useModelViewerRef();

  const { selectedExerciseType, selectExerciseType, exercises } =
    useExerciseData(exerciseData);

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
            marginBottom: "16px",
            display: "flex",
            alignItems: "flex-start",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            paddingTop: "16px",
            paddingLeft: "16px",
          }}
        >
          <ModelViewer modelViewerRef={modelViewerElementRef} />
          <Box sx={{ marginLeft: '16px' }}>
          <Paper sx={{ padding: "16px", width: '320px' }}>
              <ExerciseTypeSelector
                exerciseTypes={exerciseTypes}
                selectedType={selectedExerciseType}
                onSelect={selectExerciseType}
              />
            </Paper>
            {selectedExerciseType && (
              <Paper sx={{ padding: "16px", marginTop: "16px" }}>
                <ExerciseList
                  exercises={exercises}
                  onSelect={(exercise) =>
                    console.log("Selected exercise:", exercise)
                  }
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
