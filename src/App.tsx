import "./App.css";
import LanguagesBar from "./components/LanguagesBar";
import TranslationTextField from "./components/TranslationTextField";

function App() {

  return (
    <div className="App">
      <div className="container">
        <LanguagesBar />
        <div className="translation-boxes">
          <TranslationTextField />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
