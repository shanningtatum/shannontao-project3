import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

function Footer() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <footer className={darkMode ? "darkDisplay" : "lightDisplay"}>
      <p>
        Created by&nbsp;<a href="https://www.shannontao.dev/">Shannon Tao</a>
        &nbsp;at Juno College 2022
      </p>
    </footer>
  );
}

export default Footer;
