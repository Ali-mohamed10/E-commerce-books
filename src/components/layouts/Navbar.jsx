import logo from "../../assets/imgs/icons8-book-96.webp";
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "next-themes";
import { NytContext } from "../../contexts/NytContext";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export const links = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];
export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useContext(NytContext);
  const location = useLocation();
  const { isSignedIn } = useUser();

  const favoriteCount = data
    ? data.reduce(
        (acc, list) => acc + list.books.filter((b) => b.isFavorite).length,
        0
      )
    : 0;

  const toCartCount = data
    ? data.reduce(
        (acc, list) => acc + list.books.filter((b) => b.isToCart).length,
        0
      )
    : 0;
  return (
    <header>
      <nav className="bg-backgrounds relative px-4 md:px-10 py-2 text-text flex flex-wrap gap-y-3.5 items-center justify-between shadow-xl dark:shadow-button-border rounded-md">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            loading="lazy"
            className="inline-block w-11 md:w-16 mr-4"
          />
          <h1 className="text-xl md:text-2xl font-bold mr-4">NYT Books</h1>
        </div>
        <ul
          className={`-translate-y-full ${
            isOpen ? "translate-y-0 z-100" : ""
          } lg:-translate-y-1.5 -z-1 lg:z-1 lg:flex lg:items-center gap-6 lg:relative lg:w-auto absolute right-0 top-full bg-backgrounds border lg:border-none lg:bg-transparent w-full transition duration-300 p-4 pb-10 lg:p-0 rounded-md shadow-xl dark:shadow-button-border lg:shadow-none`}
        >
          <li
            className={`text-white ${
              isSignedIn
                ? "bg-white pt-2"
                : "bg-gradient-to-r from-main via-main to-backgrounds hover:from-main hover:to-main"
            } hover:scale-105 border text-2xl px-2 py-0.5 w-fit mx-auto mb-11 rounded-sm font-bold lg:block transition duration-300 cursor-pointer text-center translate-y-7 h-fit`}
          >
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
          {links.map((link, index) => {
            return (
              <Link to={link.to} key={index}>
                <li
                  className={`hover:text-hover lg:block transition duration-300 cursor-pointer text-center mt-4 lg:pb-0 ${
                    location.pathname === link.to ? "text-main" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="icons flex flex-wrap">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer hover:text-hover transition duration-300 mr-4"
          >
            {theme === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </button>
          <Link to="/favorite-books">
            <div
              className={`relative cursor-pointer hover:text-hover transition duration-300 mr-4 ${
                location.pathname === "/favorite-books" ? "text-main" : ""
              }`}
            >
              <FavoriteBorderIcon />
              <span className="w-3.5 h-3.5 rounded-full bg-main px-1.5 py-0.5 text-center text-[10px] text-white">
                {favoriteCount}
              </span>
            </div>
          </Link>
          <Link to="/shop-cart">
            <div
              className={`mr-4 cursor-pointer hover:text-hover transition duration-300 ${
                location.pathname === "/shop-cart" ? "text-main" : ""
              }`}
            >
              <ShoppingCartOutlinedIcon />
              <span className="w-3.5 h-3.5 rounded-full bg-main px-1.5 py-0.5 text-center text-[10px] text-white">
                {toCartCount}
              </span>
            </div>
          </Link>
        </div>
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`bg-text block w-7 h-1 mb-1 transition duration-300 transform ${
              isOpen ? "-rotate-45 translate-1" : ""
            }`}
          ></span>
          <span
            className={`bg-text block w-7 h-1 mb-1 transition duration-300 ${
              isOpen ? "hidden" : ""
            }`}
          ></span>
          <span
            className={`bg-text block w-7 h-1 mb-1 transition duration-300 ${
              isOpen ? "rotate-45 -translate-y-1 translate-1" : ""
            }`}
          ></span>
        </div>
      </nav>
    </header>
  );
}
