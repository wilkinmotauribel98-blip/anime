import { useState, useEffect } from "react";
import './Season-hero.css'
export const SeasonHeroSection = ({ year, description, format, episodes, genres, title, size, info })=>{
    const [load, setLoad] = useState(false);
    const [img, setImg] = useState(null);
    const [version, setVersion] = useState("");
    useEffect(() => {
    if (!info) return
    if (size > 750 && size < 1200) {
      setVersion('-v2')
       /// banner horizontal para desktop
    } else {
      setVersion('') // cover vertical para móvil
    }
  
    if(size > 1199) setImg(info.imgBanner);
    else setImg(info.banner.coverImage.extraLarge);
  }, [size, info]);
  return(
    <section className={`season-hero-section${version}`}>
        <div className={`season-hero-wrapper${version}`}>
          <div className={`season-hero-gradient${version}`}></div>
          <img src={img} alt="" onLoad={() => setLoad(true)} className={`season-hero-img${version}`} />
          <div className={`season-hero${version} ${load ? "" : "skeleton"}`} id={`season-hero${version}`}>
            <div className={`season-genres${version}`}>
              <span className={`season-genre-tag${version}`}>{genres[0]}</span>
              <div className="season-dot"></div>
              <span className={`season-genre-tag${version}`}>{genres[1]}</span>
            </div>
            <div className={`season-hero-title${version}`} id="hero-title-v2">
              {title}
            </div>
            <div className={`season-hero-content${version}`} id="hero-content-v2">
              <div className={`season-hero-meta${version}`} id="hero-meta-v2">
                <div className="year">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <h3>{year}</h3>
                </div>
                <div className={`season-hero-episodes${version}`}>
                  <span className="material-symbols-outlined">movie</span>
                  <h3>{episodes}</h3>
                  </div>
                <div className={`season-hero-format${version}`}>
                  {format}
                  </div>
              </div>
              <div className={`season-hero-desc${version}`}id="hero-desc-v2">
                {description}
              </div>
              <div className={`season-hero-buttons${version}`}>
                <div>▶ Start Now</div>
                <div>Details</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}