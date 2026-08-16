import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

interface SidebarProps {
  expanded?: boolean
}

const NAV_ITEMS = [
  { icon: 'car', label: 'Browse cars', id: 'browse', path: '/' },
  { icon: 'grid', label: 'My listings', id: 'listings', path: '/listings' },
  { icon: 'plus', label: 'Sell a car', id: 'sell', path: '/sell' },
  { icon: 'chat', label: 'Inquiries', id: 'inquiries', badge: 3, path: '/inquiries' },
  { icon: 'user', label: 'Account', id: 'account', path: '/account' },
]

const ICON_SVG: Record<string, string> = {
  car: '<path d="M4 13l1.7-4.5A2 2 0 0 1 7.6 7h8.8a2 2 0 0 1 1.9 1.5L20 13v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.5h-9v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4Z"/><path d="M4 13h16"/>',
  grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chat: '<path d="M21 11.6a7.9 7.9 0 0 1-8 7.9H7.4L3.4 22l1.1-3.9A7.9 7.9 0 1 1 21 11.6Z"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/>',
  logout: '<path d="M15.5 16.5l4.5-4.5-4.5-4.5M20 12H9.5M12.5 3.8H6a1.5 1.5 0 0 0-1.5 1.5v13.4A1.5 1.5 0 0 0 6 20.2h6.5"/>',
}

export function Sidebar({ expanded = false }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            className={`sidebar-btn ${idx === 0 ? 'active' : ''}`}
            title={item.label}
            onClick={() => navigate(item.path)}
          >
            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICON_SVG[item.icon] }} />
            {expanded && <span className="sidebar-label">{item.label}</span>}
            {item.badge && <span className="notification">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar__foot">
        <button className="sidebar-btn" title="Log out">
          <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICON_SVG.logout }} />
          {expanded && <span className="sidebar-label">Log out</span>}
        </button>
      </div>
    </aside>
  )
}
