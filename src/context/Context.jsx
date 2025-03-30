import { createContext, useState } from "react";
import { getGeminiResponse } from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, index * 75);
  };

  const newChat = () => {
    setLoading(false);
    setInput("");
    setRecentPrompt("");
    setPrevPrompts([]);
    setShowResponse(false);
    
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResponse(true);
    let response;
    // eslint-disable-next-line no-debugger
    debugger;
    if (typeof prompt === "string") {
      response = await getGeminiResponse(prompt);
      setRecentPrompt(prompt);
    } else {
      setRecentPrompt(input);
      setPrevPrompts((prev) => [...prev, input]);
      response = await getGeminiResponse(input);
    }

    let responsesArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responsesArray.length; i++) {
      if (i == 0 || i % 2 !== 0) {
        newResponse += responsesArray[i];
      } else {
        newResponse += "<b>" + responsesArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");

    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    onSent,
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResponse,
    setShowResponse,
    loading,
    setLoading,
    resultData,
    setResultData,
    newChat
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
