import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./HomePage"
import { SeasonPage } from "./SeasonPage"

export function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/anime/:id" element={< SeasonPage />}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App