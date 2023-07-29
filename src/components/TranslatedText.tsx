import { debounce } from "lodash";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { translate } from "api/translations";

const TranslatedText = () => {
  const [searchParams] = useSearchParams();
  const text = searchParams.get("text") || "";
  const tl = searchParams.get("tl") || "ar";
  const sl = searchParams.get("sl") || "ar";
  const isRTL = ["ar", "fa", "ur"].includes(tl);
  const [translatedText, setTranslatedText] = React.useState([""]);

  const translateHandler = async (value: string, tl: string, sl: string) => {
    if (!value) {
      setTranslatedText([""]);
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

  const debounceLoadData = React.useCallback(
    debounce(translateHandler, 300),
    []
  );

  React.useEffect(() => {
    debounceLoadData(text, tl, sl);
  }, [text, tl, sl]);

  return (
    <Container $rtl={isRTL}>
      {translatedText.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div<{ $rtl: boolean }>`
  background-color: ${props => props.theme.primary[600]};
  text-align: ${(props) => (props.$rtl ? "right" : "left")};
  padding: 16px;
  font-size: 18px;
  word-break: break-all;
`;

export default TranslatedText;
