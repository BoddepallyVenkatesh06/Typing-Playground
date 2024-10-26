import React from "react";
import Select from "react-select";
import { useTheme } from "../Context/ThemeContext";
import { themeOptions } from "../Utils/theme";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import BentoIcon from "@mui/icons-material/Bento";
import GoToTop from "./GoToTop";
const Footer = () => {
  const { theme, setTheme, defaultTheme } = useTheme();

  const handleThemeChange = (e) => {
    console.log(e.value);
    setTheme(e.value);
    console.log("setting");
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  return (
    <div className="footer">
      <div className="links">
        <a href="https://github.com/AmeyPank" target="_blank" rel="noreferrer">
          <GitHubIcon style={{ marginRight: "4px" }} />
        </a>
        <a
          href="https://www.linkedin.com/in/venkykumar0006/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon style={{ marginRight: "4px" }} />
        </a>
        <a
          href="https://www.linkedin.com/in/venkykumar0006/"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon style={{ marginRight: "4px" }} />
        </a>
        <a href="https://bento.me/venkykumar0006" target="_blank" rel="noreferrer">
          <BentoIcon style={{ marginRight: "4px" }} />
        </a>
        <a
          href="https://www.linkedin.com/in/venkykumar0006/"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon style={{ marginRight: "4px" }} />
        </a>
      </div>

      <div className="themes">
        <Select
          options={themeOptions}
          onChange={handleThemeChange}
          menuPlacement="top"
          defaultValue={{ value: defaultTheme, label: defaultTheme.label }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: isFocused ? theme.background : theme.textColor,
                color: isFocused ? theme.textColor : theme.typeBoxText,
                cursor: "pointer",
              };
            },
            singleValue: (styles) => ({ ...styles, color: theme.title }),
          }}
        />
        <GoToTop />
      </div>
    </div>
  );
};

export default Footer;
