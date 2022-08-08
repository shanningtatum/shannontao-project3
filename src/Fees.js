const Fees = () => {
  return (
    <section className="extraFees">
      <div className="wrapper">
        <h2>Fees</h2>
        <form action="">
          <label htmlFor="subtotalInput">Subtotal</label>
          <input type="text" name="subtotalInput" />
          <label htmlFor="serviceFeeInput">Service Fee</label>
          <input type="text" name="serviceFeeInput" />
          <label htmlFor="deliveryFeeInput">Delivery Fee</label>
          <input type="text" name="deliveryFeeInput" />
          <label htmlFor="grandTotalInput">Grand Total</label>
          <input type="text" name="grandTotalInput" />
        </form>
      </div>
    </section>
  );
};

export default Fees;
