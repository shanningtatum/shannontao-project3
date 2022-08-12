import { useState, useEffect } from "react";
import firebase from "./firebase";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove,
  update,
  set,
} from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Payee = ({ userInput, setUserInput }) => {
  // set state for inputs
  const [payeeName, setPayeeName] = useState([]);

  const database = getDatabase(firebase);
  const dbRef = ref(database);

  let currentUsers;

  // look into make database and dbref global variables

  // ULTIMATELY...

  // name: payeeName,
  // orders: [
  //  {
  //     itemName:itemName,
  //     itemPrice:itemPrice,
  //   }
  //  {
  //     itemName:'Caesar Salad',
  //     itemPrice:14.99,
  //   }
  // ]

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const data = response.val();
      const newState = [];

      for (let key in data) {
        const userInfo = {
          key: key,
          name: data[key],
        };
        newState.push({ userInfo });
        currentUsers = userInfo;
      }

      setUserInput(newState);
    });
  }, [payeeName]);

  // add popups
  const addPayeeHandle = () => {
    const addPayeePopup = document.querySelector(".addPayeePopup");
    addPayeePopup.classList.toggle("active");
    setPayeeName("");
  };

  // close popups
  const closePayeeButton = function (e) {
    e.preventDefault();
    const addPayeePopup = document.querySelector(".addPayeePopup");
    addPayeePopup.classList.toggle("active");
  };

  // handle input change
  const handlePayeeChange = (e) => {
    setPayeeName({ name: e.target.value });
  };

  // submit button action
  const storePayeeName = (e) => {
    e.preventDefault();

    if (payeeName) {
      push(dbRef, payeeName);
      const addPayeePopup = document.querySelector(".addPayeePopup");
      addPayeePopup.classList.toggle("active");
    } else {
      alert("enter a value!");
    }
  };

  const deletePayee = (payeeId) => {
    const deleteRef = ref(database, `/${payeeId}`);
    remove(deleteRef);
  };

  return (
    <section className="addPayee">
      <div className="addPayeePopup popup">
        <form action="">
          <label htmlFor="payeeName">Payee Name</label>
          <input
            type="text"
            name="payeeName"
            placeholder="ex: Shannon"
            onChange={handlePayeeChange}
            defaultValue=""
          />
          <div className="actionButton">
            <button onClick={closePayeeButton}>Cancel</button>
            <button onClick={storePayeeName}>Submit</button>
          </div>
        </form>
      </div>
      <div className="wrapper">
        <h2>Add Payee</h2>

        <ul className="payeeList">
          <li>
            <button
              className="addPayeeButton addButton"
              onClick={addPayeeHandle}
            >
              <FontAwesomeIcon icon={faPlus} className="addIcon" />
            </button>
          </li>
          {
            userInput.map((userObj, index) => {
              // console.log(userInput);
              return (
                <li className="payeeBox" key={index}>
                  <p>{userObj.userInfo.name.name}</p>
                  <button onClick={() => deletePayee(userObj.userInfo.key)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </li>
              );
            })
            // RENDER PAYEE LIST
          }
        </ul>
      </div>
    </section>
  );
};

export default Payee;

// ask user for payee name
// update payee name variable using setPayeeName

// <FontAwesomeIcon icon={faXmark} />
