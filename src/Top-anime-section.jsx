import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'


export function TopAnimeCard({ animeId, title, desc, episodes, format, genres, score }) {
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const cleanDesc = desc.replace(/<[^>]+>/g, "").slice(0,160) + "...";
  const cleanTitle = title.replace(/:\s[\w\s’]+/, 
    ""
  )
  
  return (
    <div className={`hero ${load ? "" : "skeleton"}`} id="hero">
      <img
        src={`/anime/images/${animeId}.png`}
        alt=""
        id="hero-img"
        className={`hero-img ${load ? "" : "skeleton"}`}
        onLoad={() => setLoad(true)}
      />
      <div className="hero-gradient"></div>
      <div className="hero-gradient-bottom"></div>
      <div className='hero-content' id="hero-content">
        <div className="hero-meta" id='hero-meta'>
          {format}
          <div className='dot'></div>
          <div className="episodes">{episodes}</div>
          <div className='dot'></div>
          <div className='score'>★{score}</div>
        </div>
        <div className="hero-title" id='hero-title'>{cleanTitle}</div>
        <div className="hero-desc" id='hero-desc'>{cleanDesc}</div>
        <div className="content">
          <div className="genres">{genres.slice(0,4).map(genre => <span key={genre} className ='genre-tag'>{genre}</span>)}</div>
          <button className='btn-primary' onClick={()=> navigate(`/anime/${title.replace(/\s/g,"-")}`)}>
            <span>▶</span> Ver ahora
          </button>
        </div>
      </div>
    </div>
  )
}