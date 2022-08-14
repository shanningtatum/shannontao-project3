function Display({ userInput, splitFees, taxRate }) {
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

            for (let key in orderArray) {
              newArray.push(orderArray[key]);
              priceArray.push(parseFloat(orderArray[key].itemPrice));
            }

            const priceSum = priceArray.reduce((previous, current) => {
              return previous + current;
            }, 0);

            // console.log(`price sum ${priceSum}`);

            const feeAndPriceSum = +priceSum + +splitFees;

            console.log(splitFees);

            console.log(`fee and price ${feeAndPriceSum}`);

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
                <p>Total: $ {feeAndPriceSum + feeAndPriceSum * taxRate}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Display;
