import Header from "./Header";
import Intro from "./Intro";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/calculator" element={<MainContainer />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

// PSEUDO CODE
// grab user input
// store user input
// and go through array of user input to display things
