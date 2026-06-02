import { HashRouter, Route, Routes } from "https://esm.sh/react-router-dom"
import HomePage from "./HomePage"
import { SeasonPage } from "./SeasonPage"

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