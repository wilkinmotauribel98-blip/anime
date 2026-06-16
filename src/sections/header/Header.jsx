import { Navigate, useNavigate } from "react-router-dom"
import './Header.css'
export const Header = ()=>{
  const navigate = useNavigate()
  return(
    <header className='header'>
        <div className="header-img-container">
          {/* ✅ logo está en public/, se referencia desde la raíz */}
          <img src="logo.png" alt="logo" onClick={() => navigate('/')}/>
        </div>
        <div className="header-link-container">
          <a href="" className="header-link">Explore</a>
          <a href="" className="header-link">Library</a>
          <a href="" className="header-link">Schedule</a>
          <a href="" className="header-link">Exclusives</a>
        </div>
        <div className="account-container">
          <a href="">
            {/* ✅ mismo fix para login.png */}
            <img src="login.png" alt="login" />
          </a>
        </div>
      </header>
  )
}