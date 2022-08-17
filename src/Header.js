import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleClick = () => {
    toggleDarkMode();
  };
  return (
    <header className={darkMode ? "darkDisplay" : "lightDisplay"}>
      <div className="toggleButtonDiv">
        <button className="toggleThemeButton" onClick={handleClick}>
          <span className="sr-only">
            {!darkMode ? "Toggle Dark Mode" : "Toggle Light Mode"}
          </span>
          {!darkMode ? "🌛" : "🌞"}

          <span
            className={
              darkMode ? "toolTipText lightDisplay" : "toolTipText darkDisplay"
            }
          >
            {!darkMode ? "Click for dark mode" : "Click for light mode"}
          </span>
        </button>
      </div>

      <h1>
        Guber<span className="strongFont">Eats</span> Bill Splitter
      </h1>
    </header>
  );
};

export default Header;
