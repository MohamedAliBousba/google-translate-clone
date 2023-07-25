import "./App.css";
import LanguagesBar from "./components/LanguagesBar";
import TranslationTextField from "./components/TranslationTextField";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TranslatedText from "components/TranslatedText";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          Component={() => (
            <div className="App">
              <div className="container">
                <LanguagesBar />
                <div className="translation-boxes">
                  <TranslationTextField />
                  <TranslatedText />
                </div>
              </div>
            </div>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
