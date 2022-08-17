import { useState } from "react";

const Fees = ({
  userOrders,
  userInput,
  setSplitFees,
  setTaxRate,
  setSplitTipAmount,
}) => {
  // set up states for the different inputs
  const [serviceFeeInput, setServiceFee] = useState("");
  const [deliveryFeeInput, setDeliveryFee] = useState("");
  const [taxInput, setTax] = useState("");
  const [tipInput, setTip] = useState("");
  const [grandTotalInput, setGrandTotal] = useState("");

  // empty array to store order values
  const orderValues = [];
  let orderSubtotal = 0;

  // get the handle change for service fee
  const handleServiceFee = (e) => {
    setServiceFee(e.target.value);
  };

  // get the handle change for delivery fee
  const handleDeliveryFee = (e) => {
    setDeliveryFee(e.target.value);
  };

  const handleTax = (e) => {
    setTax(e.target.value);
  };

  const handleTip = (e) => {
    setTip(e.target.value);
  };

  // get the handle change for grand total

  const calculateBill = (serviceFee, deliveryFee, taxInput, tipInput) => {
    console.log(serviceFee, deliveryFee, taxInput, tipInput);
    setGrandTotal(
      (
        +orderSubtotal +
        +serviceFeeInput +
        +deliveryFeeInput +
        +taxInput +
        +tipInput
      ).toFixed(2)
    );

    // FORMULA:
    // get total cost of the user's order
    // get the service fee (split)
    // get the delivery fee (split)
    // ADD the split service fee and the split delivery fee to the user's order
    // determine the tax rate
    // multiply the tax rate to the order + service + delivery
    // split the tip fee
    // return the amount that person has to pay

    // calculate how much service fee is per person
    const splitService = serviceFee / userInput.length;

    // calculates how much the delivery fee is per person
    const splitDelivery = deliveryFee / userInput.length;

    const splitTip = tipInput / userInput.length;

    // adds the split delivery fee and the split service fee
    const totalSplit = splitService + splitDelivery;

    // store it in state variable so I can use it in the Display.js
    setSplitFees(totalSplit);

    // TAX RATE CALCULATIONS:

    const taxPercentage =
      taxInput / (+orderSubtotal + +serviceFee + +deliveryFee);

    setSplitTipAmount(splitTip);

    setTaxRate(taxPercentage + 1);
  };

  const clearButton = () => {
    // clears all the input fields
    setServiceFee("");
    setDeliveryFee("");
    setTax("");
    setTip("");
    setGrandTotal("");
  };

  return (
    <section className="extraFees">
      <div className="wrapper">
        <h2>Fees</h2>
        <form action="">
          <div className="subtotalDiv">
            <p>Subtotal:&nbsp;</p>
            {userOrders.map((order) => {
              orderValues.push(order.itemPrice);

              if (order.itemPrice) {
                const initialValue = 0;
                const sumOfOrders = orderValues.reduce(
                  (previousValue, currentValue) =>
                    +previousValue + +currentValue,
                  initialValue
                );

                orderSubtotal = sumOfOrders;
              }
              return null;
            })}
            <p>$ {orderSubtotal}</p>
          </div>
          <div className="serviceFeeDiv">
            <label htmlFor="serviceFeeInput">Service Fee</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                inputMode="numeric"
                name="serviceFeeInput"
                onChange={handleServiceFee}
                value={serviceFeeInput}
              />
            </div>
          </div>
          <div className="deliveryFeeDiv">
            <label htmlFor="deliveryFeeInput">Delivery Fee</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                inputMode="numeric"
                name="deliveryFeeInput"
                onChange={handleDeliveryFee}
                value={deliveryFeeInput}
              />
            </div>
          </div>
          <div className="taxDiv">
            <label htmlFor="taxInput">Tax</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                inputMode="numeric"
                name="taxInput"
                onChange={handleTax}
                value={taxInput}
              />
            </div>
          </div>
          <div className="tipDiv">
            <label htmlFor="tipInput">Tip</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                inputMode="numeric"
                name="tipInput"
                onChange={handleTip}
                value={tipInput}
              />
            </div>
          </div>
          <div className="grandTotalDiv">
            <p>Grand Total: ${grandTotalInput}</p>
          </div>
        </form>
        <div className="extraButtons">
          <button
            className="calculateButton"
            onClick={() =>
              calculateBill(
                serviceFeeInput,
                deliveryFeeInput,
                taxInput,
                tipInput
              )
            }
          >
            Calculate
          </button>
          <button className="clearButton" onClick={clearButton}>
            Clear
          </button>
        </div>
      </div>
    </section>
  );
};

export default Fees;

// divide the service and delivery fee by the length of the number of payees
// add that amount to the total of the payee's orders x 1.13 (multiply the tax BEFORE adding the service and delivery fee)
