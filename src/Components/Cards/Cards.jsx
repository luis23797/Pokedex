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
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../Utilities/Spinner/Spinner";

export default function Cards() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const limit = 30;
  const [offset, setOffset] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchOffset, setSearchOffset] = useState(0);
  const loaderRef = useRef(null);
  const [search, setSearch] = useState();
  const { data, isPending, error } = useFetch(
    `${baseUrl}?limit=${limit}&offset=${offset}`
  );
  const debounceSearch = useDebounce(search,900);
  // const searchUrl = debounceSearch ? `${baseUrl}?limit=100&offset=${searchOffset}` : null;
  const searchUrl = `${baseUrl}?limit=100&offset=${searchOffset}`;
  const {
    data: searchData,
    error: searchError,
    isPending: searchPending,
  } = useFetch(searchUrl);

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
        if(search){
          return;
        }
        if (entries[0].isIntersecting && offsetRef.current + limit < 1300) {
          setOffset((prev) => prev + limit);
        }
        if (offsetRef.current + limit >= 1300) {
          observer.disconnect(); //  ya no sigue observando
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (data) {
      setCurrentData((prev) => [...prev, ...data.results]);
      // console.log(data);
    }
  }, [data]);
  const [isSearching, setIsSearching] = useState(false);

  // en Cards.jsx
  useEffect(() => {
    if (!search) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setSearchOffset(0);
    setSearchResult([]);
  }, [search]);

  //-------------------------------------------- Pruebas----------------------------------------------------------------------------------
  useEffect(()=>{
    console.log(debounceSearch);
    
  },[debounceSearch]) 

  useEffect(() => {  
    if (!search) return;
    if (!searchData || searchPending) return; // esperamos a que cargue
    if (searchOffset >= 1300) return;

    const filteredData = searchData.results.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredData.length > 0) {
      // ✅ encontramos resultados o llegamos al límite
      setSearchResult(filteredData);
      setIsSearching(false);
    } else {
      // 🚀 seguimos buscando en la siguiente página
      setSearchOffset((prev) => prev + 100);
    }
  }, [searchData, debounceSearch]);

  useEffect(() => {
    if (!searchPending) {
      const timer = setTimeout(() => setIsSearching(false), 300);
      return () => clearTimeout(timer);
    }
  }, [searchPending]);
  const pokemons = useMemo(() => {
    if (currentData.length <= 0) return [];
    if (!search) return currentData;
    if (searchResult.length >= 0) return searchResult;
    return [];
  }, [currentData, search, searchData, searchError, searchResult]);

  // useEffect(() => {
  //   // console.log("isPending en componente:", searchPending);
  // }, [searchPending]); // ✅ se loguea cada vez que cambia

  return (
    <>
      <Search setSearch={setSearch} />
      <div className={`cards-container`} ref={cards}>
        {search && isSearching && <Spinner message={"Buscando Pokemon"}/>}

        {search && !isSearching && pokemons.length === 0 && (
          <div style={{width:"100%",textAlign:"center"}}>No se encontraron Pokemons {search}</div>
        )}
        {pokemons.length > 0 &&
          !isSearching &&
          pokemons.map((el) => <Card key={el.url} url={el.url} />)}
        {isPending && (
          <>
            {<Spinner message={"Cargando"}  containerOptions={{position:"fixed",bottom:10}}/>}
            {error?.err && <p>Error:</p>}
          </>
        )}
      </div>
      <div ref={loaderRef} style={{ height: "20px", opacity: "0" }}>
        hello
      </div>
    </>
  );
}
