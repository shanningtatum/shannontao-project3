import { useState } from "react";
import firebase from "./firebase";
import { getDatabase, update, ref, push, set, remove } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ userInput, setUserInput, subtotal, setSubtotal }) => {
  const database = getDatabase(firebase);

  // useState itemName
  const [itemName, setItemName] = useState([]);
  // useState itemPrice
  const [itemPrice, setItemPrice] = useState([]);
  // useState item Key
  const [itemKey, setItemKey] = useState([]);

  // triggers add item popup
  const addItemHandle = () => {
    const addItemPopup = document.querySelector(".addItemPopup");
    addItemPopup.classList.toggle("active");
    setItemName("");
    setItemPrice("");
  };
  // close add item popup
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

  // read options value
  const readOptions = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setItemKey(e.target.value);
  };
  // store input value
  const storeItemName = (e) => {
    e.preventDefault();

    if (itemPrice && itemName) {
      const addItemPopup = document.querySelector(".addItemPopup");
      const database = getDatabase(firebase);
      const dbRef = ref(database, `/${itemKey}`);
      addItemPopup.classList.toggle("active");

      const userOrder = {
        order: {
          itemName: itemName,
          itemPrice: itemPrice,
        },
      };
      console.log(userInput);
      return update(dbRef, userOrder);
    } else {
      alert("enter a value!");
    }
  };

  // remove item on click handle
  const removeItem = (orderKey) => {
    const deleteRef = ref(database, `/${orderKey}/order`);
    remove(deleteRef);
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
              placeholder="Ex: Chicken Tenders"
              required
            />
            <label htmlFor="itemPrice">Item Price</label>
            <input
              type="number"
              name="itemPrice"
              onChange={handlePriceChange}
              value={itemPrice}
              placeholder="Ex: 4.99"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="selectPayee">Payee Name</label>
            <select
              name="selectPayee"
              defaultValue="Select Payee"
              id="selectPayee"
              className="selectPayee"
              onChange={(e) => readOptions(e)}
            >
              <option value="placeholder" disabled selected>
                Select Payee
              </option>
              {userInput.map((username) => {
                // console.log(username);
                return (
                  <option value={username.userInfo.key}>
                    {username.userInfo.name.name}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <div className="actionButton">
            <button onClick={closeItemButton}>Cancel</button>
            <button onClick={storeItemName}>Submit</button>
          </div>
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
          {userInput.map((userOrder) => {
            // console.log(userOrder);
            if (userOrder.userInfo.name.order == undefined) {
              // alert("missing order");
            } else {
              return (
                <li className="payeeBox">
                  <p>{userOrder.userInfo.name.order.itemName}</p>
                  <p>{userOrder.userInfo.name.order.itemPrice}</p>
                  <button onClick={() => removeItem(userOrder.userInfo.key)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default MenuItem;

// {
//   name:'shannon',
//   orders:{
//     orderItem:'chicken'
//     price: 12.99
//   },
//   {
//     orderItem:'tacos'
//     price: 12.99
//   }

//   ]
// }
