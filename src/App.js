import firebase from "./firebase";
import Header from "./Header";
import MainContainer from "./MainContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
    </div>
  );
}

export default App;

// PSEUDO CODE
// grab user input
// store user input
// and go through array of user input to display things
