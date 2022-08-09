import Payee from "./Payee";
import MenuItem from "./MenuItem";
// import Fees from "./Fees";
import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MainContainer = () => {
  const [userInput, setUserInput] = useState([]);

  return (
    <main id="mainContent">
      <Payee userInput={userInput} setUserInput={setUserInput} />
      <MenuItem userInput={userInput} setUserInput={setUserInput} />
      <section className="extraFees">
        <div className="wrapper">
          <h2>Fees</h2>
          <form action="">
            <div className="subtotalDiv">
              <label htmlFor="subtotalInput">Subtotal</label>
              <input type="text" name="subtotalInput" />
            </div>
            <div className="serviceFeeDiv">
              <label htmlFor="serviceFeeInput">Service Fee</label>
              <input type="text" name="serviceFeeInput" />
            </div>
            <div className="deliveryFeeDiv">
              <label htmlFor="deliveryFeeInput">Delivery Fee</label>
              <input type="text" name="deliveryFeeInput" />
            </div>
            <div className="grandTotalDiv">
              <label htmlFor="grandTotalInput">Grand Total</label>
              <input type="text" name="grandTotalInput" />
            </div>
          </form>
        </div>
      </section>
      <button>Calculate</button>
      {/* <Payee />
      <MenuItem />
      <Fees /> */}
    </main>
  );
};

export default MainContainer;
