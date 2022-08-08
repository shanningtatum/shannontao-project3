import Payee from "./Payee";
import MenuItem from "./MenuItem";
import Fees from "./Fees";

const MainContainer = () => {
  return (
    <main id="mainContent">
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
      <section className="addItem">
        <div className="addItemPopup">
          <form action="">
            <label htmlFor="itemName">Item Name</label>
            <input type="text" name="itemName" />
            <label htmlFor="itemPrice">Item Price</label>
            <input type="text" name="itemPrice" />
            <button>Submit</button>
            <button>Cancel</button>
          </form>
        </div>
        <div className="wrapper">
          <h2>Add Item</h2>
          <button className="addItemButton">Add Item</button>
          <ul className="orderList">
            {
              // RENDER ORDER LIST
            }
          </ul>
        </div>
      </section>
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
      <button>Calculate</button>
      {/* <Payee />
      <MenuItem />
      <Fees /> */}
    </main>
  );
};

export default MainContainer;
