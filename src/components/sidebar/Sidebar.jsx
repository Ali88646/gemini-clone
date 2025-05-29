import React, { useState } from "react";
import { useAppContext } from "../../context/Context";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { MdHelpOutline } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const Sidebar = () => {
  const [isExtended, setIsExtended] = useState(false);
  const {
    onSent,
    prevPrompts,
    newChat,
    setUser,
    setPrevPrompts,
    setInput,
    setRecentPrompt,
    setResultData,
    setShowResult,
  } = useAppContext();

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setPrevPrompts([]);
      setInput("");
      setRecentPrompt("");
      setResultData("");
      setShowResult(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="sideBar min-h-screen flex flex-col justify-between dark:bg-gray-800 bg-[#f0f4f9]   px-4 py-6 max-sm:hidden">
      <div className="space-y-6">
        <MdMenu
          onClick={() => setIsExtended((prev) => !prev)}
          className="ml-2 cursor-pointer dark:text-gray-100"
          size={32}
        />

        <div
          onClick={() => newChat()}
          className="mt-12 flex items-center gap-2 px-4 py-2 bg-[#e6eaf1] dark:bg-gray-700 rounded-full text-sm text-gray-600 cursor-pointer"
        >
          <IoMdAdd size={24} className="dark:text-gray-100" />
          {isExtended && <p className="dark:text-gray-100">New Chat</p>}
        </div>

        {isExtended && (
          <div className="flex flex-col animate-fadeIn ">
            <p className="mt-8 mb-5 text-sm font-medium text-gray-700 dark:text-gray-400">
              Recent
            </p>
            {prevPrompts.map((prompt, i) => (
              <div
                onClick={() => onSent(prompt)}
                key={i}
                className="flex items-center gap-2 px-4 py-2 pr-10 rounded-full text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-[#e2e6eb] dark:hover:bg-gray-700"
              >
                <FiMessageSquare size={16} />
                <p>{prompt.split(" ").slice(4).join(" ")}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2 px-4 py-2 pr-4 rounded-full text-gray-800 dark:text-gray-100 cursor-pointer dark:hover:bg-gray-700 hover:bg-[#e2e6eb]">
          <MdHelpOutline size={20} className="dark:text-gray-100" />

          {isExtended && <p>Help</p>}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 pr-4 rounded-full text-gray-800 dark:text-gray-100 cursor-pointer dark:hover:bg-gray-700 hover:bg-[#e2e6eb]">
          <MdHistory size={20} className="dark:text-gray-100" />
          {isExtended && <p>Activity</p>}
        </div>
        <div className="flex items-center gap-2 px-4 py-2 pr-4 rounded-full text-gray-800 dark:text-gray-100 cursor-pointer dark:hover:bg-gray-700 hover:bg-[#e2e6eb]">
          <MdSettings size={20} className="dark:text-gray-100" />
          {isExtended && <p>Settings</p>}
        </div>
        <div
          onClick={() => logout()}
          className="flex items-center gap-2 px-4 py-2 pr-4 rounded-full text-gray-800 dark:text-gray-100 cursor-pointer dark:hover:bg-gray-700 hover:bg-[#e2e6eb]"
        >
          <BiLogOut size={20} className="dark:text-gray-100" />
          {isExtended && <p>Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
