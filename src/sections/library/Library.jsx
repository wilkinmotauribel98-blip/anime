import {  AnimeLibraryCard  } from "../../components/AnimeLibraryCard"
import './Library.css'
export const AnimeLibrarySection = ({libIds})=>{
  return(
    <>
      <section className="library-animes-section">
                <h2 className='library-anime-title'>Anime library</h2>
                {libIds.map((id) => (
                  <AnimeLibraryCard key={id.id} img={id.coverImage.extraLarge} title={id.title.romaji} episodes={id.episodes}/>
                ))}
      </section>
      <div className="library-animes-link">
        <h2>Ver mas</h2>
      </div>
    </>
  )
}