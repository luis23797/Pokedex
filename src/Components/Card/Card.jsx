import "./Card.css"
import { useFetch } from "../../hooks/useFetch"
export default function Card({url}){
    const {data,isPending,error} = useFetch(url);
    return(
        <>
        {!isPending && 
        <div className="card">
            <h1 className="card-title neon-text">{data.name}</h1>
            <img className="card-img" src={data.sprites.front_default}></img>
            {<div className="card-type-container"><span className="card-type-title">Types:</span>{data.types.map(el=>(<span key={el.slot} className="card-type">{el.type.name}</span>))}</div>}
            <span className="card-number">{data.id}</span>
        </div>
        }
        </>
    )
}