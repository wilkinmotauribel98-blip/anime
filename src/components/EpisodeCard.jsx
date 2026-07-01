import React from "react";
import { useNavigate } from "react-router-dom";
export const EpisodeCard = ({img, title, number, duration, overview, version, dot, direction})=>{
  const navigate = useNavigate();
  return (
    <article className={`episode-article${version}`} onClick={()=> navigate(`${direction}`)}>
      <div className={`episode-img-wrapper${version}`}>
        <img src={img} alt="" loading="lazy"/>
        <span className="material-symbols-outlined">play_circle</span>
      </div>

      <div className={`episode-info${version}`}>
          <h2>{number} {dot}{duration}</h2>
          <h3> {title}</h3>
          <p className="overview">
        {overview ? overview.slice(0, 120) + '...' : ""}
      </p>
      </div>
      
    </article>
  )
}