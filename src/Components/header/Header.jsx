import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, Outlet } from "react-router-dom";
import DropDown from "../DropDown/DropDown";

export default function Header() {
  const [headerClass, setHeaderClass] = useState("header");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > 100 && window.innerWidth >= 768) {
        setHeaderClass(() => "header adjust");
      } else {
        setHeaderClass(() => "header");
      }
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let content;

  const headerStyle = {
    borderRadius:"0",
    background:"black",
    height:"5rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
 
  const bodyStyle = {
    borderRadius:"0",
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    background:"black"
  }
  if (isMobile) {
    content = (
      <>
        <DropDown header={"☰"} headerOptions={headerStyle}  bodyOptions={bodyStyle}>
          <Link to="/cards" className="link">
            Cards
          </Link>
          <Link to="/" className="link">
            Home
          </Link>
        </DropDown>
      </>
    );
  } else {
    content = (
       <div className="header-container">{content}
        <h1 className="header-text">Pokedex</h1>
        <div className="links">
          <Link to="/cards" className="link">
            Cards
          </Link>
          <Link to="/" className="link">
            Home
          </Link>
        </div>
       </div>
    );
  }
  return (
    <>
      <div className={headerClass}>
       {content}
      </div>
      <Outlet />
    </>
  );
}
