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
  const loaderRef = useRef();
  const [search, setSearch] = useState();
  const { data, isPending, error } = useFetch(
    `${baseUrl}?limit=${limit}&offset=${offset}`
  );

  const {
    data:searchData,
    error:searchError
  } = useFetch(search? `${baseUrl}/${search.toLowerCase()}`:null);

  const cards = useRef();
  const [visible, setVisible] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    if(search) return;

     const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev)=>prev+limit)
        }
      },
      { threshold: 1.0}
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    }
  }, [isPending,search]);

  useEffect(() => {
    if (data) {
      setCurrentData((prev) => [...prev, ...data.results])
    }
  }, [data])
  
  const pokemons = useMemo(() => {
    console.log(searchData);
    
    if(searchData?.name){
      return [{ name: searchData.name, url: `${baseUrl}/${searchData.id}` }];
    }
    if (currentData.length <= 0) return [];
    if (!search) return currentData;
    return currentData.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [currentData, search]);

  if (error?.err) return <p>Error:</p>;
  if (isPending) return <p>Cargando...</p>;
  return (
    <>
      <Search setSearch={setSearch} />
      {!isPending && (
        <div className={`cards-container ${visible ? "show" : ""}`} ref={cards}>
          {pokemons.map((el) => (
            <Card key={el.url} url={el.url} />
          ))}
        {!search && <div ref={loaderRef} style={{ height: "20px" }}></div>}
        {pokemons.length==0 && <div >No se encontraron Pokemons {search}</div>}
        </div>
      )}
    </>
  );
}
