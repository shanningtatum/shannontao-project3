import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";
import Display from "./Display";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainContainer = () => {
  const [userInput, setUserInput] = useState([]);
  const [splitFees, setSplitFees] = useState("");
  const [taxRate, setTaxRate] = useState("");

  return (
    <main id="mainContent">
      <Payee userInput={userInput} setUserInput={setUserInput} />
      <MenuItem userInput={userInput} />
      <Fees
        userInput={userInput}
        setSplitFees={setSplitFees}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
      />
      <Display userInput={userInput} splitFees={splitFees} taxRate={taxRate} />
    </main>
  );
};

export default MainContainer;
