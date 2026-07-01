import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../sections/header/Header";
import { Footer } from "../sections/footer/Footer";
import { Overview } from "../sections/overview/Overview";
import { SeasonEpisodesSection } from "../sections/episodes/Episodes";
import { infoFetch } from "../functions/Season-anime-fetch";
import { Navbar } from "../sections/navbar/navbar";

export function SeasonPage() {
  const { title } = useParams();
  const [info, setInfo] = useState(null);
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
      const load = async ()=>{
        const data = await infoFetch(title.replace(/-/g," "))
        setInfo(data);

        const seasons = await data.seasonsPromise;
        setInfo(prev => ({ ...prev, seasons }));
      }

      load()
      
  }, [title]);
  useEffect(()=>{
    const actSize = ()=>setSize(window.innerWidth)
    window.addEventListener("resize", actSize);
    return () => {
      window.removeEventListener("resize", actSize)
    }

  }, [])
  
  if (!info) return <div>Cargando...</div>;
  ;
  const { overviewInfo, epInfo, epBanner, banner, epDesc, ovas, episodes} = info;
  
  
  return (
    <>
    <Header/>
    <Navbar active={1}/>
    <Overview info={overviewInfo} size={size} />

    <SeasonEpisodesSection ovas={ovas} seasons={info.seasons} epDesc={epDesc} epInfo={epInfo} epBanner={epBanner} imgBanner={banner} episodes={episodes} title={title}/>
    
      <Footer/>
    </>
  );
}
