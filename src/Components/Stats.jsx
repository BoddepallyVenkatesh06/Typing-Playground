import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

const Stats = ({
  wpm,
  accuracy,
  correctCharacter,
  inCorrectCharacter,
  missedCharacter,
  extraCharacter,
  graphData,
}) => {
  let timeSet = new Set();

  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDB = () => {
    if (isNaN(accuracy)) {
      toast.warning("Invalid Test");
      return;
    }
    const resultsRef = db.collection("results");
    const { uid } = auth.currentUser;
    resultsRef
      .add({
        wpm: wpm,
        accuracy: `${accuracy}%`,
        timeStamp: new Date(),
        characters: `Correct: ${correctCharacter} | Incorrect: ${inCorrectCharacter} | Missed: ${missedCharacter} | Extra: ${extraCharacter}`,
        userId: uid,
      })
      .then((respponse) => {
        toast.success("Data Saved To The Database");
      })
      .catch((err) => {
        toast.error(errorMapping[err.code] || "Some error occurred");
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning("Login to save results", {
        theme: "colored",
      });
    }
  }, []);

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctCharacter} : {inCorrectCharacter} : {missedCharacter} :{" "}
          {extraCharacter}
        </div>
      </div>
      <div className="right-stats">
        {/* {Graph wil go here}  */}
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
