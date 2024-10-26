import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {
  const [testTime, setTestTime] = useState(15);
  const [testMode, setTestMode] = useState("time"); // time or word
  const [testWords, setTestWords] = useState(10); // 10 words

  const values = {
    testTime,
    setTestTime,
    testMode,
    setTestMode,
    testWords,
    setTestWords,
  };

  return (
    <TestModeContext.Provider value={values}>
      {children}
    </TestModeContext.Provider>
  );
};

export const useTestMode = () => useContext(TestModeContext);
