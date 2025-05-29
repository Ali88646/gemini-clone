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
  const [user, setUser] = useState(null);

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

    //firebaselogic

    setResultData(responseText);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    onSent,
    prompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    newChat,
    user,
    setPrevPrompts,
    setInput,
    setRecentPrompt,
    setUser,
    setResultData,
    setShowResult,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

export const useAppContext = () => useContext(Context);
