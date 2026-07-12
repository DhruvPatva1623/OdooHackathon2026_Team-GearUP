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
  Bell,
  Plus,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  Send,
  CheckCircle,
  X
} from 'lucide-react'
import './dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  
  // Dynamic stats state
  const [stats, setStats] = useState({
    available: 128,
    allocated: 76,
    overdue: 4,
    activeBookings: 9,
    pendingTransfers: 3,
    upcomingReturns: 12
  })

  // Mock activity feed matching wireframe
  const [activities, setActivities] = useState([
    {
      id: 1,
      text: 'Laptop AF-0114 - allocated to Priya shah - IT dept',
      time: '24m ago',
      type: 'allocation'
    },
    {
      id: 2,
      text: 'Room B2 - booking confirmed - 2:00 to 3:00 PM',
      time: '1h ago',
      type: 'booking'
    },
    {
      id: 3,
      text: 'Projector AF-0062 - maintenance resolved',
      time: '3h ago',
      type: 'maintenance'
    }
  ])

  // Form states
  const [newAssetName, setNewAssetName] = useState('')
  const [newAssetTag, setNewAssetTag] = useState('')
  const [bookingRoom, setBookingRoom] = useState('Room B2')
  const [bookingTime, setBookingTime] = useState('2:00 to 3:00 PM')
  const [requestText, setRequestText] = useState('')

  // Handle register asset submission
  const handleRegisterAsset = (e) => {
    e.preventDefault()
    if (!newAssetName || !newAssetTag) return
    
    // Increment available count
    setStats(prev => ({ ...prev, available: prev.available + 1 }))
    
    // Add activity
    const newAct = {
      id: Date.now(),
      text: `${newAssetName} (${newAssetTag}) - registered successfully in system`,
      time: 'Just now',
      type: 'allocation'
    }
    setActivities([newAct, ...activities])
    
    // Reset form & close
    setNewAssetName('')
    setNewAssetTag('')
    setShowRegisterModal(false)
  }

  // Handle room booking submission
  const handleBookResource = (e) => {
    e.preventDefault()
    
    setStats(prev => ({ ...prev, activeBookings: prev.activeBookings + 1 }))
    
    const newAct = {
      id: Date.now(),
      text: `${bookingRoom} - booking confirmed - ${bookingTime}`,
      time: 'Just now',
      type: 'booking'
    }
    setActivities([newAct, ...activities])
    
    setShowBookingModal(false)
  }

  // Handle raise request submission
  const handleRaiseRequest = (e) => {
    e.preventDefault()
    if (!requestText) return
    
    setStats(prev => ({ ...prev, pendingTransfers: prev.pendingTransfers + 1 }))
    
    const newAct = {
      id: Date.now(),
      text: `Maintenance request raised: "${requestText}"`,
      time: 'Just now',
      type: 'maintenance'
    }
    setActivities([newAct, ...activities])
    
    setRequestText('')
    setShowRequestModal(false)
  }

  // Menu items matching the wireframe
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Organization setup', icon: Building2 },
    { name: 'Assets', icon: Laptop },
    { name: 'Allocation & Transfer', icon: ArrowLeftRight },
    { name: 'Resource Booking', icon: Calendar },
    { name: 'Maintenance', icon: Wrench },
    { name: 'Audit', icon: ShieldCheck },
    { name: 'Reports', icon: FileBarChart },
    { name: 'Notifications', icon: Bell }
  ]

  return (
    <div className="dashboard-app-frame">
      {/* Top Header */}
      <header className="wireframe-header">
        <div className="header-logo-title">AssetFlow</div>
        <div className="header-user-status">
          <span className="user-online-badge"></span>
          <span className="user-display-name">{user?.name || 'Alex Chen'}</span>
          <button className="logout-action-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-app-body">
        {/* Left Sidebar */}
        <aside className="wireframe-sidebar">
          <nav className="sidebar-nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  className={`sidebar-nav-item-btn ${activeMenu === item.name ? 'active' : ''}`}
                  onClick={() => setActiveMenu(item.name)}
                >
                  <Icon size={16} className="menu-nav-icon" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Workspace */}
        <main className="wireframe-main-content">
          {activeMenu === 'Dashboard' ? (
            <div className="dashboard-view-container">
              
              {/* Today's Overview Section */}
              <section className="overview-section">
                <h2 className="section-main-heading">Today's Overview</h2>
                
                {/* 2x3 Grid Cards */}
                <div className="overview-stats-grid">
                  
                  {/* Card 1: Available */}
                  <div className="stat-overview-card theme-green">
                    <div className="stat-card-label">Available</div>
                    <div className="stat-card-value">{stats.available}</div>
                  </div>

                  {/* Card 2: Allocated */}
                  <div className="stat-overview-card theme-blue">
                    <div className="stat-card-label">Allocated</div>
                    <div className="stat-card-value">{stats.allocated}</div>
                  </div>

                  {/* Card 3: Overdue */}
                  <div className="stat-overview-card theme-red">
                    <div className="stat-card-label">Overdue</div>
                    <div className="stat-card-value">{stats.overdue}</div>
                  </div>

                  {/* Card 4: Active Bookings */}
                  <div className="stat-overview-card theme-purple">
                    <div className="stat-card-label">Active Bookings</div>
                    <div className="stat-card-value">{stats.activeBookings}</div>
                  </div>

                  {/* Card 5: Pending Transfers */}
                  <div className="stat-overview-card theme-teal">
                    <div className="stat-card-label">Pending Transfers</div>
                    <div className="stat-card-value">{stats.pendingTransfers}</div>
                  </div>

                  {/* Card 6: Upcoming returns */}
                  <div className="stat-overview-card theme-orange">
                    <div className="stat-card-label">Upcoming returns</div>
                    <div className="stat-card-value">{stats.upcomingReturns}</div>
                  </div>

                </div>
              </section>

              {/* Overdue alert banner */}
              <div className="overdue-banner-alert">
                <AlertTriangle size={18} className="alert-banner-icon" />
                <span className="alert-banner-text">
                  3 assets overdue for return - flagged for follow-up
                </span>
              </div>

              {/* Quick Actions Row */}
              <div className="dashboard-quick-actions-row">
                <button 
                  className="quick-action-btn primary-action"
                  onClick={() => setShowRegisterModal(true)}
                >
                  <Plus size={16} />
                  <span>register asset</span>
                </button>

                <button 
                  className="quick-action-btn secondary-action"
                  onClick={() => setShowBookingModal(true)}
                >
                  <BookOpen size={16} />
                  <span>Book resource</span>
                </button>

                <button 
                  className="quick-action-btn secondary-action"
                  onClick={() => setShowRequestModal(true)}
                >
                  <Send size={16} />
                  <span>Raise requests</span>
                </button>
              </div>

              {/* Recent Activity Section */}
              <section className="recent-activity-wire-section">
                <h3 className="section-secondary-heading">Recent Activity</h3>
                
                <div className="activity-wire-lines-list">
                  {activities.map((act) => (
                    <div key={act.id} className="activity-wire-line-item">
                      <div className={`activity-status-dot ${act.type}`}></div>
                      <p className="activity-line-text">{act.text}</p>
                      <span className="activity-time-tag">{act.time}</span>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          ) : (
            <div className="fallback-wire-container">
              <h2 className="fallback-wire-title">{activeMenu}</h2>
              <p className="fallback-wire-desc">
                The {activeMenu} interface is currently under active layout construction. Please toggle back to the "Dashboard" menu to view the overview.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Register Asset Modal */}
      {showRegisterModal && (
        <div className="modal-overlay-wire">
          <div className="modal-card-wire">
            <div className="modal-header-wire">
              <h3>Register New System Asset</h3>
              <button className="modal-close-wire" onClick={() => setShowRegisterModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRegisterAsset} className="modal-form-wire">
              <div className="form-group-wire">
                <label>Asset Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. iPad Pro M4"
                  value={newAssetName}
                  onChange={(e) => setNewAssetName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-wire">
                <label>Asset Serial / Tag</label>
                <input 
                  type="text" 
                  placeholder="e.g. AF-0129"
                  value={newAssetTag}
                  onChange={(e) => setNewAssetTag(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions-wire">
                <button type="button" className="modal-btn-cancel" onClick={() => setShowRegisterModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn-submit">Add Asset</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Resource Modal */}
      {showBookingModal && (
        <div className="modal-overlay-wire">
          <div className="modal-card-wire">
            <div className="modal-header-wire">
              <h3>Book Shared Resource</h3>
              <button className="modal-close-wire" onClick={() => setShowBookingModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleBookResource} className="modal-form-wire">
              <div className="form-group-wire">
                <label>Select Room / Device</label>
                <select 
                  value={bookingRoom}
                  onChange={(e) => setBookingRoom(e.target.value)}
                >
                  <option value="Room B2">Room B2 (Conference Room)</option>
                  <option value="Server Room A">Server Room A (Access)</option>
                  <option value="Projector AF-0062">Projector AF-0062</option>
                  <option value="Development Lab 3">Development Lab 3</option>
                </select>
              </div>
              <div className="form-group-wire">
                <label>Time Slot</label>
                <input 
                  type="text" 
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions-wire">
                <button type="button" className="modal-btn-cancel" onClick={() => setShowBookingModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn-submit">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Raise Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay-wire">
          <div className="modal-card-wire">
            <div className="modal-header-wire">
              <h3>Raise Maintenance / Transfer Request</h3>
              <button className="modal-close-wire" onClick={() => setShowRequestModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRaiseRequest} className="modal-form-wire">
              <div className="form-group-wire">
                <label>Describe Request / Issue</label>
                <textarea 
                  rows="3"
                  placeholder="e.g. Laptop charger replacement or request room access keys..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="modal-actions-wire">
                <button type="button" className="modal-btn-cancel" onClick={() => setShowRequestModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn-submit">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
