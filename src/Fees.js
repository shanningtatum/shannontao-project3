import { useState } from "react";

const Fees = ({ userInput, subtotalInput, setSubtotal }) => {
  // set up states for the different inputs
  const [serviceFeeInput, setServiceFee] = useState("");
  const [deliveryFeeInput, setDeliveryFee] = useState("");
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

  const calculateBill = (e, subtotal, serviceFee, deliveryFee) => {
    e.preventDefault();
    console.log(subtotal, serviceFee, deliveryFee);
    setSubtotal("");
    setServiceFee("");
    setDeliveryFee("");
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
            <input
              type="number"
              name="serviceFeeInput"
              onChange={handleServiceFee}
              value={serviceFeeInput}
            />
          </div>
          <div className="deliveryFeeDiv">
            <label htmlFor="deliveryFeeInput">Delivery Fee</label>
            <input
              type="number"
              name="deliveryFeeInput"
              onChange={handleDeliveryFee}
              value={deliveryFeeInput}
            />
          </div>
          <div className="grandTotalDiv">
            <label htmlFor="grandTotalInput">Grand Total</label>
            <input type="text" name="grandTotalInput" />
          </div>
        </form>
        <button
          onClick={(e) =>
            calculateBill(e, subtotalInput, serviceFeeInput, deliveryFeeInput)
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
