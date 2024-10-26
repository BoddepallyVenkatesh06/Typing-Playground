import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import { MediaQueriesStyles } from "./Styles/MediaQueriesStyles";


// import { Route, Routes } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
// import UserPage from "./Pages/UserPage";
// import Alert from "./Components/Alert";
// import ComparePage from "./Pages/ComparePage";

function App() {

  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme} >
      <ToastContainer />
      <GlobalStyles />
      <MediaQueriesStyles />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>

      </Routes>
      
    </ThemeProvider>



  );
}

export default App;
