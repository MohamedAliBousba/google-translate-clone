import styled from "styled-components";
import CloseIcon from "../assets/CloseIcon";

const TranslationTextField = () => {
  const clearTextHandler = () => {
    console.log("clear");
  };

  return (
    <Container>
      <textarea placeholder="Start typing.." cols={30} rows={10}></textarea>
      <button onClick={clearTextHandler}>
        <CloseIcon />
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  button {
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    outline: none;
    box-shadow: none;
    color: #ffffff;
    padding: 16px;
    font-size: 18px;
  }

  textarea:placeholder-shown + button {
    display: none;
  }

  svg {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

export default TranslationTextField;
