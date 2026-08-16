import './Topbar.css'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="searchbox">
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

      <div className="topbar__right">
        <button className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24">
            <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7" />
            <path d="M10.3 20a2 2 0 0 0 3.4 0" />
          </svg>
          <span className="dot"></span>
        </button>
        <div className="avatar">RK</div>
      </div>
    </header>
  )
}
