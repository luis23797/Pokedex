import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, Outlet } from "react-router-dom";

export default function Header(){
    const [headerClass,setHeaderClass] = useState("header");                                                
    useEffect(()=>{
        document.addEventListener("scroll",(e)=>{
            if(window.scrollY>100){
                setHeaderClass(()=>"header adjust")
            }else{
                setHeaderClass(()=>"header")
            }
       })
        return ()=>{
        document.removeEventListener("scroll",document);
        }
    },[])
    return(
        <>
        <div className={headerClass} >
            <div className="header-container">
            <h1 className="header-text">Pokedex</h1>
            <div className="links">
                <Link to={"/cards"} className="link">Cards</Link>
                <Link to={"/"} className="link">Home</Link>
            </div>
            </div>
        </div>
        <Outlet/>
        </>
    )
}