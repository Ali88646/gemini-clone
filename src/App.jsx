import React, { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import { useAppContext } from "./context/Context";
import LoginButton from "./components/main/LoginButton";

const App = () => {
  const { user, setUser } = useAppContext();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, [storedUser, setUser]);

  return !user ? (
    <div className="w-full min-h-screen flex items-center justify-center dark:bg-gray-900 ">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl md:text-6xl lg:text-8xl text-center  bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
          In order to use Gemini Ai <br /> please login first
        </h2>
        <LoginButton />
      </div>
    </div>
  ) : (
    <>
      <Sidebar />
      <Main />
    </>
  );
};

export default App;
