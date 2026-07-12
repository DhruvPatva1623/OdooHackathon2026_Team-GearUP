import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  X,
  Database,
  Sliders
} from 'lucide-react'
import './dashboard.css'

// Initial mock assets
const INITIAL_ASSETS = [
  { id: 'AST-001', name: 'Server Node Alpha', type: 'Compute', status: 'Operational', value: 12500, location: 'Rack A-12', updated: '2 hrs ago' },
  { id: 'AST-002', name: 'Core Switch 400G', type: 'Networking', status: 'Operational', value: 8700, location: 'Rack B-03', updated: '1 day ago' },
  { id: 'AST-003', name: 'Dev Workstation 12', type: 'Hardware', status: 'Maintenance', value: 2400, location: 'Floor 3 - Desk 42', updated: '10 mins ago' },
  { id: 'AST-004', name: 'Kubernetes Cluster B', type: 'Compute', status: 'Operational', value: 45000, location: 'AWS cloud-east', updated: '5 mins ago' },
  { id: 'AST-005', name: 'Corporate NAS Storage', type: 'Storage', status: 'Offline', value: 16200, location: 'Rack A-05', updated: '3 hrs ago' },
  { id: 'AST-006', name: 'Backup UPS Unit', type: 'Hardware', status: 'Operational', value: 3100, location: 'Power Room 1', updated: '2 days ago' },
]

