import { StrictMode } from "https://esm.sh/react"
import { createRoot } from 'https://esm.sh/react/react-dom/client'
import { App } from './App'
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
