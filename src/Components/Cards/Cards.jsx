import React, { useEffect, useMemo } from "react";
import "./Cards.css";
import { useFetch } from "../../hooks/useFetch";
import Card from "../Card/Card";

export default function Cards(){
    const {data,isPending,error} = useFetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");
    
    return(
        <>
        {!isPending && <div className="container cards-container">{data.results.map(el=>(<Card key={el.url} url={el.url}/>))}</div>}
        </>
    )
}