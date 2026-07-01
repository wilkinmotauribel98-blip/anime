import { useNavigate } from "react-router-dom"

export const RecomendationCard = ({title, img, genres})=>{
  const navigate = useNavigate()
  return(
    <div className="recomendation-card-wrapper" onClick={()=> navigate(`/anime/${title.replace(/\s/g,"-")}`)}>
    <img src={img}alt=""className="recomendation-card-img" style={{userSelect : "none"}} loading="lazy"/>
    <div className="recomendation-card-title">{title}</div>
    <div className="recomendation-card-greadient"></div>
    <div className="recomendation-card-genres">{genres[0]} <div className="dot recomendation-dot"></div> {genres[1]}</div>
    </div>
  )
}