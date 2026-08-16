import './Header.css'
import logoImg from '../assets/icon512.png'

interface HeaderProps {
  onToggleSidebar?: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="header">
      {/* Menu + Logo + Brand */}
      <div className="header__left">
        <button
          className="menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <img src={logoImg} alt="Awan Cars logo" className="header-logo" />
        <div className="header-branding">
          <h1 className="header-title">Awan Cars</h1>
          <p className="header-slogan">Find It. Drive It. Own It.</p>
        </div>
      </div>

      {/* Search */}
      <div className="header-search">
        <svg viewBox="0 0 24 24" className="search-icon">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          placeholder="Search make, model or stock number"
          className="search-input"
          aria-label="Search inventory"
        />
      </div>

      {/* Right Section */}
      <div className="header__right">
        <button className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
            <path d="M10.3 20a2 2 0 0 0 3.4 0" />
          </svg>
          <span className="notification-dot"></span>
        </button>
        <div className="avatar">RK</div>
      </div>
    </header>
  )
}
