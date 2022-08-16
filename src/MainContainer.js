import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";
import Display from "./Display";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

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
      <Link to={"/"}>
        <div className="wrapper">Back</div>
      </Link>
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

      {/* REACT ROUTES */}
    </main>
  );
};

export default MainContainer;
