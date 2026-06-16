import React from "react";

export const RelatedCard = ({title, continuation})=>{
  return(
    <article className="season-related-article">
      <h2 className="season-related-title">{title}</h2>
      <h3 className="season-related-continuation">{continuation}</h3>
    </article>
    
  )
}