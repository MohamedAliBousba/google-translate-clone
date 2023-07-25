import React from "react";
import styled from "styled-components";
import { AVAILABLE_LANGUAGES } from "utils/constants";
import { SwitchIcon } from "../assets/SwitchIcon";
import { Select, SelectProps } from "antd";
import { useSearchParams } from "react-router-dom";

const LanguagesBar = () => {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [sourceLang, setSourceLang] = React.useState(
    searchParams.get("sl") || "en"
  );
  const [targetLang, setTargetLang] = React.useState(
    searchParams.get("tl") || "ar"
  );

  const setLangParam = (key: string, value: string) =>
    setURLSearchParams((params) => {
      params.set(key, value);
      return params;
    });

  const switchLangsHandler = () => {
    const sl = sourceLang;
    setLangParam("sl", targetLang);
    setLangParam("tl", sourceLang);
    setSourceLang(targetLang);
    setTargetLang(sl);
  };

  const handleChangeSourceLang = (value: string) => {
    setSourceLang(value);
    setLangParam("sl", value);
  };

  const handleChangeTargetLang = (value: string) => {
    setTargetLang(value);
    setLangParam("tl", value);
  };

  React.useEffect(() => {
    if (!searchParams.get("sl")) handleChangeSourceLang("en");
    if (!searchParams.get("tl")) handleChangeTargetLang("ar");
  }, []);

  return (
    <Container>
      <StyledSelect
        value={sourceLang}
        onChange={handleChangeSourceLang}
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
        onChange={handleChangeTargetLang}
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
