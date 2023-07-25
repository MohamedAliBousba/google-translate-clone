import React from "react";
import styled from "styled-components";
import CloseIcon from "../assets/CloseIcon";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

const TranslationTextField = () => {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [text, setText] = React.useState(searchParams.get("text") || "");

  const setTextParam = (value: string) =>
    setURLSearchParams((params) => {
      params.set("text", value);
      return params;
    });

  const clearTextHandler = () => {
    setText("");
    setTextParam("")
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setTextParam(value)
  };

  return (
    <Container>
      <textarea
        value={text}
        onChange={handleChangeText}
        placeholder="Start typing.."
      ></textarea>
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
