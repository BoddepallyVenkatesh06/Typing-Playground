import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  Modal,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const [user] = useAuthState(auth);

  const iconStyle = {
    boxSizing: "border-box",
    marginTop: "18px",
    paddingLeft: "5px",
    scale: "1.5",
    cursor: "pointer",
    marginBottom: "auto",
  };


  // Define tooltipTitleStyle constant
  const tooltipTitleStyle = {
    color: "white", // Set the desired text color
    fontSize: "16px", // Set the desired font size
  };
  const logout = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged out successfully", {
          theme: "colored",
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error("Not Able to logout", {
          theme: "colored",
        });
      });
  };
  const handleModalOpen = () => {
    if (user) {
      // navigate to user profile
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
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
    <div>
      <Tooltip
        title={<span style={tooltipTitleStyle}>Profile</span>}
        placement="top"
        enterDelay={500}
        arrow
        classes={{
          tooltip: "custom-tooltip",
        }}
      >
        <AccountCircleIcon
          onClick={handleModalOpen}
          style={{ ...iconStyle, marginRight: "8px" }}
        />
      </Tooltip>
      {user && (
        <>
          <Tooltip
            title={<span style={tooltipTitleStyle}>Logout</span>}
            placement="top"
            enterDelay={500}
            arrow
            classes={{
              tooltip: "custom-tooltip",
            }}
          >
            <LogoutIcon
              onClick={logout}
              style={{ ...iconStyle, marginRight: "4px" }}
            />
          </Tooltip>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            textAlign: "center",
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "transparent",
            }}
          >
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="login" style={{ color: theme.typeBoxText }}></Tab>
              <Tab label="signup" style={{ color: theme.typeBoxText }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && (
            <h1>
              <LoginForm handleClose={handleClose} />
            </h1>
          )}
          {value === 1 && <SignUpForm handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{
                width: "90%",
                borderRadius: "2px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "8px",
              }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
