import React from "react";
import styled from "styled-components";
import CloseIcon from "../assets/CloseIcon";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSearchParams } from "react-router-dom";
import MicIcon from "assets/MicIcon";
import PauseIcon from "assets/PauseIcon";
import SpeakerIcon from "assets/SpeakerIcon";

const TranslationTextField = () => {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [text, setText] = React.useState(searchParams.get("text") || "");
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();

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

  const handleSpeak = () => {
    if (speaking) {
      cancel();
    } else {
      speak({ text });
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
      <Actions>
        {browserSupportsSpeechRecognition && (
          <button onClick={handleSpeech}>
            {listening ? <PauseIcon /> : <MicIcon />}
          </button>
        )}
        {supported && text && (
          <button onClick={handleSpeak}>
            {speaking ? <PauseIcon /> : <SpeakerIcon />}
          </button>
        )}
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: auto;

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

  textarea {
    width: 100%;
    height: 87%;
    background-color: inherit;
    border: none;
    outline: none;
    box-shadow: none;
    color: #ffffff;
    padding: 16px 40px 24px 16px;
    font-size: 18px;
    resize: none;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid ${(props) => props.theme.primary.main};
      border-radius: 20px;
      background-color: ${(props) => props.theme.primary[700]};
    }
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

const Actions = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default TranslationTextField;
