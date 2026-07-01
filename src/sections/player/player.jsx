import { useState, useEffect } from "react";
import './player.css'
export function Player({ info }) {
  return(
    <section className="player-section">
      <div className="player-title">
        <span className="material-symbols-outlined">arrow_back</span>
        <h3>Solo Leveling</h3>
        <span className="material-symbols-outlined">keyboard_arrow_right</span>
        <h3>Episode 7</h3>
      </div>
      <div className="player-controls">
        <span className="material-symbols-outlined">settings</span>
        <span className="material-symbols-outlined">fullscreen</span>
      </div>

      <div className="player">
        <iframe 
  width="100%" 
  height="100%" 
  src="https://www.youtube.com/embed/k4LLEmANPwE"
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>
      </div>
    </section>
  )
}