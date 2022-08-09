import { useState } from "react";
import firebase from "./firebase";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove,
  set,
} from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ userInput, setUserInput }) => {
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
  const storeItemName = (e, payeeId) => {
    e.preventDefault();

    if (itemPrice && itemName) {
      const addItemPopup = document.querySelector(".addItemPopup");
      const database = getDatabase(firebase);
      const dbRef = ref(database, `/${payeeId}`);
      addItemPopup.classList.toggle("active");

      console.log(payeeId);

      set(dbRef, {
        name: userInput.name,
        item: itemName,
        price: itemPrice,
      });
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
          <fieldset>
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
              type="number"
              name="itemPrice"
              onChange={handlePriceChange}
              value={itemPrice}
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="selectPayee">Payee Name</label>
            <select name="selectPayee" id="selectPayee">
              {userInput.map((username) => {
                return <option value={username.name}>{username.name}</option>;
              })}
            </select>
          </fieldset>
          <button onClick={storeItemName}>Submit</button>
          <button onClick={closeItemButton}>Cancel</button>
        </form>
      </div>
      <div className="wrapper">
        <h2>Add Item</h2>
        <ul className="orderList">
          <li>
            <button className="addItemButton addButton" onClick={addItemHandle}>
              <FontAwesomeIcon icon={faPlus} className="addIcon" />
            </button>
          </li>
          {
            // RENDER ORDER LIST
          }
        </ul>
      </div>
    </section>
  );
};

export default MenuItem;
