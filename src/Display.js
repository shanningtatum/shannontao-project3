function Display({
  userInput,
  splitFees,
  taxRate,
  splitTipAmount,
  userOrders,
}) {
  return (
    <section className="displaySection">
      <div className="wrapper">
        {userOrders ? <h2>Split Details</h2> : null}
        <div>
          <ul className="renderPayees">
            {userInput.map((payee) => {
              const orderArray = payee.userInfo.name.order;

              const newArray = [];
              const priceArray = [];

              // creates a new array to map over for the orders
              for (let key in orderArray) {
                const userAndOrder = {
                  name: payee.userInfo.name.name,
                  orderKey: key,
                };

                newArray.push(userAndOrder);
                // creates a new price array to reduce and get price Sum
                priceArray.push(parseFloat(orderArray[key].itemPrice));
              }

              // adds all the value of the person's order together to get the TOTAL sum of what they ordered
              const priceSum = priceArray.reduce((previous, current) => {
                return previous + current;
              }, 0);

              console.log(splitFees);

              // adds the total cost of the person's order with the service fee + delivery fee split

              return newArray.map((item) => {
                const { name, orderKey } = item;
                return (
                  <li key={orderKey} className="payeeBox">
                    <p>{name}</p>
                    <p>
                      $
                      {splitFees
                        ? (
                            (priceSum + +splitFees) * taxRate +
                            +splitTipAmount
                          ).toFixed(2)
                        : priceSum.toFixed(2)}
                    </p>
                  </li>
                );
              });
            })}
            {/* // <tbody>
              //   <tr key={payee.key}>
              //     <td>{payee.userInfo.name.name}</td>
              //     {newArray.map((item) => {
              //       return (
              //         <>
              //           <td key={item.key}>{item.itemName}</td>
              //           <td>$ {item.itemPrice}</td>
              //         </>
              //       );
              //     })}
              //     <td>
              //       $
              //       {splitFees
              //         ? (
              //             (priceSum + +splitFees) * taxRate +
              //             +splitTipAmount
              //           ).toFixed(2)
              //         : priceSum.toFixed(2)}
              //     </td>
              //   </tr>
              // </tbody> */}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Display;
