import { useState } from "react";

const Fees = ({ userInput, setSplitFees, taxRate, setTaxRate }) => {
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
    calculateBill(serviceFeeInput, deliveryFeeInput, taxInput, tipInput);
  };

  // get the handle change for delivery fee
  const handleDeliveryFee = (e) => {
    setDeliveryFee(e.target.value);
    calculateBill(serviceFeeInput, deliveryFeeInput, taxInput, tipInput);
  };

  const handleTax = (e) => {
    setTax(e.target.value);
    calculateBill(serviceFeeInput, deliveryFeeInput, taxInput, tipInput);
  };

  const handleTip = (e) => {
    setTip(e.target.value);
    calculateBill(serviceFeeInput, deliveryFeeInput, taxInput, tipInput);
  };

  // get the handle change for grand total

  const calculateBill = (serviceFee, deliveryFee, taxInput, tipInput) => {
    // e.preventDefault();
    setGrandTotal("");

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
    // console.log(`service:${splitService}`);
    console.log(serviceFee);

    // calculates how much the delivery fee is per person
    const splitDelivery = deliveryFee / userInput.length;
    // console.log(`delivery:${splitDelivery}`);

    const splitTip = tipInput / userInput.length;
    // console.log(`tip:${splitTip}`);

    // TAX RATE :

    const taxPercentage =
      taxInput / (+orderSubtotal + +serviceFee + +deliveryFee);

    console.log(taxPercentage);

    setTaxRate(taxPercentage);

    // tax amount / subtotal + service fee + delivery fee

    const totalSplit = splitService + splitDelivery;

    setSplitFees(totalSplit);

    // console.log(`toptal split ${totalSplit}`);
  };

  const clearButton = () => {
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
            {userInput.map((orderTotal) => {
              const priceArray = orderTotal.userInfo.name.order;

              // checks if this variable exists, if it does, run the following code
              if (orderTotal.userInfo.name.order) {
                for (let key in priceArray) {
                  const priceOfItem = priceArray[key].itemPrice;
                  orderValues.push(parseFloat(priceOfItem));
                }

                const initialValue = 0;
                const sumOfOrders = orderValues.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  initialValue
                );

                orderSubtotal = sumOfOrders;
              }

              // if it doesn't exist, don't do anything
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
            <p>Grand Total: {grandTotalInput}</p>
          </div>
        </form>
        <button className="calculateButton" onClick={clearButton}>
          Clear
        </button>
      </div>
    </section>
  );
};

export default Fees;

// divide the service and delivery fee by the length of the number of payees
// add that amount to the total of the payee's orders x 1.13 (multiply the tax BEFORE adding the service and delivery fee)
