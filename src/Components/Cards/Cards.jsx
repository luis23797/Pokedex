import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Cards.css";
import { useFetch } from "../../hooks/useFetch";
import Card from "../Card/Card";
import Search from "../Search/Search";

export default function Cards() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const limit = 30;
  const [offset, setOffset] = useState(0);
  const loaderRef = useRef(null);
  const [search, setSearch] = useState();
  const { data, isPending, error } = useFetch(
    `${baseUrl}?limit=${limit}&offset=${offset}`
  );
  
  const {
    data:searchData,
    error:searchError,
    isPending:searchPending
  } = useFetch(search? `${baseUrl}/${search.toLowerCase()}`:null);

  const cards = useRef();
  const [visible, setVisible] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const offsetRef = useRef(offset);

  useEffect(() => {
  offsetRef.current = offset; // sincroniza cada vez que offset cambie
}, [offset]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      
      
      if (entries[0].isIntersecting && offsetRef.current + limit <1300) {
        console.log(offsetRef.current);
        
        setOffset(prev => prev + limit);
      }
      if (offsetRef.current + limit >= 1300) {
      observer.disconnect(); // 👈 ya no sigue observando
    }
    },
    { threshold: 1.0 }
  );

   observer.observe(loaderRef.current);

  return () => {
      if (loaderRef.current){
    observer.unobserve(loaderRef.current);
  }
  }
}, []);

  useEffect(() => {
    if (data) {
      setCurrentData((prev) => [...prev, ...data.results])
      console.log(data);
      
    }
  }, [data])
  
  const pokemons = useMemo(() => {
    
    if(searchData?.name){
      return [{ name: searchData.name, url: `${baseUrl}/${searchData.id}` }];
    }
    if (currentData.length <= 0) return [];
    if (!search) return currentData;
    return currentData.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentData, search, searchData, searchError]);
  
 useEffect(() => {
  console.log("isPending en componente:", isPending);
}, [searchPending]); // ✅ se loguea cada vez que cambia
  
  
 
  return (
    <>
      <Search setSearch={setSearch} />
       <div className={`cards-container`} ref={cards}>
        {pokemons.length>0 && pokemons.map((el) => (
            <Card key={el.url} url={el.url} />
          ))}
         
      {isPending && (
        <>
          <p style={{position:"fixed", bottom:10}}>Cargando...</p>
        {(error?.err) && <p>Error:</p>}
         
     
        </>
      )
      }
        {(search && searchPending) && <p>Buscando Pokémon...</p>}
        {(pokemons.length==0 && !searchPending) && <div >No se encontraron Pokemons {search}</div>}
      </div>
      <div  ref={loaderRef} style={{ height: "20px",opacity:"0"}}>hello</div>
    </>
  );
}