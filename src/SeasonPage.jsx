import { Await, useParams } from "react-router-dom";
import { useState, useEffect } from "https://esm.sh/react";
import "./SeasonPage.css";
import { EpisodeCard } from "./Ep-card.";
import { Header, Footer } from "./Header";
const infoFetch = async (id) => {
  const query = `
  query($search : String){
    Media(search : $search, type : ANIME){
      description(asHtml : false)
      title { english }
      averageScore
      format
      episodes
      genres
      status
      relations {
      edges {
        relationType  # SEQUEL, PREQUEL, SIDE_STORY, SPIN_OFF, etc.
        node {
          id
          title { romaji english }
          coverImage { large }
          type
          status
        }
      }
    }
      startDate { year }
      bannerImage
      coverImage { extraLarge, medium }
      id
      studios {
      edges {
        isMain  # true = estudio principal
        node {
          id
          name
          isAnimationStudio
        }
      }
    }
      staff {
        edges{
          role
          node{
            id
            name{
              full
            }
          }
        }
      }
    }
  }
  `;

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { search:id } }),
    });

    const json = await res.json();
    console.log(json);
    const anime = json.data.Media;
    const mainStudio = anime.studios.edges.find(a => a.isMain);
      const cleanDesc = anime.description? anime.description
          .replace(/<[^>]+>/g, "") // tags HTML
          .replace(/\([^)]+\)\s*Notes?:[\s\S]*/i, "") // (Crunchyroll) Notes: ...
          .replace(/\(Source:[^)]+\)/gi, "") // (Source: MAL)
          .replace(/\(Note:[^)]+\)/gi, "") // (Note: ...)
          .trim() + ""
      : "";
    const epRes = await fetch(`https://api.ani.zip/mappings?anilist_id=${anime.id}`);
    const epJson = await epRes.json();
    const kitsuId = epJson.mappings?.kitsu_id;
    const kitsuThumbs = {};
    const totalEpisodes = epJson.episodeCount;
    // Página 1: offset 0  → eps 1-20
// Página 2: offset 20 → eps 21-40
// Página 3: offset 40 → eps 41-60
// ...
const aniZipEpisodes = Object.entries(epJson.episodes ?? {}).map(([num, ep]) => ({
  episode: parseInt(num),
  title: ep.title,
  image: ep.image,
  runtime: ep.runtime,
  airdate: ep.airdate,
}));

const fetchKitsuPage = async (page)=>{
  const res = await fetch(
    `https://kitsu.io/api/edge/anime/${kitsuId}/episodes?page[limit]=20&page[offset]=${(page - 1) * 20}`
  );
  const json = await res.json();
  console.log(json);
  
  json.data?.forEach(ep => {
    const num = ep.attributes.number;
    const thumb = ep.attributes.thumbnail?.original;
    if (thumb) kitsuThumbs[num] = thumb;
  });
}
// ✅ Rápido - todas las páginas se piden al mismo tiempo
const totalPages = Math.ceil(totalEpisodes / 20);

const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

const allPages = await Promise.all(
  pageNumbers.map(page => fetchKitsuPage(page))
);



// Cada episodio tiene: title, image (thumbnail), airDate, etc.
    
    
     // URL del thumbnail
    const info = {
      banner: anime,
      title: anime.title.english,
      format: anime.format,
      description: cleanDesc,
      episodes: totalEpisodes,
      genres: anime.genres,
      score: anime.averageScore / 10,
      year: anime.startDate.year,
      studio : mainStudio.node.name,
      autor : anime.staff.edges[10].node.name.full,
      status: anime.status,
      epInfo: aniZipEpisodes,
      epBanner: kitsuThumbs,
      imgBanner : anime.bannerImage
    };
    return info;
  } catch (error) {
    console.log(error);
  }
};
export function SeasonPage() {
  const { id } = useParams();
  
  const [info, setInfo] = useState(null);
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState(null);
  const [size, setSize] = useState(window.innerWidth);
  const [version, setVersion] = useState("")
  useEffect(() => {
    infoFetch(id.replace(/-/g," ")).then((data) => {
      setInfo(data);
    });
  }, [id]);

  useEffect(()=>{
    const handle = ()=>setSize(window.innerWidth) 
    window.addEventListener('resize', handle)
    return () => window.removeEventListener("resize", handle);
  }, [])

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

  if (!info) return <div>Cargando...</div>;
  const { banner, title, format, description, episodes, genres, score, year, studio, autor, status, epInfo, epBanner, imgBanner} =
    info;

  return (
    <>
    <Header/>
    <section className={`season-hero-section${version}`}>
        <div className={`season-hero-wrapper${version}`}>
          <div className={`season-hero-gradient${version}`}></div>
          <img src={img} alt="" onLoad={() => setLoad(true)} className={`season-hero-img${version}`}/>
          <div className={`season-hero${version} ${load ? "" : "skeleton"}`} id={`season-hero${version}`}>
            <div className={`season-genres${version}`}>
              <span className={`season-genre-tag${version}`}>{genres[0]}</span>
              <div className="dot"></div>
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
      <section>
          <div className="season-hero-info">
            <div>
              <h3>AUTOR</h3>
              <h4>{autor}</h4>
            </div>
            <div>
              <h3>STUDIO</h3>
              <h4>{studio}</h4>
            </div>
            <div>
              <h3>STATUS</h3>
              <h4>{status}</h4>
            </div>
            <div>
              <h3>RATING</h3>
              <h4>{score}</h4>
            </div>
          </div>
      </section>
      <h2 className="season-episodes-section-title">Episodes</h2>
      <section className="season-episodes-section">
        
        {epInfo.slice(0,episodes).map(ep =><EpisodeCard key={ep.episode} img={ep.image ?? epBanner[ep.episode] ?? imgBanner} duration={ep.runtime} title={ep.title.en} number={ep.episode}/>)}
      </section>
      <Footer/>
    </>
    
  );
}
