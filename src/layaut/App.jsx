import { HashRouter, Route, Routes } from "react-router-dom"
import { HomePage } from '../pages/Home-page'
import { SeasonPage } from "../pages/Season-page"
import './App.css'

export function App() {
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/anime/:id" element={< SeasonPage />}/>
        
      </Routes>
    </HashRouter>
  )
}

export default App