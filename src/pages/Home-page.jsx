import React, { useState, useEffect } from 'react'
import { Header } from '../sections/header/Header'
import { SeasonalSection } from '../sections/seasonal/Seasonal'
import { HeroSection } from '../sections/hero/Hero'
import { RecomendationSection } from '../sections/recomendations/Recomendations'
import { Footer } from '../sections/footer/Footer'
import { AnimeLibrarySection } from '../sections/library/Library'
import { animeFetch } from '../functions/Home-anime-fetch'
import { animeIds } from "../consts/animes"

export function HomePage() {
  const [load, setLoad] = useState(true);
  const [openCard, setOpenCard] = useState(false);
  const [data , setData] = useState(null);

  useEffect(() => {
  animeFetch(animeIds).then(data => {
    setData(data)
    setLoad(false)
  });
}, []);
  if(load) return <div>cargando</div>
  const topIds = data[1].top.media
  const recIds = data[1].recomandations.media
  const libIds = data[1].library.media
  const seaIds = data[1].season.media
  return (
    <>
    <Header/>
        <HeroSection topIds={topIds} data={data} />
        <RecomendationSection recIds={recIds}/>
        <SeasonalSection seaIds={seaIds}/>
        <AnimeLibrarySection libIds={libIds}/>
      <Footer/>
    </>
  )
}

export default HomePage