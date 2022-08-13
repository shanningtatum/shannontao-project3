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

  // store ORDER array
  const [orderArray, setOrderArray] = useState([]);

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
      // console.log(userInput);
      return push(dbRef, userOrder);
    } else {
      alert("enter a value!");
    }
  };

  // remove order node on handle click
  const removeItem = (orderKey) => {
    console.log(orderKey);
    const deleteRef = ref(database, `/${orderKey}/order`);

    console.log(deleteRef.child);
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
              // console.log("userinfo");
              // console.log(userOrder.userInfo.name.order);

              // create a new object based on orders
              const newObj = userOrder.userInfo.name.order;
              const newOrders = [];

              // loop through new object to get key
              for (let key in newObj) {
                const orderKey = {
                  key: key,
                  itemName: newObj[key].itemName,
                  itemPrice: newObj[key].itemPrice,
                };

                newOrders.push(orderKey);

                // return Object.values(orderKey).map((eachOrder) => {
                //   return (
                //     <li className="payeeBox">
                //       <p>{eachOrder.itemName}</p>
                //       <p>{eachOrder.itemPrice}</p>
                //       <button onClick={() => removeItem()}>
                //         <FontAwesomeIcon icon={faXmark} />
                //       </button>
                //     </li>
                //   );
                // });

                // return orderArray.map((eachOrder) => {
                //   console.log(eachOrder);

                // });
              }

              return newOrders.map((orders) => {
                return (
                  <li className="payeeBox">
                    <p>{orders.itemName}</p>
                    <p>{orders.itemPrice}</p>
                    <button onClick={() => removeItem(userOrder.userInfo.key)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </li>
                );
              });

              // create an array based on values of the new object so i can go through them as .map
              // const orderArray = Object.values(newObj);

              // returns all the values of the order Array to display items
            }
          })}
        </ul>
      </div>
    </section>
  );
};

export default MenuItem;
