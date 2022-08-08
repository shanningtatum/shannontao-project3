const Payee = () => {
  return (
    <section className="addPayee">
      <div className="addPayeePopup">
        <form action="">
          <label htmlFor="payeeName">Payee Name</label>
          <input type="text" name="payeeName" />
          <button>Submit</button>
          <button>Cancel</button>
        </form>
      </div>
      <div className="wrapper">
        <h2>Add Payee</h2>
        <button className="addPayeeButton">Add Payee</button>
        <ul className="payeeList">
          {
            // RENDER PAYEE LIST
          }
        </ul>
      </div>
    </section>
  );
};

export default Payee;
