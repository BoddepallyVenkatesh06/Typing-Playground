import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import { generate as randomWords } from "random-words";
import Stats from "./Stats";
import { Button, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify";
import { useTheme } from "../Context/ThemeContext";

const TypingBox = () => {
  const inputRef = useRef(null);
  const [initialRender, setInitialRender] = useState(false);
  const { theme } = useTheme();
  const { testTime, testWords, testMode } = useTestMode(); //from context
  const [countDown, setCountDown] = useState(() => {
    if (testMode === "word") return 180;
    return testTime;
  });

  const [time, setTime] = useState(() => {
    if (testMode === "time") return 180;
    return testTime;
  });
  const [intervalId, setIntervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [correctCharacter, setCorrectCharacter] = useState(0);

  // --------------------> WPM states --------------------

  const [inCorrectCharacter, setInCorrectCharacter] = useState(0);
  const [missedCharacter, setMissedCharacter] = useState(0);
  const [extraCharacter, setExtraCharacter] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(300);
  });
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]); //Graph data for state
  const emptySpans = () => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  };

  const [wordsSpanRef, setWordsSpanRef] = useState(emptySpans());

  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    clearInterval(intervalId);

    try {
      if (testMode === "word") {
        setWordsArray(randomWords(testWords));
        setWordsSpanRef(emptySpans());
        setCountDown(180);
        setTime(180);
      } else if (testMode === "time") {
        setWordsArray(randomWords(300));
        setWordsSpanRef(emptySpans());
        setCountDown(testTime);
        setTime(testTime);
      }

      setGraphData([]);
      setCorrectCharacter(0);
      setCorrectWords(0);
      setExtraCharacter(0);
      setInCorrectCharacter(0);
      setMissedCharacter(0);
      resetWordSpanRefClassname();
      focusInput();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error here or throw it further if needed
    }
  };

  const redoTest = () => {
    try {
      setCurrCharIndex(0);
      setCurrWordIndex(0);
      setTestStart(false);
      setTestEnd(false);
      clearInterval(intervalId);
      if (testMode === "word") {
        setCountDown(180);
        setTime(180);
      } else {
        setCountDown(testTime);
        setTime(testTime);
      }
      setGraphData([]);
      setCorrectCharacter(0);
      setCorrectWords(0);
      setExtraCharacter(0);
      setInCorrectCharacter(0);
      setMissedCharacter(0);
      resetWordSpanRefClassname();
      focusInput();
    } catch (error) {
      console.error(error);
    }
  };

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
  // -------------------->Start Timer --------------------
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);

    setIntervalId(intervalId);

    function timer() {
      setCountDown((latestCountDown) => {
        setCorrectCharacter((correctCharacter) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                time - latestCountDown,
                Math.round(
                  correctCharacter / 5 / ((time - latestCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctCharacter;
        });

        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return latestCountDown - 1;
      });
    }
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        if (j.className.includes("extra")) {
          j.remove();
        }
        j.className = "char";
        return null;
      });
      return null;
    });
    wordsSpanRef[0].current.childNodes[0].className = "char current";
  };

  // --------------------> WPM function --------------------

  const calculateWPM = () => {
    return Math.round(correctCharacter / 5 / (testTime / 60));
  };

  // --------------------> CorrectAccuracy function --------------------

  const correctAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };
  // --------------------> focusInput function --------------------

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
    // Update the state to set the initial class name
    wordsSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  useEffect(() => {
    if (initialRender) {
      console.log("running");
      resetTest();
    } else {
      setInitialRender(true); //
    }
  }, [testTime, testWords, testMode]);

  // useMemo Hook to update the mode when it changes testwords changes and testtime changes
  useMemo(() => {
    resetTest();
  }, [testTime, testMode, testWords]);

  // -------------------->handleUserInput--------------------------------
  const handleUserInput = (e) => {
    console.log(e);
    try {
      if (!testStart) {
        startTimer();
        setTestStart(true);
      }

      if (wordsSpanRef[currWordIndex].current) {
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
        const blockedKeys = [
          "Control",
          "Fn",
          "Shift",
          "CapsLock",
          "Tab",
          "Alt",
        ];

        if (blockedKeys.includes(e.key)) {
          return toast.warning("Invalid Key", {
            theme: "colored",
          }); // Ignore the blocked keys
        }

        // --------------------> Logic for spaces --------------------

        if (e.keyCode === 32) {
          if (currWordIndex === wordsArray.length - 1) {
            clearInterval(intervalId);
            setCurrWordIndex(currWordIndex + 1);
            setTestEnd(true);
            return;
          }

          let correctCharsInWords =
            wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");
          if (correctCharsInWords.length === allCurrChars.length) {
            setCorrectWords(correctWords + 1);
          }

          if (allCurrChars.length <= currCharIndex) {
            // --------------------> remove cursor from last place in a word --------------------

            allCurrChars[currCharIndex - 1].classList.remove("current-right");
          } else {
            // --------------------> remove cursor from in between of the word --------------------
            setMissedCharacter(
              missedCharacter + (allCurrChars.length - currCharIndex)
            );

            for (let i = currCharIndex; i < allCurrChars.length; i++) {
              allCurrChars[i].className += " skipped";
            }

            // allCurrChars[currCharIndex].classList.remove("current");
            allCurrChars[currCharIndex].className = allCurrChars[
              currCharIndex
            ].className.replace("current", "");
          }

          //scrolling line condition
          if (
            wordsSpanRef[currWordIndex + 1].current.offsetLeft <
            wordsSpanRef[currWordIndex].current.offsetLeft
          ) {
            wordsSpanRef[currWordIndex].current.scrollIntoView();
          }
          // place cursor to beginning
          wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
            "char current";
          setCurrWordIndex(currWordIndex + 1);
          setCurrCharIndex(0);

          return;
        }
        if (e.keyCode === 8) {
          // --------------------> Logic for backspace handling --------------------

          if (currCharIndex !== 0) {
            if (currCharIndex === allCurrChars.length) {
              if (
                allCurrChars[currCharIndex - 1] &&
                allCurrChars[currCharIndex - 1].className.includes("extra")
              ) {
                allCurrChars[currCharIndex - 1].remove();
                allCurrChars[currCharIndex - 2].className += " current-right";
              }

              if (allCurrChars[currCharIndex - 1]) {
                allCurrChars[currCharIndex - 1].className = "char current";
              }
              setCurrCharIndex(currCharIndex - 1);

              return;
            }

            allCurrChars[currCharIndex].className = "";
            allCurrChars[currCharIndex - 1].className = "current";
            setCurrCharIndex(currCharIndex - 1);
          }

          return;
        }

        if (currCharIndex === allCurrChars.length) {
          let newSpan = document.createElement("span");
          newSpan.innerText = e.key;
          newSpan.className = "char incorrect extra current-right";
          allCurrChars[currCharIndex - 1].classList.remove("current-right");
          wordsSpanRef[currWordIndex].current.append(newSpan);
          setCurrCharIndex(currCharIndex + 1);
          // setExtraCharacter(extraCharacter + 1);
          return;
        }

        if (e.key === allCurrChars[currCharIndex].innerText) {
          allCurrChars[currCharIndex].className = "char correct";
          setCorrectCharacter(correctCharacter + 1);
          if (
            currWordIndex === wordsArray.length + 1 &&
            currCharIndex === allCurrChars.length - 1
          ) {
            clearInterval(intervalId);
            setCurrWordIndex(currWordIndex + 1);
            setTestEnd(true);
            return;
          }
        } else {
          allCurrChars[currCharIndex].className = "char incorrect";
          setInCorrectCharacter(inCorrectCharacter + 1);
        }

        if (currCharIndex + 1 === allCurrChars.length) {
          allCurrChars[currCharIndex].className += " current-right";
        } else {
          allCurrChars[currCharIndex + 1].className = "char current";
        }
        setCurrCharIndex(currCharIndex + 1);
      }
    } catch (error) {
      // Handle the error here
      console.error("An error occurred during handleUserInput");
    }
  };

  return (
    <div>
      {testEnd ? (
        " "
      ) : (
        <div>
          <UpperMenu countDown={countDown} currWordIndex={currWordIndex} />
        </div>
      )}
      {testEnd ? (
        <div>
          <div>
            <Button variant="contained" onClick={redoTest}>
              Repeat test
            </Button>
          </div>
          <Stats
            wpm={calculateWPM()}
            accuracy={correctAccuracy()}
            correctCharacter={correctCharacter}
            inCorrectCharacter={inCorrectCharacter}
            missedCharacter={missedCharacter}
            extraCharacter={extraCharacter}
            graphData={graphData}
            resetTest={resetTest}
          />
        </div>
      ) : (
        <div className="box">
          <div
            className="type-box"
            id="type-box"
            onClick={focusInput}
          >
            <div className="words">
              {wordsArray.map((word, index) => (
                <span className="word" key={index} ref={wordsSpanRef[index]}>
                  {word.split("").map((char, charIndex) => (
                    <span className="char" key={charIndex}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className="lower-menu">
            <Tooltip
              title={<span style={tooltipTitleStyle}>Reset</span>}
              placement="bottom"
              enterDelay={500}
              arrow
              classes={{
                tooltip: "custom-tooltip", // Add a custom class for additional styling
              }}
              style={tooltipStyle}
            >
              <IconButton
                style={{
                  marginTop: "20px",
                  backgroundColor: "theme.background",
                }}
                onClick={resetTest}
                color="inherit"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
