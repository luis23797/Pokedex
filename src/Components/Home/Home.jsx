import { useRef } from "react";
import "./Home.css";
import { useEffect } from "react";
export default function Home() {
  const homeContainer = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      homeContainer.current.classList.remove("hidden");
      homeContainer.current.classList.add("show");
    },500)
    
  },[])
  return (
    <div className="home-container hidden" ref={homeContainer}>
      <p className="text">
        This is just a sandbox project, it was created for the propuse of
        practice react skills and apply some designs a develop patterns
      </p>
      <div className="img-container">
      <img className="img" src="https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/0aa78a0061bda9d88cbb0bbf739cd9cc56522fe9.png" />
      </div>
    </div>
  );
}
