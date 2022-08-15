import { useEffect } from "react";

function Display({ userInput, splitFees, taxRate, splitTipAmount }) {
  return (
    <section className="displaySection">
      <h2>Owed</h2>
      <div className="renderPayees">
        <ul>
          {userInput.map((payee) => {
            // console.log(payee.userInfo.name.name);
            const orderArray = payee.userInfo.name.order;
            const newArray = [];
            const priceArray = [];

            // creates a new array to map over for the orders
            for (let key in orderArray) {
              newArray.push(orderArray[key]);
              // creates a new price array to reduce and get price Sum
              priceArray.push(parseFloat(orderArray[key].itemPrice));
            }

            // adds all the value of the person's order together to get the TOTAL sum of what they ordered
            const priceSum = priceArray.reduce((previous, current) => {
              return previous + current;
            }, 0);

            // adds the total cost of the person's order with the service fee + delivery fee split
            const feeAndPriceSum = +priceSum + +splitFees;

            console.log(priceSum);

            return (
              <li className="payeeList">
                <p>{payee.userInfo.name.name}</p>
                {newArray.map((item) => {
                  return (
                    <>
                      <p>{item.itemName}</p>
                      <p>$ {item.itemPrice}</p>
                    </>
                  );
                })}
                <p>
                  Total: $
                  {(
                    (priceSum + +splitFees) * taxRate +
                    +splitTipAmount
                  ).toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Display;
