import React from "react";
import styled from "styled-components";
import CloseIcon from "../assets/CloseIcon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSearchParams } from "react-router-dom";
import MicIcon from "assets/MicIcon";
import PauseIcon from "assets/PauseIcon";

const TranslationTextField = () => {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [text, setText] = React.useState(searchParams.get("text") || "");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const setTextParam = (value: string) => {
    setText(value);
    setURLSearchParams((params) => {
      params.set("text", value);
      return params;
    });
  };

  const clearTextHandler = () => {
    setTextParam("");
    resetTranscript();
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextParam(value);
  };

  const handleSpeech = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  React.useEffect(() => {
    if (!transcript) return;
    setTextParam(transcript);
  }, [transcript]);

  return (
    <Container>
      <div style={{ height: "100%" }}>
        <textarea
          value={text}
          onChange={handleChangeText}
          placeholder="Start typing.."
        ></textarea>
        <button className="text-clear" onClick={clearTextHandler}>
          <CloseIcon />
        </button>
      </div>
      {browserSupportsSpeechRecognition && (
        <button className="start-speech" onClick={handleSpeech}>
          {listening ? <PauseIcon /> : <MicIcon />}
        </button>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: auto;
  div {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: inherit;
    opacity: 0.8;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }

  .start-speech {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  textarea {
    width: 100%;
    height: 100%;
    background-color: inherit;
    border: none;
    outline: none;
    box-shadow: none;
    color: #ffffff;
    padding: 16px 40px 24px 16px;
    font-size: 18px;
    resize: none;
  }

  textarea:placeholder-shown + .text-clear {
    display: none;
  }

  .text-clear svg {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;

export default TranslationTextField;
