import { useState } from "react";

const Fees = ({
  userOrders,
  userInput,
  setSplitFees,
  setTaxRate,
  setSplitTipAmount,
}) => {
  // set up states for the different inputs
  const [serviceFeeInput, setServiceFee] = useState(0);
  const [deliveryFeeInput, setDeliveryFee] = useState(0);
  const [taxInput, setTax] = useState(0);
  const [tipInput, setTip] = useState(0);
  const [grandTotalInput, setGrandTotal] = useState(0);

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
    setGrandTotal(
      (
        +orderSubtotal +
        +serviceFeeInput +
        +deliveryFeeInput +
        +taxInput +
        +tipInput
      ).toFixed(2)
    );

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
    setServiceFee(0);
    setDeliveryFee(0);
    setTax(0);
    setTip(0);
    setGrandTotal(0);
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
            <p>$ {orderSubtotal.toFixed(2)}</p>
          </div>
          <div className="serviceFeeDiv">
            <label htmlFor="serviceFeeInput">Service Fee</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                id="serviceFeeInput"
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
                id="deliveryFeeInput"
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
                id="taxInput"
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
                id="tipInput"
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
