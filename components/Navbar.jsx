import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import toast from "react-hot-toast";
import { setTheme } from "../redux/actions/themes";
import { useDispatch, useSelector } from "react-redux";
import { themeToggle } from "../assets/lottie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const toggleRef = useRef(null);
  const NavTabs = () => {
    toast("Will be available soon!", {
      icon: "🤗",
      style: {
        borderRadius: "10px",
        background: theme === "dark" ? "#1a1a1a" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      },
    });
  };
  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
  };
  useEffect(() => {
    if (theme === "dark") {
      rawSetTheme("dark");
      toggleRef.current.playSegments([40, 41], true);
    }
  }, []);
  const onToggle = () => {
    if (theme === "dark") {
      rawSetTheme("light");
      dispatch(setTheme("light"));
      toggleRef.current.playSegments([41, 80], true);
    } else {
      rawSetTheme("dark");
      dispatch(setTheme("dark"));
      toggleRef.current.playSegments([1, 40], true);
    }
  };
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-3 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <Image
              src="/logo.png"
              width={90}
              height={30}
              objectFit="contain"
              className="dark:invert"
            />
          </a>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className={`${!isOpen && "hidden"} md:flex w-full md:w-auto`}>
          <ul className="flex flex-col md:items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link href="/">
                <a
                  className="block py-2 pr-4 pl-3 text-white bg-fuchsia-700 rounded md:bg-transparent md:text-fuchsia-700 md:dark:text-fuchsia-300 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  onClick={() => NavTabs()}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  onClick={() => NavTabs()}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Project
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a
                  onClick={() => NavTabs()}
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </a>
              </Link>
            </li>
            <li>
              <Lottie
                lottieRef={toggleRef}
                animationData={themeToggle}
                loop={false}
                autoplay={false}
                onClick={() => onToggle()}
                className="h-12 cursor-pointer"
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}