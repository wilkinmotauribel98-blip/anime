import { RelatedCard } from "../../components/Related-card";
import { EpisodeCard } from "../../components/Ep-card";
import './Episodes.css'

export const SeasonEpisodesSection = ({continuation, epInfo, epBanner, imgBanner, epDesc, episodes})=>{
  return(
    <section className="season-episodes-section">
        <div className="season-content">
            <h2 className="season-content-type"><span class="material-symbols-outlined">
smart_display
</span>EPISODES</h2>
            <h2 className="season-content-type"><span class="material-symbols-outlined">
radio_button_checked
</span>OVAS</h2>
            <h2 className="season-content-type"><span class="material-symbols-outlined">
calendar_month
</span>SEASONS</h2>
          </div>
          <div className="season-episodes-container"> 
            {epInfo.slice(0,episodes).map(ep =><EpisodeCard key={ep.episode} img={ep.image ?? epBanner[ep.episode] ?? imgBanner} duration={ep.runtime ?? '24'} title={ep.title.en} number={ep.episode} overview={ep.overview ?? epDesc[ep.episode]} />)}
          </div>
        </section>
  )
}