export default function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Overview')
  const [assets, setAssets] = useState(INITIAL_ASSETS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState(null)
  
  // Form fields
  const [formName, setFormName] = useState('')
  const [formType, setFormType] = useState('Compute')
  const [formStatus, setFormStatus] = useState('Operational')
  const [formValue, setFormValue] = useState('')
  const [formLocation, setFormLocation] = useState('')

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingAsset(null)
    setFormName('')
    setFormType('Compute')
    setFormStatus('Operational')
    setFormValue('')
    setFormLocation('')
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleOpenEditModal = (asset) => {
    setEditingAsset(asset)
    setFormName(asset.name)
    setFormType(asset.type)
    setFormStatus(asset.status)
    setFormValue(asset.value)
    setFormLocation(asset.location)
    setIsModalOpen(true)
  }

  // Save asset (create/update)
  const handleSaveAsset = (e) => {
    e.preventDefault()
    if (!formName || !formValue) return

    if (editingAsset) {
      // Update
      setAssets(assets.map(a => a.id === editingAsset.id ? {
        ...a,
        name: formName,
        type: formType,
        status: formStatus,
        value: Number(formValue),
        location: formLocation,
        updated: 'Just now'
      } : a))
    } else {
      // Create
      const newId = `AST-00${assets.length + 1}`
      const newAsset = {
        id: newId,
        name: formName,
        type: formType,
        status: formStatus,
        value: Number(formValue),
        location: formLocation,
        updated: 'Just now'
      }
      setAssets([newAsset, ...assets])
    }
    setIsModalOpen(false)
  }

  // Delete asset
  const handleDeleteAsset = (id) => {
    setAssets(assets.filter(a => a.id !== id))
  }

  // Statistics calculation
  const totalAssetsCount = assets.length
  const totalValue = assets.reduce((sum, item) => sum + item.value, 0)
  const activeCount = assets.filter(a => a.status === 'Operational').length
  const maintenanceCount = assets.filter(a => a.status === 'Maintenance').length
  const offlineCount = assets.filter(a => a.status === 'Offline').length

  // Filtered assets for list view
  const filteredAssets = assets.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass">
        <div className="sidebar-logo">
          <div className="logo-small-icon">AF</div>
          <h2>ASSETFLOW</h2>
        </div>
        
        <ul className="sidebar-menu">
          <li 
            className={`menu-item ${activeMenu === 'Overview' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Overview')}
          >
            <LayoutDashboard size={18} />
            Overview
          </li>
          <li 
            className={`menu-item ${activeMenu === 'Assets' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Assets')}
          >
            <Server size={18} />
            Assets Catalog
          </li>
          <li 
            className={`menu-item ${activeMenu === 'System' ? 'active' : ''}`}
            onClick={() => setActiveMenu('System')}
          >
            <Activity size={18} />
            System Health
          </li>
          <li 
            className={`menu-item ${activeMenu === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Settings')}
          >
            <Settings size={18} />
            Settings
          </li>
        </ul>

        {/* User Card */}
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD'}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'John Doe'}</div>
            <div className="user-role">{user?.department || 'IT Operations'}</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main dashboard panel */}
      <main className="dashboard-main">
        {/* Header bar */}
        <header className="dashboard-header">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700' }}>
              {activeMenu === 'Overview' && 'Enterprise Overview'}
              {activeMenu === 'Assets' && 'Assets Catalog'}
              {activeMenu === 'System' && 'Live System Monitor'}
              {activeMenu === 'Settings' && 'System Preferences'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>
              Welcome back, {user?.name || 'User'} • Standard corporate authorization.
            </p>
          </div>

          <div className="header-actions">
            {activeMenu === 'Assets' && (
              <div className="header-search">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search assets, ID, rack location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <button className="action-btn" title="System Alerts">
              <Activity size={16} />
              {offlineCount > 0 && <span className="badge-dot"></span>}
            </button>

            <button className="create-asset-btn" onClick={handleOpenAddModal}>
              <Plus size={16} />
              Register Asset
            </button>
          </div>
        </header>

        {/* View Switcher Content */}
        <div className="dashboard-content">
          
          {activeMenu === 'Overview' && (
            <>
              {/* Stat grid */}
              <div className="stats-grid">
                <div className="stat-card glass">
                  <div className="stat-header">
                    <span className="stat-title">Total Portfolio Value</span>
                    <div className="stat-icon-wrapper purple">
                      <TrendingUp size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{formatCurrency(totalValue)}</div>
                  <div className="stat-trend up">
                    <span>+12.4%</span>
                    <span className="stat-trend-text">from last quarter</span>
                  </div>
                </div>

                <div className="stat-card glass">
                  <div className="stat-header">
                    <span className="stat-title">Operational Assets</span>
                    <div className="stat-icon-wrapper green">
                      <CheckCircle size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{activeCount} / {totalAssetsCount}</div>
                  <div className="stat-trend up">
                    <span>94.2%</span>
                    <span className="stat-trend-text">system availability</span>
                  </div>
                </div>

                <div className="stat-card glass">
                  <div className="stat-header">
                    <span className="stat-title">In Maintenance</span>
                    <div className="stat-icon-wrapper amber">
                      <AlertTriangle size={20} />
                    </div>
                  </div>
                  <div className="stat-value">{maintenanceCount}</div>
                  <div className="stat-trend">
                    <span style={{ color: 'var(--warning)' }}>2 Pending</span>
                    <span className="stat-trend-text">routine schedules</span>
                  </div>
                </div>

                <div className="stat-card glass">
                  <div className="stat-header">
                    <span className="stat-title">Offline Incidents</span>
                    <div className="stat-icon-wrapper">
                      <XCircle size={20} style={{ color: offlineCount > 0 ? 'var(--danger)' : 'var(--text-dark)' }} />
                    </div>
                  </div>
                  <div className="stat-value" style={{ color: offlineCount > 0 ? 'var(--danger)' : 'var(--text-main)' }}>{offlineCount}</div>
                  <div className="stat-trend">
                    <span style={{ color: offlineCount > 0 ? 'var(--danger)' : 'var(--text-dark)' }}>
                      {offlineCount > 0 ? 'Urgent attention required' : 'System healthy'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Charts grid */}
              <div className="charts-grid">
                {/* Value over time SVG chart */}
                <div className="chart-card glass">
                  <div className="chart-title-block">
                    <div>
                      <h3>Asset Valuation Trend</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Valuation curves over the past 6 months</p>
                    </div>
                    <div className="chart-filters">
                      <button className="chart-filter-btn active">6 Months</button>
                      <button className="chart-filter-btn">1 Year</button>
                    </div>
                  </div>
                  <div className="chart-body">
                    {/* SVG Interactive Line Chart */}
                    <svg className="chart-svg" viewBox="0 0 500 240">
                      <defs>
                        <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--primary)" />
                          <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--bg-card)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <line x1="40" y1="40" x2="480" y2="40" className="chart-grid-line" />
                      <line x1="40" y1="100" x2="480" y2="100" className="chart-grid-line" />
                      <line x1="40" y1="160" x2="480" y2="160" className="chart-grid-line" />
                      <line x1="40" y1="210" x2="480" y2="210" className="chart-grid-line" />
                      
                      {/* X and Y Axis text */}
                      <text x="15" y="45" fill="var(--text-dark)" fontSize="10">80K</text>
                      <text x="15" y="105" fill="var(--text-dark)" fontSize="10">50K</text>
                      <text x="15" y="165" fill="var(--text-dark)" fontSize="10">20K</text>
                      
                      <text x="50" y="230" fill="var(--text-dark)" fontSize="10">Jan</text>
                      <text x="130" y="230" fill="var(--text-dark)" fontSize="10">Feb</text>
                      <text x="210" y="230" fill="var(--text-dark)" fontSize="10">Mar</text>
                      <text x="290" y="230" fill="var(--text-dark)" fontSize="10">Apr</text>
                      <text x="370" y="230" fill="var(--text-dark)" fontSize="10">May</text>
                      <text x="450" y="230" fill="var(--text-dark)" fontSize="10">Jun</text>

                      {/* Area and Line Path */}
                      <path d="M 50 180 L 130 160 L 210 130 L 290 100 L 370 70 L 450 50 L 450 210 L 50 210 Z" className="chart-area" />
                      <path d="M 50 180 Q 130 160 210 130 T 290 100 T 370 70 T 450 50" className="chart-line" />

                      {/* Dots on line */}
                      <circle cx="50" cy="180" r="4" className="chart-dot" />
                      <circle cx="130" cy="160" r="4" className="chart-dot" />
                      <circle cx="210" cy="130" r="4" className="chart-dot" />
                      <circle cx="290" cy="100" r="4" className="chart-dot" />
                      <circle cx="370" cy="70" r="4" className="chart-dot" />
                      <circle cx="450" cy="50" r="4" className="chart-dot" />
                    </svg>
                  </div>
                </div>

                {/* Resource Category distribution */}
                <div className="chart-card glass">
                  <div className="chart-title-block">
                    <div>
                      <h3>Asset Categories</h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Portfolio allocation distribution</p>
                    </div>
                  </div>
                  
                  <div className="donut-container">
                    <svg className="donut-svg" viewBox="0 0 42 42">
                      <circle className="donut-bg-ring" cx="21" cy="21" r="15.915" />
                      {/* Segment 1: Compute (50%) */}
                      <circle 
                        className="donut-segment p1" 
                        cx="21" 
                        cy="21" 
                        r="15.915" 
                        strokeDasharray="50 100" 
                        strokeDashoffset="0"
                      />
                      {/* Segment 2: Networking (30%) */}
                      <circle 
                        className="donut-segment p2" 
                        cx="21" 
                        cy="21" 
                        r="15.915" 
                        strokeDasharray="30 100" 
                        strokeDashoffset="-50"
                      />
                      {/* Segment 3: Hardware/Storage (20%) */}
                      <circle 
                        className="donut-segment p3" 
                        cx="21" 
                        cy="21" 
                        r="15.915" 
                        strokeDasharray="20 100" 
                        strokeDashoffset="-80"
                      />
                    </svg>
                    <div className="donut-center-text">
                      <div className="donut-center-num">3</div>
                      <div className="donut-center-lbl">Categories</div>
                    </div>
                  </div>

                  <div className="donut-legend">
                    <div className="legend-item">
                      <div className="legend-label-group">
                        <span className="legend-dot p1"></span>
                        <span>Compute</span>
                      </div>
                      <span className="legend-val">50%</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-label-group">
                        <span className="legend-dot p2"></span>
                        <span>Networking</span>
                      </div>
                      <span className="legend-val">30%</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-label-group">
                        <span className="legend-dot p3"></span>
                        <span>Storage & Hardware</span>
                      </div>
                      <span className="legend-val">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMenu === 'Assets' && (
            <div className="table-card glass">
              <div className="table-header-row">
                <h3>Registered Resources</h3>
                <div className="table-controls">
                  <select 
                    className="table-select" 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Operational">Operational</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              {filteredAssets.length === 0 ? (
                <div className="empty-state">
                  <Database size={48} className="empty-state-icon" />
                  <p>No matching resources found</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-dark)', marginTop: '4px' }}>
                    Try adjusting your search criteria or register a new asset.
                  </p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="assets-table">
                    <thead>
                      <tr>
                        <th>Asset Details</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Valuation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map(asset => (
                        <tr key={asset.id}>
                          <td>
                            <div className="asset-name-cell">
                              <div className="asset-icon-cube">
                                <Database size={16} />
                              </div>
                              <div>
                                <div className="asset-title">{asset.name}</div>
                                <div className="asset-tag">{asset.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{asset.type}</td>
                          <td>{asset.location}</td>
                          <td>
                            <span className={`status-badge ${asset.status.toLowerCase()}`}>
                              <span className="badge-pulse"></span>
                              {asset.status}
                            </span>
                          </td>
                          <td style={{ fontWeight: '600' }}>{formatCurrency(asset.value)}</td>
                          <td>
                            <div className="row-actions">
                              <button 
                                className="row-action-btn" 
                                title="Edit Asset"
                                onClick={() => handleOpenEditModal(asset)}
                              >
                                <Edit3 size={14} />
                              </button>
                              <button 
                                className="row-action-btn delete" 
                                title="Delete Asset"
                                onClick={() => handleDeleteAsset(asset.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeMenu === 'System' && (
            <div className="table-card glass" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <Activity size={48} style={{ color: 'var(--secondary)', marginBottom: '16px' }} />
              <h3>Live Telemetry Connected</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px', maxWidth: '400px', margin: '8px auto 0' }}>
                AssetFlow system agents are active. Sub-second telemetry loops are reporting metrics on 12 physical nodes.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '32px' }}>
                <div style={{ padding: '16px 24px', background: 'var(--bg-input)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Avg CPU Load</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px', color: 'var(--success)' }}>18.4%</div>
                </div>
                <div style={{ padding: '16px 24px', background: 'var(--bg-input)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Memory Pools</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px', color: 'var(--success)' }}>42.8 GB</div>
                </div>
                <div style={{ padding: '16px 24px', background: 'var(--bg-input)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Network IO</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px', color: 'var(--secondary)' }}>2.4 Gb/s</div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'Settings' && (
            <div className="table-card glass">
              <h3 style={{ marginBottom: '16px' }}>System Preferences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>Notifications Trigger</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Send critical alert email when an asset marks offline status.</p>
                </div>
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>API Telemetry Key</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Authenticates external monitoring nodes.</p>
                  <code style={{ background: 'var(--bg-input)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', border: '1px solid var(--border-color)', display: 'inline-block' }}>
                    tok_live_8a3f9e218c39abfd
                  </code>
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>Organization Unit</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Assigned division for AssetFlow operations.</p>
                  <span style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid var(--primary)', color: '#c084fc', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
                    GLOBAL OPERATIONS GROUP B
                  </span>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>

      {/* Register / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card glass">
            <div className="modal-header">
              <h3>{editingAsset ? 'Edit Asset Record' : 'Register Corporate Asset'}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveAsset}>
              <div className="form-group">
                <label>Resource Name</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder="e.g. Storage Server C" 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    style={{ paddingLeft: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <div className="input-container">
                    <select 
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      style={{ paddingLeft: '14px' }}
                    >
                      <option value="Compute">Compute</option>
                      <option value="Networking">Networking</option>
                      <option value="Storage">Storage</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Initial Status</label>
                  <div className="input-container">
                    <select 
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      style={{ paddingLeft: '14px' }}
                    >
                      <option value="Operational">Operational</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Valuation (USD)</label>
                <div className="input-container">
                  <input 
                    type="number" 
                    placeholder="12000" 
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    required
                    style={{ paddingLeft: '14px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Storage / Rack Location</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    placeholder="e.g. Rack A-12 or floor/room" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    style={{ paddingLeft: '14px' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="create-asset-btn">
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
