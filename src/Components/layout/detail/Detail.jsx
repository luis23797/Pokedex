import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import "./Detail.css";
import DropDown from "../../DropDown/DropDown";
export function Detail() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${id}/`
  );
  console.log(data);
  let types = !isPending
    ? data.types.reduce(
        (prev, curr, i) =>
          i != data.types.length - 1
            ? prev + curr.type.name + ", "
            : prev + curr.type.name,
        ""
      )
    : "";
  console.log(types);

  return (
    <>
      {!isPending && (
        <div className="container">
          <div className="img-container">
            <img src={`${data.sprites.front_default}`} alt="" />
          </div>
          <div className="info-container">
            <div className="col-1">
              <div className="info">
                <h1 className="title">Name</h1>
                <h2 className="subtitle">{data.name}</h2>
              </div>
              <div className="info">
                <h1 className="title">Types</h1>
                <h2 className="subtitle">{types}</h2>
              </div>
            </div>
            <div className="col-2">
              <div className="info">
                <h1 className="title borde-col-3">
                  Pokedex Number: <span>{data.id}</span>
                </h1>
                <h1 className="title">
                  Weight: <span>{data.weight}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="movements">
            <div className="info">
              <h1 className="title">Movements</h1>
            </div>
            <div className="movements-grid">
            {data.moves.map(move=>(
              <DropDown header={move.move.name} key={move.move.name}>
                <h2 className="level">Learned at : {move.version_group_details[0].level_learned_at}</h2>
                <h2 className="method">Learn method : {move.version_group_details[0].move_learn_method.name}</h2>
              </DropDown>
            ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
