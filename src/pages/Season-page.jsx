import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../sections/header/Header";
import { Footer } from "../sections/footer/Footer";
import { SeasonHeroSection } from "../sections/season-hero/Season-hero";
import { SeasonInfoSection } from "../sections/info/Info";
import { SeasonEpisodesSection } from "../sections/episodes/Episodes";
import { infoFetch } from "../funtions/Season-anime-fetch";

export function SeasonPage() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    infoFetch(id.replace(/-/g," ")).then((data) => {
      setInfo(data);
    });
  }, [id]);
  useEffect(()=>{
    const actSize = ()=>setSize(window.innerWidth)
    window.addEventListener("resize", actSize);
    return () => {
      window.removeEventListener("resize", actSize)
    }
  }, [])
  
  if (!info) return <div>Cargando...</div>;
  const { banner, title, format, description, episodes, genres, score, year, studio, autor, status, epInfo, epBanner, imgBanner, continuation, epDesc} = info;

  return (
    <>
    <Header/>
    <SeasonHeroSection title={title} format={format} episodes={episodes} genres={genres} year={year} description={description} info={info} size={size}/>
    
    <SeasonInfoSection score={score} studio={studio} autor={autor} status={status}/>
    
    <SeasonEpisodesSection continuation={continuation} epDesc={epDesc} epInfo={epInfo} epBanner={epBanner} imgBanner={imgBanner} episodes={episodes}/>
      <Footer/>
    </>
  );
}
