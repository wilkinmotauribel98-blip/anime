import './Info.css'

export const SeasonInfoSection = ({autor, studio, status, score})=>{
  return(
      <section className='info-section'>
          <div className="season-hero-info">
            <div>
              <h3>AUTOR</h3>
              <h4>{autor}</h4>
            </div>
            <div>
              <h3>STUDIO</h3>
              <h4>{studio}</h4>
            </div>
            <div>
              <h3>STATUS</h3>
              <h4>{status}</h4>
            </div>
            <div>
              <h3>RATING</h3>
              <h4>{score}</h4>
            </div>
          </div>
      </section>
  )

}