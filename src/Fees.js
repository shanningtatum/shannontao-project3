import { useState } from "react";

const Fees = ({ userInput, subtotalInput, setSubtotal }) => {
  // set up states for the different inputs
  const [serviceFeeInput, setServiceFee] = useState("");
  const [deliveryFeeInput, setDeliveryFee] = useState("");
  const [grandTotalInput, setGrandTotal] = useState("");
  // empty array to store order values
  const orderValues = [];
  let orderSubtotal = 0;

  // get the handle change for subtotal
  const handleSubtotal = (e) => {
    setSubtotal(e.target.value);
  };

  // get the handle change for service fee
  const handleServiceFee = (e) => {
    setServiceFee(e.target.value);
  };

  // get the handle change for delivery fee
  const handleDeliveryFee = (e) => {
    setDeliveryFee(e.target.value);
  };

  // get the handle change for grand total
  const handleGrandTotal = (e) => {
    setGrandTotal(e.target.value);
  };

  const calculateBill = (e, serviceFee, deliveryFee, grandTotal) => {
    e.preventDefault();

    // calculate how much service fee is per person
    const splitService = serviceFee / userInput.length;
    // console.log(splitService);

    const splitDelivery = deliveryFee / userInput.length;
    // console.log(splitDelivery);

    const totalSplit = splitService + splitDelivery;

    console.log(totalSplit);

    // calcualate the remaining amount to determine taxes
    const orderTax =
      +grandTotal - (+serviceFee + +deliveryFee + +orderSubtotal);
    // console.log(orderTax.toFixed(2));

    // calculate the tax percentage
    const taxPercentage = orderTax / orderSubtotal;

    console.log(parseInt(Math.ceil(parseFloat(taxPercentage) * 100)));

    // console.log(totalSplit);

    userInput.map((cost) => {
      return console.log(+cost.userInfo.name.order.itemPrice + totalSplit);
    });

    setSubtotal("");
    setServiceFee("");
    setDeliveryFee("");
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
              // checks if this variable exists, if it does, run the following code
              if (orderTotal.userInfo.name.order) {
                const priceOfItem = orderTotal.userInfo.name.order.itemPrice;
                // console.log(parseFloat(priceOfItem));

                orderValues.push(parseFloat(priceOfItem));

                const initialValue = 0;
                const sumOfOrders = orderValues.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  initialValue
                );

                orderSubtotal = sumOfOrders.toFixed(2);
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
          <div className="grandTotalDiv">
            <label htmlFor="grandTotalInput">Grand Total</label>
            <div className="inputField">
              <span>$</span>
              <input
                type="number"
                name="grandTotalInput"
                onChange={handleGrandTotal}
                value={grandTotalInput}
              />
            </div>
          </div>
        </form>
        <button
          className="calculateButton"
          onClick={(e) =>
            calculateBill(e, serviceFeeInput, deliveryFeeInput, grandTotalInput)
          }
        >
          Calculate
        </button>
      </div>
    </section>
  );
};

export default Fees;

// divide the service and delivery fee by the length of the number of payees
// add that amount to the total of the payee's orders x 1.13 (multiply the tax BEFORE adding the service and delivery fee)
