import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

function Display({
  userInput,
  splitFees,
  taxRate,
  splitTipAmount,
  userOrders,
}) {
  const { darkMode } = useContext(DarkModeContext);
  let priceSum;

  return (
    <section className="displaySection">
      <div className="wrapper">
        {userOrders === "" ? null : <h2>Split Details</h2>}
        <div>
          <ul className="renderPayees">
            {userInput.map((payee) => {
              const userArray = payee.userInfo.order;
              const newArray = [];
              const priceArray = [];

              for (let key in userArray) {
                priceArray.push(parseFloat(userArray[key].itemPrice));
              }

              priceSum = priceArray.reduce((previous, current) => {
                return previous + current;
              }, 0);

              const userData = {
                name: payee.userInfo.name,
                key: payee.key,
                orderTotal: priceSum,
              };

              newArray.push(userData);

              return newArray.map((item) => {
                return (
                  <li
                    key={item.key}
                    className={darkMode ? "payeeBox darkDisplay" : "payeeBox"}
                  >
                    <p>{item.name}</p>
                    <p>
                      $
                      {splitFees
                        ? (
                            (item.orderTotal + splitFees) * taxRate +
                            splitTipAmount
                          ).toFixed(2)
                        : item.orderTotal.toFixed(2)}
                    </p>
                  </li>
                );
              });
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Display;
