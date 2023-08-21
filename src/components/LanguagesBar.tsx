import React from "react";
import styled from "styled-components";
import { AVAILABLE_LANGUAGES, DEFAULT_SOURCE_LANGUAGE, DEFAULT_TARGET_LANGUAGE } from "utils/constants";
import { SwitchIcon } from "../assets/SwitchIcon";
import { Select, SelectProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { palette } from "theme/palette";

const LanguagesBar = () => {
  const [searchParams, setURLSearchParams] = useSearchParams();
  const [sourceLang, setSourceLang] = React.useState(
    searchParams.get("sl") || DEFAULT_SOURCE_LANGUAGE
  );
  const [targetLang, setTargetLang] = React.useState(
    searchParams.get("tl") || DEFAULT_TARGET_LANGUAGE
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
    if(value === targetLang) {
      switchLangsHandler()
      return;
    }
    setSourceLang(value);
    setLangParam("sl", value);
  };

  const handleChangeTargetLang = (value: string) => {
    if(value === sourceLang) {
      switchLangsHandler()
      return;
    }
    setTargetLang(value);
    setLangParam("tl", value);
  };

  React.useEffect(() => {
    if (!searchParams.get("sl")) handleChangeSourceLang(DEFAULT_SOURCE_LANGUAGE);
    if (!searchParams.get("tl")) handleChangeTargetLang(DEFAULT_TARGET_LANGUAGE);
  }, []);

  return (
    <Container>
      <StyledSelect
        value={sourceLang}
        onChange={handleChangeSourceLang}
        options={AVAILABLE_LANGUAGES.map((language) => ({
          value: language.code,
          label: language.name,
        }))}
        bordered={false}
        dropdownStyle={{ backgroundColor: palette.primary[400] }}
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
        }))}
        dropdownStyle={{ backgroundColor: palette.primary[400] }}
        bordered={false}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${props => props.theme.primary.main};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.primary[700]};

  div {
    flex: 1;
    padding: 16px 0;
    text-transform: uppercase;
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
