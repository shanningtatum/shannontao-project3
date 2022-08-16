import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleClick = () => {
    toggleDarkMode();
  };
  return (
    <header className={darkMode ? "darkDisplay" : "lightDisplay"}>
      <button class="toggleThemeButton" onClick={handleClick}>
        {!darkMode ? "🌚" : "🌝"}
        <span
          className={
            darkMode ? "toolTipText lightDisplay" : "toolTipText darkDisplay"
          }
        >
          {!darkMode ? "Click for dark mode" : "Click for light mode"}
        </span>
      </button>
      <h1>
        Duber<span className="strongFont">Eats</span> Bill Splitter
      </h1>
    </header>
  );
};

export default Header;
