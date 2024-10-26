import React from "react";
import AccountIcon from "./AccountCircle";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Header = () => {
  const iconStyle = {
    boxSizing: "border-box",
    marginTop: "18px",
    paddingRight: "5px",
    scale: "1.5",
    cursor: "pointer",
    marginBottom: "auto",
  };

  // Define tooltipTitleStyle constant
  const tooltipTitleStyle = {
    color: "white", // Set the desired text color
    fontSize: "16px", // Set the desired font size
  };
  return (
    <div className="header">
      <div className="logo">
        <h1 style={{ fontFamily: "Legend Deca" }}>funkeytype</h1>
        <span
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <KeyboardRoundedIcon style={{ marginLeft: "8px" }} />
          <MilitaryTechIcon style={{ marginLeft: "8px" }} />
          <InfoIcon style={{ marginLeft: "8px" }} />
        </span>
      </div>
      <div
        className="user-logo"
        style={{
          marginTop: "15px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Tooltip
          title={<span style={tooltipTitleStyle}>Notification</span>}
          placement="top"
          enterDelay={500}
          arrow
          classes={{
            tooltip: "custom-tooltip",
          }}
        >
          <NotificationsIcon style={iconStyle} />
        </Tooltip>

        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
