import { useState, useEffect } from "react";
import firebase from "./firebase";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Payee = ({ userInput, setUserInput }) => {
  // set state for inputs
  const [payeeName, setPayeeName] = useState([]);

  const database = getDatabase(firebase);
  const dbRef = ref(database);

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
        newState.push({ key: key, userInfo });
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
      setPayeeName("");
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
      <div className="addPayeePopup popup" tabIndex="0">
        <form action="">
          <label htmlFor="payeeName">Payee Name</label>
          <input
            type="text"
            name="payeeName"
            placeholder="ex: Shannon"
            onChange={handlePayeeChange}
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
              <FontAwesomeIcon icon={faPlus} className="addIcon" />
            </button>
          </li>
          {
            // RENDER PAYEE LIST
            userInput.map((userObj, index) => {
              // console.log(userInput);
              return (
                <li className={`payeeBox ${index}`} key={index}>
                  <p>{userObj.userInfo.name.name}</p>
                  <button onClick={() => deletePayee(userObj.userInfo.key)}>
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
