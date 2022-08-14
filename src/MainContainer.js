import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";
import Display from "./Display";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainContainer = () => {
  const [userInput, setUserInput] = useState([]);
  const [splitFees, setSplitFees] = useState([]);

  return (
    <main id="mainContent">
      <Payee userInput={userInput} setUserInput={setUserInput} />
      <MenuItem userInput={userInput} />
      <Fees userInput={userInput} setSplitFees={setSplitFees} />
      <Display userInput={userInput} splitFees={splitFees} />
    </main>
  );
};

export default MainContainer;
