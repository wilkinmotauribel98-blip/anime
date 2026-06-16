import { RecomendationCard } from "../../components/Recomendation-card";
import './Recomendations.css'

export const RecomendationSection = ({recIds})=>{
  return(
    <>
    <section className="recomendation-section">
      <h2>Recomended for you</h2>
      <div className="recomendation-slider">
        <div className="recomendation-track">
        {recIds.map((id) => (
          <RecomendationCard key={id.title.romaji} img={id.bannerImage} title={id.title.english} genres={id.genres.slice(0, 2)}/>
        ))}
        </div>
      </div>
    </section>
    </>
  )
}