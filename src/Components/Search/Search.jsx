import { createContext, useState } from "react";
import "./Search.css";
export default function Search({setSearch}) {
    
    const handleChange = (e)=>{
        setSearch(e.target.value);
    }
   
  return (
    <>
      <div className="container">
        <div className="search-container">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" onChange={handleChange}/>
        </div>
      </div>
    </>
  );
}
