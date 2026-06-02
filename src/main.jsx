import { StrictMode } from "https://esm.sh/react"
import { createRoot } from 'https://esm.sh/react-dom/client'
import { App } from './App.jsx'
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
