import { debounce } from "lodash";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const TranslatedText = () => {
  const [searchParams] = useSearchParams();
  const text = searchParams.get("text") || "";

  const translateHandler = (value: string) => {
    console.log("text = ", value);
  };

  const debounceLoadData = React.useCallback(
    debounce(translateHandler, 300),
    []
  );

  React.useEffect(() => {
    debounceLoadData(text);
  }, [text]);

  return <Container>TranslatedText</Container>;
};

const Container = styled.div`
  background-color: #757575;
  text-align: left;
  padding: 16px;
  font-size: 18px;
`;

export default TranslatedText;
