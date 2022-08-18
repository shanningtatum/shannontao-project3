import Header from "./Header";
import Intro from "./Intro";
import MainContainer from "./MainContainer";
import Footer from "./Footer";
import ErrorPage from "./ErrorPage";
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
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </DarkModeProvider>
    </div>
  );
}

export default App;
