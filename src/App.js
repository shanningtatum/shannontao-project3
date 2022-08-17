import Header from "./Header";
import Intro from "./Intro";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import { DarkModeProvider } from "./DarkModeContext";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <DarkModeProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/calculator" element={<MainContainer />} />
        </Routes>

        <Footer />
      </DarkModeProvider>
    </div>
  );
}

export default App;
