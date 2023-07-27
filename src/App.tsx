import LanguagesBar from "./components/LanguagesBar";
import TranslationTextField from "./components/TranslationTextField";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TranslatedText from "components/TranslatedText";
import styled, { ThemeProvider } from "styled-components";
import { palette } from "theme/palette";

function App() {
  return (
    <ThemeProvider theme={palette}>
      <Router>
        <Routes>
          <Route
            path="/"
            Component={() => (
              <Container>
                <LanguagesBar />
                <div className="translation-boxes">
                  <TranslationTextField />
                  <TranslatedText />
                </div>
              </Container>
            )}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const Container = styled.div`
  text-align: center;
  color: #ffffff;
  height: 50vh;
  width: 80vw;
  background-color: ${(props) => props.theme.primary.main};
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 10vh;
  overflow: hidden;
  perspective: 1px;
  display: flex;
  flex-direction: column;

  .translation-boxes {
    flex-grow: 1;
    display: flex;
  }

  .translation-boxes div {
    flex: 1;
  }
`;

export default App;
