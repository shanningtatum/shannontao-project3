import { useState } from "react";

const Fees = () => {
  // set up states for the different inputs
  const [subtotalInput, setSubtotal] = useState("");
  const [serviceFeeInput, setServiceFee] = useState("");
  const [deliveryFeeInput, setDeliveryFee] = useState("");

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
            <label htmlFor="subtotalInput">Subtotal</label>
            <input
              type="number"
              name="subtotalInput"
              onChange={handleSubtotal}
              value={subtotalInput}
            />
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
