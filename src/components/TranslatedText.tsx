import { debounce } from "lodash";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import styled from "styled-components";
import { translate } from "api/translations";
import SpeakerIcon from "assets/SpeakerIcon";
import CopyIcon from "assets/CopyIcon";
import PauseIcon from "assets/PauseIcon";
import {
  DEFAULT_SOURCE_LANGUAGE,
  DEFAULT_TARGET_LANGUAGE,
} from "utils/constants";

const TranslatedText = () => {
  const [searchParams] = useSearchParams();
  const { speak, cancel, speaking, supported } = useSpeechSynthesis();
  const text = searchParams.get("text") || "";
  const tl = searchParams.get("tl") || DEFAULT_TARGET_LANGUAGE;
  const sl = searchParams.get("sl") || DEFAULT_SOURCE_LANGUAGE;
  const isRTL = ["ar", "fa", "ur"].includes(tl);
  const [translatedText, setTranslatedText] = React.useState<string[]>([]);
  const [voice, setVoice] = React.useState<SpeechSynthesisVoice | null>(null);
  const voices = window.speechSynthesis.getVoices();

  const translateHandler = async (value: string, tl: string, sl: string) => {
    if (!value) {
      setTranslatedText([]);
      return;
    }
    try {
      const response = await translate(tl, sl, value);
      const translatedText = response.data?.data?.translatedText;
      setTranslatedText(translatedText.split("\n"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpeak = () => {
    if (speaking) {
      cancel();
    } else {
      speak({ text: translatedText.join("\n").toString(), voice });
    }
  };

  const copyHandler = () => {
    const txt = translatedText.join("\n").toString();
    navigator.clipboard.writeText(txt);
  };

  const debounceLoadData = React.useCallback(
    debounce(translateHandler, 300),
    []
  );

  React.useEffect(() => {
    debounceLoadData(text, tl, sl);
  }, [text, tl, sl]);

  React.useEffect(() => {
    const voice = voices.find((voice: SpeechSynthesisVoice) =>
      voice.lang.includes(tl)
    );
    setVoice(voice || null);
  }, [tl, voices]);

  return (
    <Container $rtl={isRTL}>
      <div>
        {translatedText.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      {translatedText.length !== 0 && (
        <Actions>
          <div>
            {supported && voice && (
              <button onClick={handleSpeak}>
                {speaking ? <PauseIcon /> : <SpeakerIcon />}
              </button>
            )}
          </div>
          <button onClick={copyHandler}>
            <CopyIcon />
          </button>
        </Actions>
      )}
    </Container>
  );
};

const Container = styled.div<{ $rtl: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.primary[600]};
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  font-size: 18px;
  word-break: break-all;

  div {
    padding: 16px;
    overflow: auto;
    max-height: 52vh;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid ${(props) => props.theme.primary[600]};
      border-radius: 20px;
      background-color: ${(props) => props.theme.primary.main};
    }
  }
`;

const Actions = styled.div`
  button:nth-child(1) {
    position: absolute;
    left: 10px;
    bottom: 10px;
  }
  button:nth-child(2) {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`;

export default TranslatedText;
