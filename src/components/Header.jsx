import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiSun, HiMoon, HiUser } from "react-icons/hi2";
import jobVerseLogo from "../assets/jobverse-logo.png";
import jobVerseLogoWhite from "../assets/jobverse-logo-white.png";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };

  const isDarkModePreferred =
    JSON.parse(localStorage.getItem("darkMode")) ??
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(isDarkModePreferred);

  const toggleMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="max-w-screen-xl mx-auto py-4 px-4">
      <div className="flex items-center justify-between gap-4">
        <Link to="/">
          <img
            src={darkMode ? jobVerseLogoWhite : jobVerseLogo}
            alt="Job Verse"
            className="w-40 md:w-48"
          />
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="group relative">
              <div className="flex gap-2">
                <div className="">
                  <label>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Profile"
                        className="w-[32px] h-[32px] rounded-full group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <button className="bg-white/20 p-2.5 rounded-full text-white hover:scale-95 duration-300">
                        <HiUser />
                      </button>
                    )}
                  </label>
                  <ul
                    tabIndex={0}
                    className="absolute right-0 mt-2 dropdown-content z-[1] menu menu-sm p-2 shadow bg-base-100 rounded-box w-36 md:w-40 lg:w-48 dark:bg-[#292929] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <li className="p-2.5">{user.displayName}</li>
                    <li>
                      <Link
                        onClick={handleSignOut}
                        className="hover:bg-[#fff] hover:text-[#FFC0CB] dark:hover:bg-[#292929]  dark:hover:text-[#FFC0CB]"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
            </div>
          )}
          <button
            onClick={toggleMode}
            className="bg-slate-50 hover:bg-slate-100 duration-300 p-2.5 rounded-full dark:bg-slate-700 dark:hover:bg-slate-600 "
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
