import React from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

const AuthButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  position: "absolute",
  top: 0,
  right: 0,
  marginRight: "194px",

}));

const AuthButtons: React.FC = () => {
  return (
    <AuthButtonsContainer>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
        style={{ backgroundColor: "white", marginTop: 8 }}
      >
        Login
      </Button>
      <Button
        component={RouterLink}
        to="/register"
        variant="contained"
        color="primary"
        style={{ marginLeft: 8, marginTop: 8 }}
      >
        Register
      </Button>
    </AuthButtonsContainer>
  );
};

export default AuthButtons;
