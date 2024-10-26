import React from "react";
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox";
import Footer from "../Components/Footer";

export const HomePage = () => {
  return (
    <div className="canvas">
      <Header />
      <TypingBox />
      <Footer />
    </div>
  );
};
