import React, { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Laptop,
  ArrowLeftRight,
  Calendar,
  Wrench,
  ShieldCheck,
  FileBarChart,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  HardDrive,
  LogOut
} from 'lucide-react'
import './dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock activity data matching the image
  const activities = [
    {
      id: 1,
      type: 'ASSIGN',
      details: 'Laptop AF-0014 assigned',
      actor: 'Priya Shah',
      date: '24m ago',
      initials: 'PS'
    },
    {
      id: 2,
      type: 'BOOKING',
      details: 'Room B2 reservation confirmed',
      actor: 'Marcus V.',
      date: '1h ago',
      initials: 'MV'
    },
    {
      id: 3,
      type: 'REPAIR',
      details: 'Projector maintenance completed',
      actor: 'Tech Support',
      date: '3h ago',
      initials: 'TS'
    }
  ]

  // Menu list matching the image
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Organization', icon: Building2 },
    { name: 'Assets', icon: Laptop },
    { name: 'Transfers', icon: ArrowLeftRight },
    { name: 'Resource Booking', icon: Calendar },
    { name: 'Maintenance', icon: Wrench },
    { name: 'Audit', icon: ShieldCheck },
    { name: 'Reports', icon: FileBarChart }
  ]

  return (
    <div className="dashboard-layout">
      {/* Top Header Bar */}
      <header className="dashboard-top-bar">
        <div className="header-left">
          <div className="logo-brand">AssetFlow</div>
          <div className="header-search-wrapper">
            <Search className="search-bar-icon" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button className="icon-header-btn" title="Alerts & Telemetry">
            <Bell size={18} />
          </button>
          <button className="icon-header-btn" title="System Settings">
            <Settings size={18} />
          </button>
          
          <div className="user-profile-dropdown">
            <div className="user-avatar-circle">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Alex Chen"
                className="avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=Alex+Chen&background=6d28d9&color=fff";
                }}
              />
            </div>
            <span className="profile-name">{user?.name || 'Alex Chen'}</span>
            <ChevronDown size={14} className="dropdown-arrow-icon" />
            
            <div className="profile-hover-menu">
              <button onClick={onLogout} className="logout-menu-item">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          {/* Organization Widget */}
          <div className="sidebar-org-box">
            <div className="org-icon-avatar">GE</div>
            <div className="org-details">
              <div className="org-name">Global Enterprise</div>
              <div className="org-region">MUMBAI REGION B</div>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="sidebar-nav-menu">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  className={`sidebar-nav-btn ${activeMenu === item.name ? 'active' : ''}`}
                  onClick={() => setActiveMenu(item.name)}
                >
                  <Icon size={18} className="menu-icon" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Storage Indicator at bottom */}
          <div className="sidebar-bottom-indicator">
            <div className="indicator-label-row">
              <span className="indicator-title">Storage</span>
              <span className="indicator-percentage">76%</span>
            </div>
            <div className="indicator-progress-track">
              <div className="indicator-progress-fill" style={{ width: '76%' }}></div>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="dashboard-main-content">
          {activeMenu === 'Dashboard' ? (
            <div className="dashboard-grid-view">
              
              {/* Row 1 Left: Recent Activity */}
              <section className="dashboard-card recent-activity-card">
                <div className="card-header-row">
                  <h3 className="card-title">Recent Activity</h3>
                  <a href="#logs" className="card-action-link">View All Logs</a>
                </div>

                <div className="table-responsive-container">
                  <table className="activity-table-ui">
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Details</th>
                        <th>Actor</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((act) => (
                        <tr key={act.id}>
                          <td>
                            <span className={`event-badge-label ${act.type.toLowerCase()}`}>
                              {act.type}
                            </span>
                          </td>
                          <td className="event-details-text">{act.details}</td>
                          <td>
                            <div className="actor-profile-row">
                              <span className="actor-avatar-circle">{act.initials}</span>
                              <span className="actor-name-text">{act.actor}</span>
                            </div>
                          </td>
                          <td className="event-date-text">{act.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Row 1 Right: Quick Actions */}
              <section className="dashboard-card quick-actions-card">
                <h3 className="card-title">Quick Actions</h3>
                
                <div className="quick-action-buttons-list">
                  <button className="quick-action-link-btn">
                    <div className="btn-left-content">
                      <Laptop size={18} className="action-btn-icon" />
                      <span>Register New Asset</span>
                    </div>
                    <ChevronRight size={16} className="chevron-indicator" />
                  </button>

                  <button className="quick-action-link-btn">
                    <div className="btn-left-content">
                      <Calendar size={18} className="action-btn-icon" />
                      <span>Book Resource</span>
                    </div>
                    <ChevronRight size={16} className="chevron-indicator" />
                  </button>

                  <button className="quick-action-link-btn">
                    <div className="btn-left-content">
                      <Wrench size={18} className="action-btn-icon" />
                      <span>Maintenance Request</span>
                    </div>
                    <ChevronRight size={16} className="chevron-indicator" />
                  </button>
                </div>

                {/* Isometric quick overview illustration box */}
                <div className="isometric-overview-box">
                  <div className="isometric-box-title">QUICK OVERVIEW</div>
                  <div className="isometric-svg-wrapper">
                    <svg viewBox="0 0 320 160" fill="none" stroke="currentColor" strokeWidth="1.2" className="isometric-vector-svg">
                      {/* Isometric Grid Floor lines */}
                      <path d="M 160 20 L 280 80 L 160 140 L 40 80 Z" stroke="#e4e4e7" />
                      <path d="M 80 50 L 200 110" stroke="#f4f4f5" />
                      <path d="M 120 35 L 240 95" stroke="#f4f4f5" />
                      <path d="M 200 50 L 80 110" stroke="#f4f4f5" />
                      <path d="M 240 35 L 120 95" stroke="#f4f4f5" />

                      {/* Cubes / Server blocks */}
                      {/* Server Block 1 (Left) */}
                      <g transform="translate(100, 65)">
                        <polygon points="0,-20 20,-10 0,0 -20,-10" fill="#fcfcfc" stroke="#a1a1aa" />
                        <polygon points="-20,-10 0,0 0,25 -20,15" fill="#f4f4f5" stroke="#a1a1aa" />
                        <polygon points="0,0 20,-10 20,15 0,25" fill="#e4e4e7" stroke="#a1a1aa" />
                        {/* Server panel lines */}
                        <line x1="-12" y1="-2" x2="-4" y2="2" stroke="#71717a" strokeWidth="1" />
                        <line x1="-12" y1="3" x2="-4" y2="7" stroke="#71717a" strokeWidth="1" />
                        <line x1="-12" y1="8" x2="-4" y2="12" stroke="#71717a" strokeWidth="1" />
                      </g>

                      {/* Server Block 2 (Center-Right) */}
                      <g transform="translate(180, 75)">
                        <polygon points="0,-30 30,-15 0,0 -30,-15" fill="#fcfcfc" stroke="#71717a" />
                        <polygon points="-30,-15 0,0 0,35 -30,20" fill="#f4f4f5" stroke="#71717a" />
                        <polygon points="0,0 30,-15 30,20 0,35" fill="#e4e4e7" stroke="#71717a" />
                        {/* Server lights detail */}
                        <circle cx="10" cy="5" r="1.5" fill="#6d28d9" stroke="none" />
                        <circle cx="20" cy="0" r="1.5" fill="#3b82f6" stroke="none" />
                        <line x1="-20" y1="-5" x2="-5" y2="2" stroke="#a1a1aa" />
                        <line x1="-20" y1="2" x2="-5" y2="9" stroke="#a1a1aa" />
                        <line x1="-20" y1="9" x2="-5" y2="16" stroke="#a1a1aa" />
                      </g>

                      {/* Laptop / Console Box (Front) */}
                      <g transform="translate(140, 110)">
                        <polygon points="0,-8 12,-2 0,4 -12,-2" fill="#ffffff" stroke="#71717a" />
                        <polygon points="-12,-2 0,4 0,8 -12,2" fill="#f4f4f5" stroke="#71717a" />
                        <polygon points="0,4 12,-2 12,4 0,8" fill="#e4e4e7" stroke="#71717a" />
                        {/* Open screen */}
                        <polygon points="-2,-6 -2,-18 6,-14 6,-2" fill="#f4f4f5" stroke="#71717a" />
                        <polygon points="0,-8 0,-16 4,-14 4,-6" fill="#ffffff" stroke="#6d28d9" strokeWidth="0.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              </section>

              {/* Row 2 Left: Asset Distribution Map */}
              <section className="dashboard-card asset-distribution-card">
                <h3 className="card-title">Asset Distribution</h3>
                
                <div className="map-visualization-area">
                  {/* Grid Lines Overlay */}
                  <div className="grid-overlay"></div>
                  
                  {/* Map Schematic Drawing */}
                  <svg viewBox="0 0 450 260" fill="none" stroke="currentColor" className="blueprint-map-svg">
                    {/* Outline floor plan */}
                    <rect x="20" y="20" width="410" height="220" rx="6" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x="40" y="40" width="370" height="180" rx="4" stroke="#f4f4f5" strokeWidth="1.2" />
                    
                    {/* Partition walls */}
                    <line x1="140" y1="40" x2="140" y2="180" stroke="#f4f4f5" strokeWidth="1.2" />
                    <line x1="280" y1="80" x2="280" y2="220" stroke="#f4f4f5" strokeWidth="1.2" />
                    <line x1="140" y1="120" x2="220" y2="120" stroke="#f4f4f5" strokeWidth="1.2" />
                    
                    {/* Furniture / Desks outlines */}
                    <rect x="60" y="60" width="50" height="30" rx="2" stroke="#e4e4e7" strokeWidth="0.8" />
                    <rect x="60" y="110" width="50" height="30" rx="2" stroke="#e4e4e7" strokeWidth="0.8" />
                    <rect x="170" y="60" width="80" height="40" rx="2" stroke="#e4e4e7" strokeWidth="0.8" />
                    <rect x="310" y="140" width="70" height="40" rx="2" stroke="#e4e4e7" strokeWidth="0.8" />
                    
                    {/* Pulse glowing blue/violet point in center */}
                    <g transform="translate(225, 130)">
                      <circle cx="0" cy="0" r="16" fill="rgba(109, 40, 217, 0.12)" className="pulse-map-glow-slow" />
                      <circle cx="0" cy="0" r="8" fill="rgba(109, 40, 217, 0.25)" className="pulse-map-glow-fast" />
                      <circle cx="0" cy="0" r="3.5" fill="#6d28d9" />
                    </g>
                  </svg>

                  <div className="map-bottom-tag">Map Display Active - All Systems</div>
                </div>
              </section>

              {/* Row 2 Right: Maintenance Insights */}
              <section className="dashboard-card maintenance-insights-card">
                <h3 className="card-title">Maintenance Insights</h3>
                <p className="card-subtitle-desc">Infrastructure health metrics and regional repair efficiency.</p>

                <div className="insights-metrics-bars">
                  {/* Progress Metric 1 */}
                  <div className="progress-metric-item">
                    <div className="metric-header-row">
                      <span className="metric-name-title">INFRASTRUCTURE HEALTH</span>
                      <span className="metric-value-num">98.2%</span>
                    </div>
                    <div className="thick-progress-track health-track">
                      <div className="thick-progress-fill health-fill" style={{ width: '98.2%' }}></div>
                    </div>
                  </div>

                  {/* Progress Metric 2 */}
                  <div className="progress-metric-item">
                    <div className="metric-header-row">
                      <span className="metric-name-title">AVG. REPAIR TIME</span>
                      <span className="metric-value-num">2.4 hrs</span>
                    </div>
                    <div className="thick-progress-track repair-track">
                      <div className="thick-progress-fill repair-fill" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Grid of 3 Stat Blocks */}
                <div className="insights-stats-row-grid">
                  <div className="stat-value-block">
                    <div className="block-title">LAST DATA</div>
                    <div className="block-value-text text-dark">2m ago</div>
                  </div>

                  <div className="stat-value-block">
                    <div className="block-title">STATUS</div>
                    <div className="block-value-text text-green">optimal</div>
                  </div>

                  <div className="stat-value-block">
                    <div className="block-title">NET VALUE</div>
                    <div className="block-value-text text-red">$34.2M</div>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            <div className="fallback-tab-content">
              <h2 className="fallback-tab-title">{activeMenu} Section</h2>
              <p className="fallback-tab-desc">This interface is under active development. Select "Dashboard" from the menu to see the main view.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
