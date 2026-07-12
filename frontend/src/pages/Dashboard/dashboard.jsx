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
  X,
  Edit2,
  Trash2
} from 'lucide-react'
import './dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Organization setup')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  
  // Organization tab states
  const [orgTab, setOrgTab] = useState('Departments')
  const [showAddOrgModal, setShowAddOrgModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null) // null for adding, index for editing

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

  // Lists state for Organization setup matching wireframe
  const [departments, setDepartments] = useState([
    { name: 'Engineering', head: 'aditi rao', parent: '--', status: 'Active' },
    { name: 'Facilities', head: 'rohan mehta', parent: '--', status: 'Active' },
    { name: 'Field ops (east)', head: 'sana iqbal', parent: 'Field Ops', status: 'Inactive' }
  ])

  const [categories, setCategories] = useState([
    { name: 'Compute', code: 'CMP', desc: 'Servers and workstations', status: 'Active' },
    { name: 'Networking', code: 'NET', desc: 'Switches and routers', status: 'Active' },
    { name: 'Storage', code: 'STR', desc: 'Hard drives and NAS', status: 'Active' }
  ])

  const [employees, setEmployees] = useState([
    { name: 'Priya Shah', email: 'priya.shah@company.com', dept: 'IT Operations', status: 'Active' },
    { name: 'Marcus V.', email: 'marcus.v@company.com', dept: 'Facilities', status: 'Active' },
    { name: 'Alex Chen', email: 'alex.chen@company.com', dept: 'Engineering', status: 'Active' }
  ])

  // Form states for dashboard modals
  const [newAssetName, setNewAssetName] = useState('')
  const [newAssetTag, setNewAssetTag] = useState('')
  const [bookingRoom, setBookingRoom] = useState('Room B2')
  const [bookingTime, setBookingTime] = useState('2:00 to 3:00 PM')
  const [requestText, setRequestText] = useState('')

  // Form states for Organization modals
  const [orgName, setOrgName] = useState('')
  const [orgHead, setOrgHead] = useState('')
  const [orgParent, setOrgParent] = useState('--')
  const [orgCode, setOrgCode] = useState('')
  const [orgDesc, setOrgDesc] = useState('')
  const [orgEmail, setOrgEmail] = useState('')
  const [orgDept, setOrgDept] = useState('Engineering')
  const [orgStatus, setOrgStatus] = useState('Active')

  // Handle register asset submission
  const handleRegisterAsset = (e) => {
    e.preventDefault()
    if (!newAssetName || !newAssetTag) return
    
    setStats(prev => ({ ...prev, available: prev.available + 1 }))
    
    const newAct = {
      id: Date.now(),
      text: `${newAssetName} (${newAssetTag}) - registered successfully in system`,
      time: 'Just now',
      type: 'allocation'
    }
    setActivities([newAct, ...activities])
    
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

  // Add/Edit Organization handlers
  const handleOpenAddOrg = () => {
    setEditingIndex(null)
    setOrgName('')
    setOrgHead('')
    setOrgParent('--')
    setOrgCode('')
    setOrgDesc('')
    setOrgEmail('')
    setOrgDept('Engineering')
    setOrgStatus('Active')
    setShowAddOrgModal(true)
  }

  const handleEditDept = (index) => {
    const d = departments[index]
    setEditingIndex(index)
    setOrgName(d.name)
    setOrgHead(d.head)
    setOrgParent(d.parent)
    setOrgStatus(d.status)
    setShowAddOrgModal(true)
  }

  const handleDeleteDept = (index) => {
    setDepartments(departments.filter((_, i) => i !== index))
  }

  const handleEditCat = (index) => {
    const c = categories[index]
    setEditingIndex(index)
    setOrgName(c.name)
    setOrgCode(c.code)
    setOrgDesc(c.desc)
    setOrgStatus(c.status)
    setShowAddOrgModal(true)
  }

  const handleDeleteCat = (index) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const handleEditEmp = (index) => {
    const e = employees[index]
    setEditingIndex(index)
    setOrgName(e.name)
    setOrgEmail(e.email)
    setOrgDept(e.dept)
    setOrgStatus(e.status)
    setShowAddOrgModal(true)
  }

  const handleDeleteEmp = (index) => {
    setEmployees(employees.filter((_, i) => i !== index))
  }

  const handleSaveOrg = (e) => {
    e.preventDefault()
    if (orgTab === 'Departments') {
      const newDept = { name: orgName, head: orgHead, parent: orgParent, status: orgStatus }
      if (editingIndex !== null) {
        setDepartments(departments.map((d, i) => i === editingIndex ? newDept : d))
      } else {
        setDepartments([...departments, newDept])
      }
    } else if (orgTab === 'Categories') {
      const newCat = { name: orgName, code: orgCode, desc: orgDesc, status: orgStatus }
      if (editingIndex !== null) {
        setCategories(categories.map((c, i) => i === editingIndex ? newCat : c))
      } else {
        setCategories([...categories, newCat])
      }
    } else if (orgTab === 'Employee') {
      const newEmp = { name: orgName, email: orgEmail, dept: orgDept, status: orgStatus }
      if (editingIndex !== null) {
        setEmployees(employees.map((emp, i) => i === editingIndex ? newEmp : emp))
      } else {
        setEmployees([...employees, newEmp])
      }
    }
    setShowAddOrgModal(false)
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
          ) : activeMenu === 'Organization setup' ? (
            <div className="org-setup-view-container">
              {/* Sub-tab switcher bar matching hand-drawn wireframe */}
              <div className="org-tabs-header-bar">
                <div className="org-tabs-left-side">
                  <button
                    className={`org-tab-toggle-btn ${orgTab === 'Departments' ? 'active' : ''}`}
                    onClick={() => setOrgTab('Departments')}
                  >
                    Departments
                  </button>
                  <button
                    className={`org-tab-toggle-btn ${orgTab === 'Categories' ? 'active' : ''}`}
                    onClick={() => setOrgTab('Categories')}
                  >
                    Categories
                  </button>
                  <button
                    className={`org-tab-toggle-btn ${orgTab === 'Employee' ? 'active' : ''}`}
                    onClick={() => setOrgTab('Employee')}
                  >
                    Employee
                  </button>
                </div>
                <button className="org-add-new-action-btn" onClick={handleOpenAddOrg}>
                  + Add
                </button>
              </div>

              {/* Departments tab content matching wireframe */}
              {orgTab === 'Departments' && (
                <div className="org-table-responsive-wrapper">
                  <table className="org-data-table-wire">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Head</th>
                        <th>Parent Dept</th>
                        <th>Status</th>
                        <th className="action-col-wire">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.map((dept, index) => (
                        <tr key={index}>
                          <td className="font-semibold-wire">{dept.name}</td>
                          <td className="text-muted-wire">{dept.head}</td>
                          <td className="text-muted-wire">{dept.parent}</td>
                          <td>
                            <span className={`org-status-oval ${dept.status.toLowerCase()}`}>
                              {dept.status}
                            </span>
                          </td>
                          <td className="action-col-wire">
                            <button className="org-row-btn edit" onClick={() => handleEditDept(index)}>
                              <Edit2 size={13} />
                            </button>
                            <button className="org-row-btn delete" onClick={() => handleDeleteDept(index)}>
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Categories tab content */}
              {orgTab === 'Categories' && (
                <div className="org-table-responsive-wrapper">
                  <table className="org-data-table-wire">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th className="action-col-wire">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat, index) => (
                        <tr key={index}>
                          <td className="font-semibold-wire">{cat.name}</td>
                          <td className="text-muted-wire">{cat.code}</td>
                          <td className="text-muted-wire">{cat.desc}</td>
                          <td>
                            <span className={`org-status-oval ${cat.status.toLowerCase()}`}>
                              {cat.status}
                            </span>
                          </td>
                          <td className="action-col-wire">
                            <button className="org-row-btn edit" onClick={() => handleEditCat(index)}>
                              <Edit2 size={13} />
                            </button>
                            <button className="org-row-btn delete" onClick={() => handleDeleteCat(index)}>
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Employee tab content */}
              {orgTab === 'Employee' && (
                <div className="org-table-responsive-wrapper">
                  <table className="org-data-table-wire">
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th className="action-col-wire">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, index) => (
                        <tr key={index}>
                          <td className="font-semibold-wire">{emp.name}</td>
                          <td className="text-muted-wire">{emp.email}</td>
                          <td className="text-muted-wire">{emp.dept}</td>
                          <td>
                            <span className={`org-status-oval ${emp.status.toLowerCase()}`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="action-col-wire">
                            <button className="org-row-btn edit" onClick={() => handleEditEmp(index)}>
                              <Edit2 size={13} />
                            </button>
                            <button className="org-row-btn delete" onClick={() => handleDeleteEmp(index)}>
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Divider and note matching the hand-drawn wireframe */}
              <div className="org-horizontal-divider"></div>
              <p className="org-setup-footer-note">
                Editing a department here also drives the picklist in Screen 4 & 5
              </p>
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

      {/* Add / Edit Org Modal */}
      {showAddOrgModal && (
        <div className="modal-overlay-wire">
          <div className="modal-card-wire">
            <div className="modal-header-wire">
              <h3>{editingIndex !== null ? 'Modify' : 'Create'} {orgTab.slice(0, -1) || orgTab} Record</h3>
              <button className="modal-close-wire" onClick={() => setShowAddOrgModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveOrg} className="modal-form-wire">
              
              {/* Dynamic form fields depending on which Tab is active */}
              
              {orgTab === 'Departments' && (
                <>
                  <div className="form-group-wire">
                    <label>Department Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. HR Division"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Head of Department</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={orgHead}
                      onChange={(e) => setOrgHead(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Parent Department</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Operations Group or --"
                      value={orgParent}
                      onChange={(e) => setOrgParent(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {orgTab === 'Categories' && (
                <>
                  <div className="form-group-wire">
                    <label>Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Smart Devices"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Category Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. SDEV"
                      value={orgCode}
                      onChange={(e) => setOrgCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mobile tablets, corporate cells..."
                      value={orgDesc}
                      onChange={(e) => setOrgDesc(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {orgTab === 'Employee' && (
                <>
                  <div className="form-group-wire">
                    <label>Employee Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Jane Doe"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane.doe@company.com"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-wire">
                    <label>Department Selection</label>
                    <select
                      value={orgDept}
                      onChange={(e) => setOrgDept(e.target.value)}
                    >
                      {departments.map((d, i) => (
                        <option key={i} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="form-group-wire">
                <label>Operational Status</label>
                <select 
                  value={orgStatus}
                  onChange={(e) => setOrgStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions-wire">
                <button type="button" className="modal-btn-cancel" onClick={() => setShowAddOrgModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn-submit">
                  {editingIndex !== null ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
