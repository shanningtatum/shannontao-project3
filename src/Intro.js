import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

function Intro() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div
      className={
        darkMode ? "introSection darkDisplay" : "introSection lightDisplay"
      }
    >
      <div
        className={darkMode ? "wrapper darkDisplay" : "wrapper lightDisplay"}
      >
        <h2>
          Welcome to Guber<span className="strongFont">Eats</span> Bill
          Splitter!
        </h2>
        <p>A handy tool to split your bill between friends!</p>
        <p>How to use:</p>
        <ul>
          <li>Enter the name of your friends who will be splitting the bill</li>
          <li>Add the item and cost of their meal</li>
          <li>Enter extra fee details</li>
          <li>Calculate the split details</li>
          <li>Remind your friends to pay you back!</li>
        </ul>
        <div className="callToAction">
          <Link to={"/calculator"} className="navigateButton">
            Let's begin!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Intro;
