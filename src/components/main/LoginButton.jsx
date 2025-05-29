// LoginButton.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FaGoogle } from "react-icons/fa";
import { useAppContext } from "../../context/Context";

const LoginButton = () => {
  const { setUser } = useAppContext();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new error(error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className=" bg-gray-900 dark:bg-gray-100 hover:bg-gray-900 dark:hover:bg-gray-100 duration-200 hover:scale-105 text-white dark:text-gray-900 cursor-pointer grow-0 self-center px-6 py-4 flex items-center gap-3 rounded-full hover:shadow-gray-500 dark:hover:shadow-gray-100 shadow-md"
    >
      <FaGoogle /> Sign in with google
    </button>
  );
};

export default LoginButton;
