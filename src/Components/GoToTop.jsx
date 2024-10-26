import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    setShowButton(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // Attach scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showButton && <FaArrowUp onClick={scrollToTop} />}
    </div>
  );
};
export default GoToTop