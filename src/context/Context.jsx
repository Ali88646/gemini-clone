import { createContext, useContext, useState } from "react";
import runGeminiChat from "../config/gemini";

const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  //   const delayPara = (index, nextWord) => {
  //     setTimeout(() => {
  //       setResultData((prev) => prev + nextWord);
  //     }, 75 * index);
  //   };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);
    setPrevPrompts((prev) => {
      if (prev.includes(prompt)) {
        return prev;
      } else {
        return [prompt, ...prev].slice(0, 10);
      }
    });
    const responseText = await runGeminiChat(prompt);
    // let responseArray = responseText.split("**");
    // let newResponse = "";
    // for (let i = 0; i < responseArray.length; i++) {
    //   if (i === 0 || i % 2 !== 1) {
    //     newResponse += responseArray[i];
    //   } else {
    //     newResponse += "<b>" + responseArray[i] + "</b>";
    //   }
    // }
    // let newResponse2 = newResponse.split("*").join("</br>");
    // let newResponseArray = newResponse2.split(" ");
    // for (let i = 0; i < newResponseArray.length; i++) {
    //   const nextWord = " " + newResponseArray[i];
    //   delayPara(i, nextWord);
    // }

    setResultData(responseText);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    prompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

export const useAppContext = () => useContext(Context);
