import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './layaut/App'
import "./layaut/App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
