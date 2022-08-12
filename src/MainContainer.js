import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainContainer = () => {
  const [userInput, setUserInput] = useState([]);

  const [subtotalInput, setSubtotal] = useState("");

  return (
    <main id="mainContent">
      <Payee userInput={userInput} setUserInput={setUserInput} />
      <MenuItem
        userInput={userInput}
        setUserInput={setUserInput}
        subtotalInput={subtotalInput}
        setSubtotal={setSubtotal}
      />
      <Fees
        userInput={userInput}
        subtotalInput={subtotalInput}
        setSubtotal={setSubtotal}
      />

      {/* <Payee />
      <MenuItem />
      <Fees /> */}
    </main>
  );
};

export default MainContainer;
