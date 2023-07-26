import axios from "axios";

const API_URL = "https://text-translator2.p.rapidapi.com/translate";

const headers = {
  "content-type": "application/x-www-form-urlencoded",
  "X-RapidAPI-Key": process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
  "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
};

const translate = (tl: string, sl: string, text: string) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", sl);
  encodedParams.set("target_language", tl);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: API_URL,
    headers,
    data: encodedParams,
  };

  return axios.request(options);
};

export { translate };
