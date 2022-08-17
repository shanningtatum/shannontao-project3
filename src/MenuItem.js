import { useEffect, useState } from "react";
import firebase from "./firebase";
import { getDatabase, ref, push, remove } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const MenuItem = ({ userInput, userOrders, setUserOrders }) => {
  const { darkMode } = useContext(DarkModeContext);
  const database = getDatabase(firebase);

  // useState itemName
  const [itemName, setItemName] = useState("");
  // useState itemPrice
  const [itemPrice, setItemPrice] = useState(0);
  // useState item Key
  const [itemKey, setItemKey] = useState("");

  // use effect only on update
  useEffect(() => {
    const newOrders = [];

    userInput.forEach((people) => {
      const orderArray = people.userInfo.order;

      for (let key in orderArray) {
        const newOrder = {
          parentKey: people.key,
          key: key,
          name: people.userInfo.name,
          itemName: orderArray[key].itemName,
          itemPrice: orderArray[key].itemPrice,
        };
        newOrders.push(newOrder);
      }
    });

    setUserOrders(newOrders);
  }, [itemName, setUserOrders, userInput, itemKey, database]);

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
    // this reads the value based on the drop down (parentKey)
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

      return push(dbRef, userOrder);
    } else {
      alert("Enter a value");
    }
  };

  // remove order node on handle click
  const removeItem = (parentKey, childKey) => {
    const deleteRef = ref(database, `/${parentKey}/order/${childKey}`);
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
              id="itemName"
              maxLength="20"
              onChange={handleItemChange}
              value={itemName}
              placeholder="Ex: Pho"
              required
            />
            <label htmlFor="itemPrice">Item Price</label>
            <input
              type="number"
              name="itemPrice"
              id="itemPrice"
              onChange={handlePriceChange}
              value={itemPrice}
              placeholder="Ex: 12.99"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="selectPayee">Payee Name</label>
            <select
              name="selectPayee"
              id="selectPayee"
              defaultValue="placeholder"
              className="selectPayee"
              onChange={(e) => readOptions(e)}
            >
              <option value="placeholder" disabled>
                Select Payee
              </option>
              {userInput.map((username) => {
                return (
                  <option value={username.key} key={username.key}>
                    {username.userInfo.name}
                  </option>
                );
              })}
            </select>
          </fieldset>
          <div className="actionButton">
            <button
              onClick={storeItemName}
              disabled={!itemKey || !itemName || !itemPrice}
            >
              Submit
            </button>
            <button onClick={closeItemButton}>Cancel</button>
          </div>
        </form>
      </div>
      <div className="wrapper">
        <h2>Add Item</h2>
        <ul className="orderList">
          <li>
            <button className="addItemButton addButton" onClick={addItemHandle}>
              <FontAwesomeIcon icon={faPlus} className="addIcon" />
              <span className="sr-only">Add Item</span>
            </button>
          </li>
          {userOrders.map((order) => {
            const { parentKey, key, itemName, itemPrice } = order;
            return (
              <li
                className={
                  darkMode ? "payeeBox darkDisplay" : "payeeBox lightDisplay"
                }
                key={key}
              >
                <p>{itemName}</p>
                <p>${parseFloat(itemPrice).toFixed(2)}</p>
                <p className="payeeName">{order.name}</p>
                <div className="deleteButtonDiv">
                  <button
                    className={
                      darkMode ? "deleteButton darkDisplay" : "deleteButton"
                    }
                    onClick={() => removeItem(parentKey, key)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                    <span className="sr-only">
                      Delete {itemName} from Order List
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MenuItem;
