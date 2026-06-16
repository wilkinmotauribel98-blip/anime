import React from "react";
export const EpisodeCard = ({img, title, number, duration, overview})=>{

  return (
    <article className="episode-article">
      <div className="episode-img-wrapper">
        <img src={img} alt="" loading="lazy"/>
        <span className="material-symbols-outlined">play_circle</span>
      </div>

      <div className="episode-info">
          <h2>Ep{number < 10 ? "0" + number : number} <div className="dot"></div> Runtime {duration}m</h2>
          <h3> {title}</h3>
          <p className="overview">
        {overview ? overview.slice(0, 120) + '...' : ""}
      </p>
      </div>
      
    </article>
  )
}