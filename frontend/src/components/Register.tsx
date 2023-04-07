import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { TextField, Button, Container, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const FormContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const RegisterForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const auth = getAuth(app);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        Register
      </Typography>
      <RegisterForm onSubmit={handleSubmit}>
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
          Register
        </Button>
      </RegisterForm>
    </FormContainer>
  );
};

export default Register;
