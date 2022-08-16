function Display({ userInput, splitFees, taxRate, splitTipAmount }) {
  return (
    <section className="displaySection">
      <div className="wrapper">
        <h2>Owed</h2>
        <div className="renderPayees">
          <table>
            <thead>
              <tr>
                <th>Payee</th>
                <th>Item Ordered</th>
                <th>Total Owed</th>
              </tr>
            </thead>
            {userInput.map((payee) => {
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

              return (
                <tbody>
                  <tr key={payee.key}>
                    <td>{payee.userInfo.name.name}</td>
                    {newArray.map((item) => {
                      return (
                        <>
                          <td key={item.key}>{item.itemName}</td>
                          <td>$ {item.itemPrice}</td>
                        </>
                      );
                    })}
                    <td>
                      $
                      {splitFees
                        ? (
                            (priceSum + +splitFees) * taxRate +
                            +splitTipAmount
                          ).toFixed(2)
                        : priceSum.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </section>
  );
}

export default Display;
