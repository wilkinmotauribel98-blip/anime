import React, { useState, useEffect } from "react";

export const AnimeLibraryCard = ({img, title, episodes})=>{
  return (
    <div className="library-card-wrapper">
    <img src={img}alt=""className="recomendation-card-img" style={{userSelect : "none"}} loading="lazy"/>
    <div className="library-card-title">{title}</div>
    <div className="library-card-ep" >{episodes} Episodios</div>
    </div>
  )
}
