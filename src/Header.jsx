import { Navigate, useNavigate } from "react-router-dom"


export const Header = ()=>{
  const navigate = useNavigate()
  return(
    <header className='header'>
        <div className="header-img-container">
          {/* ✅ logo está en public/, se referencia desde la raíz */}
          <img src="/logo.png" alt="logo" onClick={() => navigate('/')}/>
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
            <img src="/login.png" alt="login" />
          </a>
        </div>
      </header>
  )
}

export const Footer = ()=>{
  return(
    <footer className='footer'>
        <div className='footer-name'>
          <h2>Midnight anime</h2>
          <p>© 2025 MIDNIGHT ANIME.</p>
        </div>
        <div className='policy-container'>
          <a href="">PRIVACY POLICY</a>
          <a href="">TERMS OF SERVICE</a>
          <a href="">CONTACT</a>
          <a href="">PRESS KIT</a>
        </div>
      </footer>
  )
}