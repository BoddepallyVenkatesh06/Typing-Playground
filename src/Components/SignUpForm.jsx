import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

export const SignUpForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      toast.warning("Please enter all required fields");

      return;
    }
    if (password && !confirmPassword) {
      toast.warning("Please enter all required fields");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("Success user created");
        handleClose();
      })
      .catch((err) => {
        toast.warning(errorMapping[err.code] || "Some error occurred");
      });
  };
  return (
    <div>
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
        <TextField
          variant="outlined"
          type="password"
          label="Enter Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          SignUp
        </Button>
      </Box>
    </div>
  );
};
