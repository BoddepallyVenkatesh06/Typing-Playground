import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

export const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const handleSubmit = () => {
    if (!email || !password) {
      toast.warning("Please enter your email and password", {
        theme: "colored",
      });
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("Logged in successfully", {
          theme: "colored",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.code);
        toast.error(errorMapping[err.code] || "Some error occurred", {
          theme: "colored",
        });
        console.log(err);
      });
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
      />
      <Button
        varient="contained"
        size="large"
        style={{ backgroundColor: theme.typeBoxText, color: theme.title }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};
