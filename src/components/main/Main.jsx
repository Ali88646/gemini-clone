import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Context";
import MarkdownRenderer from "./MarkDownViewr";
import DarkModeToggle from "./DarkModeToggle";
import { IoMdSend } from "react-icons/io";
import { FaRegCompass } from "react-icons/fa6";

const suggestData = [
  "Suggest beautiful places to see an upcoming road trip",
  "Briefly summarize this concept: urban planning",
  "Brainstorm team bonding activities for our work retreat",
  "Improve the readability of the following code",
];

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    user,
  } = useAppContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim().length !== 0) {
      onSent(input);
    }
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative dark:bg-gray-900">
      <div className="flex items-center justify-between text-[22px] p-5 text-[#585858] dark:text-gray-100  ">
        <p>Gemini</p>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <img
            src={user?.photoURL || assets.user_icon}
            alt="user-icon"
            className="w-10 rounded-full cursor-pointer"
          />
        </div>
      </div>

      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-[46px] md:text-[56px] text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, {user?.displayName.split(" ")[0]}.
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
              {suggestData.map((item, index) => {
                return (
                  <div
                    onClick={() => onSent(item)}
                    key={index}
                    className="h-[200px] p-4 bg-[#f0f4f9] dark:bg-gray-700  rounded-lg relative cursor-pointer dark:hover:bg-gray-600 hover:bg-[#dfe4ea]"
                  >
                    <p className="text-[#585858] text-[17px] dark:text-gray-100">
                      {item}
                    </p>

                    <FaRegCompass
                      size={35}
                      className="p-1 absolute bg-white dark:bg-gray-600 rounded-full bottom-2 right-2 dark:text-gray-400"
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="px-[5%] max-h-[70vh] overflow-y-scroll hide-scrollbar">
            <div className="my-10 flex items-center gap-5">
              <img
                src={user?.photoURL || assets.user_icon}
                alt="user-icon"
                className="w-10 rounded-full"
              />
              <p className="dark:text-gray-100">{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img
                src={assets?.gemini_icon}
                alt="gemini-icon"
                className="w-10 rounded-full"
              />
              {loading ? (
                <div className="loader w-full flex flex-col gap-3">
                  <hr className="rounded-md border-none bg-[#f6f7f8]" />
                  <hr className="rounded-md border-none bg-[#f6f7f8]" />
                  <hr className="rounded-md border-none bg-[#f6f7f8]" />
                </div>
              ) : (
                <MarkdownRenderer content={resultData} />
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto">
          <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] dark:bg-gray-600 px-5 py-2.5 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Enter prompt here"
              className="flex-1 bg-transparent border-none outline-none p-2 text-[18px] dark:placeholder:text-gray-400 dark:text-gray-200"
            />
            <div className="flex items-center gap-4">
              <IoMdSend
                onClick={() => onSent(input)}
                size={24}
                className={`cursor-pointer ${
                  !input.trim().length ? "hidden" : ""
                } dark:text-gray-100`}
              />
            </div>
          </div>
          <p className="text-[13px] mt-4 text-center font-light dark:text-gray-100">
            Gemini may display inaccurate info, including about people, so
            double check its response. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
