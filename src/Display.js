function Display({ userInput, splitFees }) {
  return (
    <section className="displaySection">
      <h2>Owed</h2>
      <div className="renderPayees">
        <ul>
          {userInput.map((payee) => {
            console.log(payee.userInfo.name.name);
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
                <p>Total: $ {priceSum.toFixed(2)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Display;
