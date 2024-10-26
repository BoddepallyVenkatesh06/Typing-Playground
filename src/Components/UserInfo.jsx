import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const UserInfo = ({ totalTestsTaken }) => {
  const [user] = useAuthState(auth);
const navigate = useNavigate()
  const handleClick=()=>{
    navigate("/")
  }
  // Check if user is null or undefined
  if (!user) {
    return null; // or render a placeholder/loading state if desired
  }

  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <PersonOutlineIcon
            style={{
              transform: "scale(6)",
              margin: "auto",
              marginTop: "3.5rem",
            }}
          />
        </div>
        <div className="info">
          <div className="name">{user.displayName}</div>
          <div className="email">{user.email}</div>
          <div className="joined-at"> {user.metadata.creationTime}</div>
        </div>
      </div>
      <div className="total-tests">
        <span>Total Test Taken-{totalTestsTaken}</span>
        <Button onClick={handleClick}>Take Test Again</Button>
      </div>
    </div>
  );
};

export default UserInfo;
