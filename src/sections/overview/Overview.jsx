import { useState, useEffect } from "react";
import { InfoSection } from "../info/Info";
import {HeroBackdrop} from '../../components/HeroBackdrop'
import './Overview.css'

export const Overview = ({ info, size})=>{
  const [img, setImg] = useState(info.img)
    useEffect(()=>{
      size < 600 ? () => setImg(info.mobileImg) : setImg(info.img)  
    }, [])
    
  return(
    <section className="overview-section">
      <div className="overview-gradient"></div>
      <div className="overview">
        <div className="overview-backdrop" style={{backgroundImage: `url(${info.img})`}}></div>
        <div className="overview-img-wrapper">
          <img src={img} alt="" />
        </div>
        <div className="overview-info">
          <div className="overview-meta">
            <div>{info.format}</div>
            <div className="dot"></div>
            <div>{info.year}</div>
            <div className="dot"></div>
            <div>{info.episodes}</div>
          </div>
          <h2 className="overview-title">{info.title}</h2>
          <div className="overview-rating-wrapper">
            <div className="overview-rating">★ <h2>{info.score}</h2></div>
            <div className="overview-rank">Rank {info.score}</div>
            <div className="overview-status">{info.status}</div>
          </div>
          <div className="overview-buttons">
            <div>
              <span className="material-symbols-outlined">play_arrow</span>
              Start Now
            </div>
            <div>
              <span className="material-symbols-outlined">add</span>
              Add  to list
            </div>
          </div>
          <div className="overview-desc">
            {info.description} 
          </div>
          <InfoSection status={info.status} autor={info.autor} genres={info.genres} score={info.score} studio={info.studio}/>
        </div>
        
      </div>
    <InfoSection status={info.status} autor={info.autor} genres={info.genres} score={info.score} studio={info.studio}/>
    </section>
  )
}