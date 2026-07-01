import { TopAnimeCard } from "../../components/TopAnimeCard";
import { useState, useRef } from "react";
import './Hero.css'


export const HeroSection = ({topIds, data})=>{
  const [move, setMove] = useState(0); 
  const next = () => setMove(i => (i + 1) % 10)
  const prev = () => setMove(i => (i - 1 + 10) % 10)
  const total = topIds.length;
  const visibleDots = 5;

  const touchHandle = useRef(0);
  const touchHandleStart = (e)=>{
      touchHandle.current = e.touches[0].clientX;
    }
  const touchHandleEnd = (e)=>{
      const diff = touchHandle.current - e.changedTouches[0].clientX;
      if(diff > 50) next();
      if(diff < -50) prev();
    }
    const windowStart = Math.min(
      Math.max(move - 2, 0),  total - visibleDots
    )
    const dotStep = 100 / total;
    const trackOffset = windowStart * 18;
    const isEdgeDot = (index)=>{
      const isLeftEdgeDot = index === windowStart && windowStart > 0;
      const isRigthEdgeDot = index === windowStart + visibleDots - 1 && windowStart + visibleDots - 1 < total - 1;

      return isLeftEdgeDot || isRigthEdgeDot
    }
    return(
      <section className='hero-section'>
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
                <div className="dots">
                <div className="dot-track" style={{ transform: `translateX(-${trackOffset}%)`, transition: `transform ${move === 0 ? '.3' : ".6" }s ease` }}>
                  {topIds.map((anime, index) => (
                <div
                  key={anime.id}
                  className={`${index === move ? 'active' : ''} ${isEdgeDot(index) ? 'desactive' : ''}`}
                  />
                  ))}
                </div>
                </div>
              </section>
    )
}