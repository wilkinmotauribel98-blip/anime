import React from "react";
export const EpisodeCard = ({img, title, number, duration})=>{

  return (
    <article className="episode-article">
      <div className="episode-img-wrapper">
        <img src={img} alt="" loading="lazy"/>
      </div>

      <div className="episode-info">
          <h3>{number}. {title}</h3>
          {duration}m
      </div>
    </article>
  )
}