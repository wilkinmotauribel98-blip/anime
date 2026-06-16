import "./Footer.css"

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