import { useNavigate } from "react-router-dom"
import './Seasonal.css'
export const SeasonalSection = ({seaIds})=>{
  const navigate = useNavigate()
  return(
    <>
    <section className='seasonal-section'>
      <h2>NEW THIS SEASON</h2>
            <div className="seasonal-cards-wrapper">
              <div className="seasonal-main-card">
                <img src={seaIds[0].coverImage.extraLarge} alt="" className="seasonal-main-card-img" />
                <div className="seaonal-main-card-contrast"></div>
                <div className="seaonal-main-card-blur"></div>
                <div className="seasonal-main-card-content">
                  <h3>{seaIds[0].episodes ? 'Finished' : 'Ongoing'}</h3>
                  <h2 className="seasonal-main-title">{seaIds[0].title.english}</h2>
                  <p className="seasonal-main-description">
                    {seaIds[0].description.slice(0,160) + '...'}
                  </p>
                  <button className='btn-primary' onClick={()=>navigate(`/anime/${seaIds[0].title.english.replace(/\s/g,"-")}`)}>WATCH EPISODE 1</button>
                </div>
              </div>

            <div className="seasonal-secondary-wrapper">
              <div className="seasonal-secondary-card" onClick={()=> navigate(`/anime/${seaIds[1].title.english.replace(/\s/g,"-")}`)}>
                <img src={seaIds[1].coverImage.extraLarge} alt="" className="seasonal-secondary-card-img" />
                <div className="season-secondary-card-gradient"></div>
                <div className="seasonal-secondary-card-content">
                  <h3>{seaIds[1].episodes ? 'Finished' : 'Ongoing'}</h3>
                  <h2 className="seasonal-secondary-title">{seaIds[1].title.english}</h2>
                  <div className="seasonal-secondary-card-genres">
                    {seaIds[1].genres[0]} <div className="dot recomendation-dot"></div> {seaIds[1].genres[1]}</div>
                </div>
              </div>

            <div className="seasonal-secondary-card" onClick={()=> navigate(`/anime/${seaIds[2].title.english.replace(/\s/g,"-")}`)}>
                <img src={seaIds[2].coverImage.extraLarge} alt="" className="seasonal-secondary-card-img" />
                <div className="season-secondary-card-gradient"></div>
                <div className="seasonal-secondary-card-content">
                  <h3>{seaIds[2].episodes ? 'Finished' : 'Ongoing'}</h3>
                  <h2 className="seasonal-secondary-title">{seaIds[2].title.english}</h2>
                  <div className="seasonal-secondary-card-genres">
                    {seaIds[2].genres[0]} <div className="dot recomendation-dot"></div> {seaIds[2].genres[1]}</div>
                </div>
              </div>
            </div>
            </div>
          </section>
    </>
  )
}