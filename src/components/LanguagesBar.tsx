import React from "react";
import styled from "styled-components";
import { AVAILABLE_LANGUAGES } from "utils/constants";
import { SwitchIcon } from "../assets/SwitchIcon";
import { Select, SelectProps } from "antd";

const LanguagesBar = () => {
  const [sourceLang, setSourceLang] = React.useState("en");
  const [targetLang, setTargetLang] = React.useState("ar");

  const switchLangsHandler = () => {
    const sl = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(sl);
  };

  return (
    <Container>
      <StyledSelect
        value={sourceLang}
        onChange={(value: string) => setSourceLang(value)}
        options={AVAILABLE_LANGUAGES.map((language) => ({
          value: language.code,
          label: language.name,
          disabled: language.code === targetLang,
        }))}
        bordered={false}
      />
      <button onClick={switchLangsHandler}>
        <SwitchIcon />
      </button>
      <StyledSelect
        value={targetLang}
        onChange={(value: string) => setTargetLang(value)}
        options={AVAILABLE_LANGUAGES.map((language) => ({
          value: language.code,
          label: language.name,
          disabled: language.code === sourceLang,
        }))}
        bordered={false}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: #424242;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #616161;

  div {
    flex: 1;
    padding: 16px 0;
    text-transform: uppercase;
  }

  button {
    background-color: inherit;
    opacity: 0.8;
    border: none;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;

const StyledSelect: React.FC<SelectProps> = styled(Select)`
  border: none !important;
  outline: none !important;
  & .ant-select-selector {
    background-color: inherit !important;
    border: none !important;
    outline: none !important;
  }
  & svg {
    display: none !important;
  }
  & span {
    color: #ffffff !important;
    font-size: 16px;
  }
`;

export default LanguagesBar;
