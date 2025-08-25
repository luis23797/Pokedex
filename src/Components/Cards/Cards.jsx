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
  const { data, isPending, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
  );
  const cards = useRef();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const pokemons = useMemo(() => {
    if (!data) return [];
    if (!search) return data.results;
    return data.results.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

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
        </div>
      )}
    </>
  );
}
