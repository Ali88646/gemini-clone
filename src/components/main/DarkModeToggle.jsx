import { useEffect, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="px-4 py-2  rounded cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <MdOutlineLightMode size={32} /> : <MdLightMode size={32} />}
    </button>
  );
}
