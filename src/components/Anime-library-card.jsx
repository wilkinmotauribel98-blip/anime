import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

export const AnimeLibraryCard = ({img, title, episodes})=>{
  const navigate = useNavigate()
  return (
    <div className="library-card-wrapper" onClick={()=> navigate(`/anime/${title.replace(/\s/g,"-")}`)}>
      <div className="library-card-img-wrapper">
        <img src={img}alt=""className="library-card-img" style={{userSelect : "none"}} loading="lazy"/>
      </div>
      <div className="library-card-info">
        <div className="library-card-title">{title}</div>
      <div className="library-card-ep" >{episodes} Episodios</div>
      </div>
    
    </div>
  )
}
