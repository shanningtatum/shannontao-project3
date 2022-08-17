import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";
import Display from "./Display";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MainContainer = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [userInput, setUserInput] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [splitFees, setSplitFees] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [splitTipAmount, setSplitTipAmount] = useState("");

  return (
    <main
      id="mainContent"
      className={darkMode ? "darkDisplay" : "lightDisplay"}
    >
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

      <Payee userInput={userInput} setUserInput={setUserInput} />
      <MenuItem
        userInput={userInput}
        userOrders={userOrders}
        setUserOrders={setUserOrders}
      />
      <Display
        userInput={userInput}
        splitFees={splitFees}
        taxRate={taxRate}
        userOrders={userOrders}
        splitTipAmount={splitTipAmount}
      />
      <Fees
        userInput={userInput}
        userOrders={userOrders}
        setSplitFees={setSplitFees}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
        setSplitTipAmount={setSplitTipAmount}
      />
    </main>
  );
};

export default MainContainer;
