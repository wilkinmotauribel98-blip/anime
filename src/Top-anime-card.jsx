import React, { useEffect, useState } from 'react'
import './App.css'

export const animeFetch = async (animeId)=>{
    const query = `
  query($id : Int){
    Media(id : $id){
      description(asHtml : false)
      title { romaji native }
      genres
      format
      episodes
      bannerImage
      coverImage {  extraLarge  }
      averageScore
    }
  }
  `
  try{
    const res = await fetch('https://graphql.anilist.co',{
      method : "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({query, variables : {id : animeId}})
    })

    const json = await res.json();
    const anime = json.data.Media;
    const cleanDesc = anime.description ? anime.description.replace(/<[^>]+>/g,'').slice(0,160) + "..." : ''
    const score = anime.averageScore + 10;
    const genres = anime.genres.slice(0,4);
    const genreHtml = genres.map(g => <span className='genre-tag'>{g}</span>)
    const info = {
      img : anime.bannerImage || anime.coverImage.extraLarge,
      title : anime.title.romaji,
      desc : cleanDesc,
      score : score,
      format : anime.format,
      genres : genreHtml,
      episodes :  anime.episodes || "En emision"
    }
    return info
    
  }catch(err){
    console.log(err)
  }

}

export function TopAnimeCard({animeId}) {
  const [info, setInfo]  = useState(null);
  const [load, setLoad] = useState(false)
  useEffect(()=>{
    animeFetch(animeId).then(data => setInfo(data) )
  },[animeId])
  if (!info) return null
    return(
      <div className={`hero ${load ? "" : "skeleton"}`}id="hero">
        <img src={info.img} alt="" id="hero-img" className={`hero-img ${load ? "" : "skeleton"}`} onLoad={()=> setLoad(true)}/>
        <div className="hero-gradient"></div>
        <div className="hero-gradient-bottom"></div>

        <div className='hero-content' id="hero-content">
        <div className={`hero-meta ${load ? "" : "skeleton"}`} id='hero-meta'> {info.format} <div className='dot'></div><div className="episodes">{info.episodes}</div><div className='dot'></div><div className='score'>★{info.score}</div></div>
        <div className={`hero-title ${load ? "" : "skeleton"}`} id='hero-title'>{info.title}</div>
        <div className={`hero-desc ${load ? "" : "skeleton"}`} id='hero-desc'>{info.desc}</div>
        <div className="content">
          <div className="genres">{info.genres}</div>
          <button className='btn-primary'> <span>▶</span> Ver ahora</button>
        </div>
        </div>
      </div>
      
  )
}


