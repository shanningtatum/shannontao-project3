import { useState, useEffect } from "react";
import firebase from "./firebase";
import {
  getDatabase,
  push,
  ref,
  onValue,
  remove,
  get,
} from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const Payee = ({ userInput, setUserInput }) => {
  const { darkMode } = useContext(DarkModeContext);

  // set state for inputs
  const [payeeName, setPayeeName] = useState("");

  const database = getDatabase(firebase);
  const dbRef = ref(database);

  useEffect(() => {
    get(dbRef).then((response) => {
      const data = response.val();
      const newState = [];

      for (let key in data) {
        newState.push({ key: key, userInfo: data[key] });
      }

      setUserInput(newState);
    });
  }, [dbRef, setUserInput]);

  const updateUserInput = () => {
    onValue(dbRef, (response) => {
      const data = response.val();
      const newState = [];

      for (let key in data) {
        newState.push({ key: key, userInfo: data[key] });
      }

      setUserInput(newState);
    });
  };

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
    setPayeeName(e.target.value);
  };

  // submit button action
  const storePayeeName = (e) => {
    e.preventDefault();

    if (payeeName) {
      push(dbRef, { name: payeeName });
      const addPayeePopup = document.querySelector(".addPayeePopup");
      addPayeePopup.classList.toggle("active");
      setPayeeName("");
    } else {
      alert("enter a value!");
    }

    updateUserInput();
  };

  const deletePayee = (payeeId) => {
    const deleteRef = ref(database, `/${payeeId}`);
    remove(deleteRef);
    updateUserInput();
  };

  return (
    <section className="addPayee">
      <div className="addPayeePopup popup" tabIndex="0">
        <form action="">
          <label htmlFor="payeeName">Payee Name</label>
          <input
            type="text"
            name="payeeName"
            minLength="1"
            maxLength="20"
            placeholder="ex: Shannon"
            onChange={handlePayeeChange}
            value={payeeName}
          />
          <div className="actionButton">
            <button onClick={storePayeeName}>Submit</button>
            <button onClick={closePayeeButton}>Cancel</button>
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
              <FontAwesomeIcon icon={faPlus} className="addIcon " />
            </button>
          </li>
          {
            // RENDER PAYEE LIST
            userInput.map((userObj, index) => {
              return (
                <li
                  className={
                    darkMode ? "payeeBox darkDisplay" : "payeeBox lightDisplay"
                  }
                  key={index}
                >
                  <p>{userObj.userInfo.name}</p>
                  <button
                    className={
                      darkMode ? "deleteButton darkDisplay" : "deleteButton"
                    }
                    onClick={() => deletePayee(userObj.key)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
};

export default Payee;
