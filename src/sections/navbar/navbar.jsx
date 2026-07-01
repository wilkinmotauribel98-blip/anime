import './navbar.css'

export function Navbar({active}) {
  return(
    <nav className="navbar">
      <a href="" className={`navbar-link ${active === 1 ? 'active' : ''}` } >
        <span className="material-symbols-outlined">home</span>
        Home
      </a>
      <a href="" className={`navbar-link ${active === 2 ? 'active' : ''}` } >
        <span className="material-symbols-outlined">grid_view</span>
        Library</a>
      <a href="" className={`navbar-link ${active === 3 ? 'active' : ''}` } >
        <span className="material-symbols-outlined">calendar_month</span>
        Seasonal
        </a>
      <a href="" className={`navbar-link ${active === 4 ? 'active' : ''}` } > 
        <span className="material-symbols-outlined">emoji_events</span>
        Top</a>
      <a href="" className={`navbar-link ${active === 5 ? 'active' : ''}` } >
        <span className="material-symbols-outlined">bookmark</span>
        My List</a>
    </nav>
  )
}