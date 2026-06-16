import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../layaut/App.css'


export function TopAnimeCard({ animeId, title, desc, episodes, format, genres, score }) {
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()
  const cleanDesc = desc.replace(/<[^>]+>/g, "").slice(0,160) + "...";
  const cleanTitle = title.replace(/:\s[\w\s’]+/, 
    ""
  )
  
  return (
    <div className={`hero ${load ? "" : "skeleton"}`} id="hero" onClick={()=> navigate(`/anime/${title.replace(/\s/g,"-")}`)}>
      <img
  src={`${import.meta.env.BASE_URL}images/${animeId}.png`}
  alt={title}
  id="hero-img"
  className={`hero-img ${load ? "" : "skeleton"}`}
  onLoad={() => setLoad(true)}
  loading="lazy"
/>
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
            <span>▶</span> WATCH NOW
          </button>
        </div>
      </div>
    </div>
  )
}