import React from "react";
import { useState, useEffect } from "react";



export const RecomendationCard = ({img})=>{
  return (
    <div className="recomendation-card-img-container">
    <img src={img}alt=""className="recomendation-card-img" style={{userSelect : "none"}} />
  </div>
  )
}
