import React, { useState, useEffect } from 'react'
import './App.css'
import { TopAnimeCard} from './Top-anime-card'

const animeIds = [
  21,  // Sakamoto Days
  178025,  // Gachiakuta
  151807,  // Solo Leveling
  186148,  // The Apothecary Diaries S2
  185660,  // Dandadan S2
  113415,  // Frieren
  166531,  // Chainsaw Man S2 (Reze Arc)
]
export function App() {
  return (
    <>
      <header className='header'>
        <div className="header-img-container">
          <img src="logo.png" alt="" />
        </div>
        <div className="header-link-container">
            <a href="" className="header-link">Explore</a>
            <a href="" className="header-link">Library</a>
            <a href="" className="header-link">Schedule</a>
            <a href="" className="header-link">Exclusives</a>
        </div>
        <div className="account-container">
          <a href="">
            <img src="../../login.png" alt="" />
          </a>
        </div>
      </header>
      <main>
        <section>
          <div className="track">
          {animeIds.map(id =>(  <TopAnimeCard key={id} animeId={id}/>))}
          </div>
        </section>
      </main>
      
    </>
  )
}

export default App
