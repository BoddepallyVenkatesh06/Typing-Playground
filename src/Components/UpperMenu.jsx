import React from "react";
import { useTestMode } from "../Context/TestModeContext";
import { IconButton, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "../Context/ThemeContext";

const UpperMenu = ({ countDown, currWordIndex }) => {
  const {
    testTime,
    setTestTime,
    testMode,
    setTestMode,
    testWords,
    setTestWords,
  } = useTestMode();
  const { theme } = useTheme();

  // Define tooltipStyle constant
  const tooltipStyle = {
    backgroundColor: theme.background,
    color: "#fff",
    fontSize: "14px",
    borderRadius: "4px",
    padding: "8px 12px",
  };

  // Define tooltipTitleStyle constant
  const tooltipTitleStyle = {
    color: "white",
    fontSize: "16px",
  };
  const updateTime = (e) => {
    // const selectedTime = Number(e.target.id);
    setTestTime(e.target.id);
  };
  const updateWord = (e) => {
    const selectedWord = parseInt(e.target.id);
    setTestWords(selectedWord);
  };
  const updateMode = (e) => {
    setTestMode(e.target.id);
  };

  return (
    // <div className="upper-menu">
    //   <div className="counter">{countDown}s</div>
    //   <div className="time-modes">
    //     <div className="time" id="15" onClick={updateTime}>
    //       15s
    //     </div>
    //     <div className="time" id="30" onClick={updateTime}>
    //       30s
    //     </div>
    //     <div className="time" id="60" onClick={updateTime}>
    //       60s
    //     </div>
    //   </div>
    // </div>
    <div className="upper-menu">
      {testMode === "time" ? (
        <div className="counter">{countDown}s</div>
      ) : (
        <div className="counter">
          {" "}
          {currWordIndex}/{testWords}
        </div>
      )}

      <div className="modes">
        <Tooltip
          title={<span style={tooltipTitleStyle}>English</span>} // Apply styles to the title
          placement="top"
          enterDelay={500}
          arrow
          classes={{
            tooltip: "custom-tooltip", // Add a custom class for additional styling
          }}
          style={tooltipStyle}
        >
          {/* IconButton */}
          <IconButton
            style={{ backgroundColor: "theme.background" }}
            color="inherit"
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <span>Mode - </span>
        <span
          className={testMode === "time" ? "active mode" : "mode"}
          id="time"
          onClick={updateMode}
        >
          Time
        </span>
        <span
          className={testMode === "word" ? "active mode" : "mode"}
          id="word"
          onClick={updateMode}
        >
          Word
        </span>
      </div>

      {testMode === "time" ? (
        <div className="time-modes">
          <div
            className={
              testMode === "time" && testTime === 15
                ? "active-value time"
                : "time"
            }
            id={15}
            onClick={updateTime}
          >
            15s
          </div>
          <div
            className={
              testMode === "time" && testTime === 30
                ? "active-value time"
                : "time"
            }
            id={30}
            onClick={updateTime}
          >
            30s
          </div>
          <div
            className={
              testMode === "time" && testTime === 60
                ? "active-value time"
                : "time"
            }
            id={60}
            onClick={updateTime}
          >
            60s
          </div>
        </div>
      ) : (
        <div className="word-modes">
          <div
            className={
              testMode === "word" && testWords === 10
                ? "active-value no-of-word"
                : "no-of-word"
            }
            id={10}
            onClick={updateWord}
          >
            10
          </div>
          <div
            className={
              testMode === "word" && testWords === 20
                ? "active-value no-of-word"
                : "no-of-word"
            }
            id={20}
            onClick={updateWord}
          >
            20
          </div>
          <div
            className={
              testMode === "word" && testWords === 30
                ? "active-value no-of-word"
                : "no-of-word"
            }
            id={30}
            onClick={updateWord}
          >
            30
          </div>
        </div>
      )}
    </div>
  );
};

export default UpperMenu;
