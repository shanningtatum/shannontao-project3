import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MenuItem = () => {
  // useState itemName
  const [itemName, setItemName] = useState([]);

  // useState itemPrice
  const [itemPrice, setItemPrice] = useState([]);

  const addItemHandle = () => {
    const addItemPopup = document.querySelector(".addItemPopup");
    addItemPopup.classList.toggle("active");
  };

  const closeItemButton = function (e) {
    e.preventDefault();
    const addItemPopup = document.querySelector(".addItemPopup");
    addItemPopup.classList.toggle("active");
    setItemName("");
    setItemPrice("");
  };

  // handle onChange for input values
  const handleItemChange = (e) => {
    setItemName(e.target.value);
  };

  // handle onChange for input values
  const handlePriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  // store input value
  const storeItemName = (e) => {
    e.preventDefault();

    if (itemPrice && itemName) {
      const addItemPopup = document.querySelector(".addItemPopup");
      addItemPopup.classList.toggle("active");
      setItemName("");
      setItemPrice("");
    } else {
      alert("enter a value!");
    }
  };

  return (
    <section className="addItem">
      <div className="addItemPopup popup">
        <form action="">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            name="itemName"
            onChange={handleItemChange}
            value={itemName}
            required
          />
          <label htmlFor="itemPrice">Item Price</label>
          <input
            type="text"
            name="itemPrice"
            onChange={handlePriceChange}
            value={itemPrice}
            required
          />
          <button onClick={storeItemName}>Submit</button>
          <button onClick={closeItemButton}>Cancel</button>
        </form>
      </div>
      <div className="wrapper">
        <h2>Add Item</h2>
        <button className="addItemButton addButton" onClick={addItemHandle}>
          <FontAwesomeIcon icon={faPlus} className="addIcon" />
        </button>
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
