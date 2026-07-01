
import { EpisodeCard } from "../../components/EpisodeCard";
import { useState } from "react";
import './Episodes.css'

export const SeasonEpisodesSection = ({ epInfo, epBanner, imgBanner, epDesc, episodes, ovas, seasons, title})=>{
  const [version, setVersion] = useState('-v2');
  const [active, setActive] = useState({episode : true , season : false, ova : false})
  const [view, setView] = useState("grid");
  const [content, setContent] = useState(`${episodes} Episodes`)
  
  const actualizer = (e)=>{
    if(e){
    setVersion("-v2")
    setView('grid')
  }
  else{
    setVersion("")
    setView('flex')
  }
  }  
  
  const actualizerContent = (ep, sea, ov)=>{
    setActive({episode : ep , season : sea, ova : ov})
    if(ep) setContent(`${episodes} Episodes`);
    else if(sea) setContent(`${(seasons ?? []).length} Seasons`);
    else if(ov) setContent(`${(ovas ?? []).length} OVAS`);
  }
  
  
  return(
    <section className="season-episodes-section">
      <div className="episodes-container">
        <div className="season-content">
            <h2 className={`season-content-type ${active.episode ? "active" : ''}`} onClick={()=>actualizerContent(true,false,false)}> <span className="material-symbols-outlined">
              smart_display
            </span>EPISODES</h2>
            <h2 className={`season-content-type ${active.ova ? "active" : ''}`} onClick={()=>actualizerContent(false,false,true)}><span className="material-symbols-outlined">
              radio_button_checked
            </span>OVAS</h2>
            <h2 className={`season-content-type ${active.season ? "active" : ''}`} onClick={()=>actualizerContent(false,true,false)}><span className="material-symbols-outlined">
              calendar_month
            </span>SEASONS</h2>
        </div>

          <div className="episodes-view">
            <div className={`list ${version ? '' : 'active'}`} onClick={()=> actualizer(false) }>
              <span className="material-symbols-outlined" style={{fontSize : "25px", fontWeight : '900'}}>list</span>
              </div>
            <div className={`grid ${version ? 'active' : ''}`} onClick={()=> actualizer(true)}> 
              <span className="material-symbols-outlined">grid_view</span>
              </div>
          </div>
      </div>
      <div className="season-number">
        <h2>{content}</h2>
        
      </div>
          
          <div className={`season-episodes-container${version}` } style={{display : `${active.episode ? view : 'none'}`}}>
            {epInfo.slice(0,episodes).map(ep =><EpisodeCard key={ep.episode} img={ep.image ?? epBanner[ep.episode] ?? imgBanner} duration={`m${ep.runtime ?? '24'}`} title={ep.title.en} number={`Ep${ep.episode < 10 ? '0' + ep.episode : ep.episode}`} overview={ep.overview ?? epDesc[ep.episode]} version={version} dot={<div className="dot"></div> } direction={`/anime/${title}/${ep.episode < 10 ? '0' + ep.episode : ep.episode}`}/>)} 
          </div>
          <div className={`season-episodes-container${version}`} style={{display : `${active.ova ? view : 'none'}`}}>
            {(ovas ?? [] ).map(ep => <EpisodeCard key={ep.node.id}  img={ep.node.coverImage.extraLarge}  title={ep.node.title.english ??  ep.node.title.romaji } overview={ep.node.description}  version={version} direction={`/anime/${(ep.node.title.english ?? ep.node.title.romaji).replace(/\s/g,"-")}`}/>)}
          </div>
          
          <div className={`season-episodes-container${version}`} style={{display : `${active.season ? view : 'none'}`}}>
            {(seasons ?? [] ).map(ep => <EpisodeCard key={ep.node.id}  img={ep.node.coverImage.extraLarge}  title={ep.node.title.english ??  ep.node.title.romaji } overview={ep.node.description}  version={version} direction={`/anime/${ep.node.title.english.replace(/\s/g,"-")}`} number={`Episodes ${ep.node.episodes < 10 ? '0' + ep.node.episodes : ep.node.episodes}`}/>)}
          </div>
        </section>
  )
}