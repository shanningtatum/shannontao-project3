const MenuItem = () => {
  return (
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
  );
};

export default MenuItem;
