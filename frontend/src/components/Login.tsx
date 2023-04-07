import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { TextField, Button, Container, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const FormContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const auth = getAuth(app);
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const customToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", customToken);
      navigate("/");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <FormContainer maxWidth="xs">
      <Typography variant="h4" mb={4}>
        Login
      </Typography>
      <LoginForm onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </LoginForm>
    </FormContainer>
  );
};

export default Login;
