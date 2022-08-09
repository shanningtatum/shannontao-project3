import { useState, useEffect } from "react";
import firebase from "./firebase";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Payee = ({ userInput, setUserInput }) => {
  // set state for inputs
  // useState payeeName
  const [payeeName, setPayeeName] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const data = response.val();
      const newState = [];

      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }

      setUserInput(newState);
    });
  }, []);

  // add popups
  const addPayeeHandle = () => {
    const addPayeePopup = document.querySelector(".addPayeePopup");
    addPayeePopup.classList.toggle("active");
  };

  // close popups
  const closePayeeButton = function (e) {
    e.preventDefault();
    const addPayeePopup = document.querySelector(".addPayeePopup");
    addPayeePopup.classList.toggle("active");
    setPayeeName("");
  };

  // handle input change
  const handlePayeeChange = (e) => {
    setPayeeName(e.target.value);
  };

  // submit button action
  const storePayeeName = (e) => {
    e.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    if (payeeName) {
      push(dbRef, payeeName);
      const addPayeePopup = document.querySelector(".addPayeePopup");
      addPayeePopup.classList.toggle("active");
      setPayeeName("");
    } else {
      alert("enter a value!");
    }
  };

  const deletePayee = (payeeId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${payeeId}`);
    remove(dbRef);
  };

  return (
    <section className="addPayee">
      <div className="addPayeePopup popup">
        <form action="">
          <label htmlFor="payeeName">Payee Name</label>
          <input
            type="text"
            name="payeeName"
            placeholder="ex:Shannon"
            onChange={handlePayeeChange}
            value={payeeName}
          />
          <button onClick={storePayeeName}>Submit</button>
          <button onClick={closePayeeButton}>Cancel</button>
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
            userInput.map((name) => {
              return (
                <li key={name.key} className="payeeBox">
                  <p>{name.name}</p>
                  <button
                    onClick={() => {
                      deletePayee(name.key);
                    }}
                  >
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
