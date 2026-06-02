import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import { TopAnimeCard } from './Top-anime-section'
import { AnimeLibraryCard } from './Anime-library-section'
import { Header, Footer } from './Header'
const animeIds = [
  // top (10)
  151807, 171018, 137822, 154587, 113415, 127230, 101348, 101922,
  21, 140960,
  // rec (24)
  127253, 108465, 148048, 5114, 13601, 123514,
  99423, 9253, 20464, 263, 185, 21507, 150672, 11061,
  1575, 1, 19603, 97940, 20605, 153288, 110277, 16498,
  10165, 37521,
  // lib (24)
  21459, 21087, 101759, 142329,
  20954, 98291, 101921, 20506, 11433, 2251, 6, 20,
  110350, 131641, 100166, 143271, 110615, 21049,
  9260, 105333, 11757, 9756, 4224, 10087,173172, 147105, 189046 // 👈 estos 4 reemplazan los malos
]

const topIds = animeIds.slice(0,10);
const recIds = animeIds.slice(10,34);
const libIds = animeIds.slice(34,58);
const seaIds = animeIds.slice(58)

export const animeFetch = async (animeId) => {
  const query =  `
    query($topIds: [Int], $recIds: [Int], $libIds: [Int], $seaIds : [Int]){
      top : Page(perPage : 10){
      media(id_in : $topIds, type : ANIME){
        description(asHtml: false)
        title { romaji english native }
        genres
        format
        episodes
        averageScore
        id
        }
      }

    recomandations : Page(perPage : 24){
      media(id_in : $recIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        id
        }
      }

      library : Page(perPage : 24){
      media(id_in : $libIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        id
        }
      }

      season : Page(perPage : 4){
      media(id_in : $seaIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        id
        }
      }
    }
  `
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { topIds,recIds,libIds,seaIds  } })
    })
    const json = await res.json();
    let totalEp = {};
    for (let index = 0; index < topIds.length; index++) {
      const epRes = await fetch(`https://api.ani.zip/mappings?anilist_id=${topIds[index]}`);
      const epJson = await epRes.json();
      totalEp[topIds[index]] = epJson.episodeCount
    }
    
    
      ``
      
      return [totalEp, json.data]
      

  } catch (err) {
    console.warn(`animeFetch falló para ID ${animeId}:`, err)
    return null
  }
}


export function HomePage() {
  const [loading, setLoad] = useState(true);
  const [move, setMove] = useState(0);
  const [openCard, setOpenCard] = useState(false);
  const [data , setData] = useState(null);
  const next = () => setMove(i => (i + 1) % 10)
  const prev = () => setMove(i => (i - 1 + 10) % 10) 
  const touchHandle = useRef(0);
  
  const touchHandleStart = (e)=>{
    touchHandle.current = e.touches[0].clientX;
  }
  const touchHandleEnd = (e)=>{
    const diff = touchHandle.current - e.changedTouches[0].clientX;
    if(diff > 50) next();
    if(diff < -50) prev();
  }
  useEffect(() => {
  animeFetch(animeIds).then(data => {
    setData(data)
    setLoad(false)
  });
}, []);

  if(loading) return <div>cargando</div>
  const topIds = data[1].top.media
  const recIds = data[1].recomandations.media
  const libIds = data[1].library.media
  const seaIds = data[1].season.media
  console.log(topIds);
  console.log(data[0]);
  
  
  return (
    <>
    <Header/>
      <main>
        <section>
          <span className="material-symbols-outlined prev" onClick={prev}>
            arrow_back_ios
          </span>

          <div className="track" style={{ transform: `translateX(-${move * 100}vw)` }} onTouchEnd={touchHandleEnd} onTouchStart={touchHandleStart} >
            {topIds.map((id, index) => (
              // ✅ delay escalonado: 0ms, 300ms, 600ms... para no saturar AniList
              <TopAnimeCard key={id.id} animeId={id.id} title={id.title.english} desc={id.description} score={id.averageScore} genres={id.genres} format={id.format} episodes={data[0][id.id]}/>
            ))}
          </div>

          <span className="material-symbols-outlined next" onClick={next}>
            arrow_forward_ios
          </span>
        </section>
        <div className='title-container'>
          <h2 className='recomendation-title'>Recomended for you</h2>
        </div>
      <section className="recomendation-card-wrapper">
        <div className="recomendations" style={{gridTemplateColumns : `repeat(${recIds.length}, 200px ) `}}>
          {recIds.map((id) => (
            <AnimeLibraryCard key={id.id} img={id.coverImage.extraLarge} title={id.title.english} episodes={id.episodes}  />
          ))}
        </div>
        </section>

        <section className='season-section-wrapper'>
            <div className='season-section'>
            <h2 className='season-section-title' >NEW THIS SEASON</h2>
            
          {seaIds.map(id =>{
            return(<div key={id.id} className="season-img-wrapper">
              <img src={id.coverImage.extraLarge} alt="" />
            </div>)
          })}
          <div className="season-img-wrapper">
              <img src={'/images/195600.png'} alt="" />
            </div>
          </div>
          </section>
        <section className="library-animes-section">
          <h2 className='library-anime-title'>Anime library</h2>
          {libIds.map((id) => (
            <AnimeLibraryCard key={id.id} img={id.coverImage.extraLarge} title={id.title.english} episodes={id.episodes}/>
          ))}
        </section>
          <div className="library-animes-link">
            <h2>Ver mas</h2>
          </div>
      </main>
      <Footer/>
    </>
  )
}

export default HomePage