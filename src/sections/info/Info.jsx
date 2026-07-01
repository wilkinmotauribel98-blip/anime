import './Info.css'

export const InfoSection = ({autor, studio, status, score, genres})=>{
  return(
      <section className='info-section'>
          <div className="info">
            <div >
              <h2>STUDIO</h2>
              {studio}
            </div>
            <div>
              <h2>AUTHOR</h2>
              {autor}
            </div>
            <div>
              <h2>SCORE</h2>
              {score}/10
            </div>
            <div>
              <h2>GENRES</h2>
              <div className='info-genres'> 
                {genres.map(e =>  <span className='info-genre' key={e}>{e}</span>)}
              </div>
            </div>
          </div>
      </section>
  )

}