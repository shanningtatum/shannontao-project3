import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import oopsImage from "./assets/oopsImage.png";

function ErrorPage() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <section className="errorPage">
        <div className="wrapper">
          <h2>Oops! You aren't supposed to be back here...</h2>

          <img src={oopsImage} alt="" />

          <div
            className={
              darkMode
                ? "wrapper returnToButton darkDisplay"
                : "wrapper returnToButton lightDisplay"
            }
          >
            <Link
              to={"/"}
              className={darkMode ? "returnToLink darkDisplay" : "returnToLink"}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <p>Back to Instructions</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorPage;
