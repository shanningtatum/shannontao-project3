import { useState } from "react";
import firebase from "./firebase";
import {
  getDatabase,
  update,
  ref,
  push,
  set,
  remove,
  get,
} from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const MenuItem = ({ userInput }) => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);
  const menuItemData = {};

  // useState itemName
  const [itemName, setItemName] = useState([]);
  // useState itemPrice
  const [itemPrice, setItemPrice] = useState([]);
  // useState item Key
  const [itemKey, setItemKey] = useState([]);

  // get menu items
  // get(dbRef).then((dbObj) => {
  //   if (dbObj.exists()) {
  //     menuItemData.push(dbObj.val());

  //     for (let item in menuItemData) {
  //       console.log(item);
  //     }
  //   } else {
  //     console.log("no data");
  //   }
  // });

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
      const dbRef = ref(database, `/${itemKey}/order`);
      addItemPopup.classList.toggle("active");

      const userOrder = {
        itemName: itemName,
        itemPrice: itemPrice,
      };
      console.log(userInput);
      return push(dbRef, userOrder);
    } else {
      alert("enter a value!");
    }
  };

  // remove order node on handle click
  const removeItem = (orderKey) => {
    const deleteRef = ref(database, `/${orderKey}/order`);
    remove(deleteRef);
  };

  return (
    <section className="addItem">
      <div className="addItemPopup popup" tabIndex="0">
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
            // ONLY runs these lines of code if there is a userOrder associated with the person
            if (userOrder.userInfo.name.order) {
              // console.log(userOrder.userInfo.name.order);

              const newObj = userOrder.userInfo.name.order;
              console.log(" new object console");
              console.log(newObj);
              let orderItem;
              let orderPrice;

              for (let key in newObj) {
                // orderItem = newObj[key].itemName;
                // orderPrice = newObj[key].itemPrice;
                const obj = newObj[key];

                if (!newObj.hasOwnProperty(key)) continue;

                console.log(obj);

                for (let item in obj) {
                  console.log(obj.itemName);

                  if (!obj.hasOwnProperty(item)) continue;
                  return (
                    <li className="payeeBox">
                      <p>{obj.itemName}</p>
                      <p>{obj.itemPrice}</p>
                      <button
                        onClick={() => removeItem(userOrder.userInfo.key)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </li>
                  );
                }
              }
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default MenuItem;
