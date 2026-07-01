import { HashRouter, Route, Routes } from "react-router-dom"
import { HomePage } from '../pages/Home-page'
import { SeasonPage } from "../pages/Season-page"
import { PlayerPage } from "../pages/PlayerPage"
import './App.css'

export function App() {
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/anime/:title" element={< SeasonPage />}/>
        <Route path="/anime/:title/:chapter" element={<PlayerPage />}/>
      </Routes>
    </HashRouter>
  )
}

export default App