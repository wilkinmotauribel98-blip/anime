import { Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './Header.css'
export const Header = ()=>{
  return(
    <header className='header'>
      <div className="header-icon">
        <svg width="260" height="69" viewBox="0 0 260 84" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="260" height="84" fill="transparent"/>
  <text x="34" y="56"
        fontFamily="Arial Black, Impact, sans-serif"
        fontSize="28"
        fontWeight="100"
        letterSpacing="-1.5">
    <tspan fill="#8B5CF6">A</tspan><tspan fill="#FFFFFF">NIFLIX</tspan>
  </text>
</svg>
      </div>
      <div className="header-links">
        <a href="" className="active">Home</a>
        <a href="">Library</a>
        <a href="">Seasonal</a>
        <a href="">Top Anime</a>
      </div>

    <div className="searcher">
    <input type="search" placeholder="🔍  Search Anime..."/>
    </div>
      </header>
  )
}