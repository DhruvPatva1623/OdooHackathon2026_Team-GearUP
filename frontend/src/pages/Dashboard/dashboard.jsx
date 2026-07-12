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
  Trash2,
  Clock,
  Check,
  ClipboardList,
  Download,
  Loader2
} from 'lucide-react'
import './dashboard.css'

export default function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('Reports')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  
  // Organization tab states
  const [orgTab, setOrgTab] = useState('Departments')
  const [showAddOrgModal, setShowAddOrgModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null) // null for adding, index for editing

  // Resource Booking states
  const [selectedResource, setSelectedResource] = useState('Conference room B2 - Tue, 7 Jul')
  const [showNewBookingModal, setShowNewBookingModal] = useState(false)

  // Booking list for the calendar timeline
  const [bookings, setBookings] = useState([
    {
      id: 1,
      resource: 'Conference room B2 - Tue, 7 Jul',
      team: 'Procurement Team',
      start: '9:00',
      end: '10:00',
      type: 'confirmed',
      text: 'Booked - Procurement Team - 9 to 10'
    },
    {
      id: 2,
      resource: 'Conference room B2 - Tue, 7 Jul',
      team: 'Engineering Team',
      start: '9:30',
      end: '10:30',
      type: 'conflict',
      text: 'Requested 9:30 to 10:30 - conflict - slot is unavailable'
    }
  ])

  // New booking form fields
  const [bookingStartTime, setBookingStartTime] = useState('11:00')
  const [bookingEndTime, setBookingEndTime] = useState('12:00')
  const [bookingTeamName, setBookingTeamName] = useState('Operations Team')

  // Screen 8 Asset Audit states
  const [auditCycleClosed, setAuditCycleClosed] = useState(false)
  const [auditAssets, setAuditAssets] = useState([
    { id: 'AF-003', name: 'AF-003 Dell laptop', location: 'Desk E12', verification: 'Verified' },
    { id: 'AF-9921', name: 'AF-9921 Office chair', location: 'Desk E14', verification: 'Missing' },
    { id: 'AF-9838', name: 'AF-9838 Monitor', location: 'Desk E15', verification: 'Damaged' }
  ])

  // Screen 9 Reports states
  const [exportingReport, setExportingReport] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

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

  // Handle timeline slot booking
  const handleCreateTimelineBooking = (e) => {
    e.preventDefault()
    const hasConflict = 
      (bookingStartTime >= '09:00' && bookingStartTime < '10:00') ||
      (bookingEndTime > '09:00' && bookingEndTime <= '10:00') ||
      (bookingStartTime <= '09:00' && bookingEndTime >= '10:00');

    const newBooking = {
      id: Date.now(),
      resource: selectedResource,
      team: bookingTeamName,
      start: bookingStartTime,
      end: bookingEndTime,
      type: hasConflict ? 'conflict' : 'confirmed',
      text: hasConflict 
        ? `Requested ${bookingStartTime} to ${bookingEndTime} - conflict - slot is unavailable`
        : `Booked - ${bookingTeamName} - ${bookingStartTime.replace(':00', '')} to ${bookingEndTime.replace(':00', '')}`
    }

    setBookings([...bookings, newBooking])
    const newAct = {
      id: Date.now(),
      text: hasConflict
        ? `Booking conflict detected for ${bookingStartTime} to ${bookingEndTime}`
        : `Resource booking confirmed for ${bookingTeamName}`,
      time: 'Just now',
      type: hasConflict ? 'maintenance' : 'booking'
    }
    setActivities([newAct, ...activities])
    setShowNewBookingModal(false)
  }

  // Toggle Verification status for interactive checklist
  const handleToggleVerification = (id) => {
    if (auditCycleClosed) return
    setAuditAssets(auditAssets.map(asset => {
      if (asset.id === id) {
        let nextStatus = 'Verified'
        if (asset.verification === 'Verified') nextStatus = 'Missing'
        else if (asset.verification === 'Missing') nextStatus = 'Damaged'
        return { ...asset, verification: nextStatus }
      }
      return asset
    }))
  }

  // Calculate discrepancy count
  const discrepancyCount = auditAssets.filter(
    a => a.verification === 'Missing' || a.verification === 'Damaged'
  ).length

  // Handle close audit cycle
  const handleCloseAuditCycle = () => {
    setAuditCycleClosed(true)
    const newAct = {
      id: Date.now(),
      text: `Q3 Audit Cycle Closed with ${discrepancyCount} discrepancies flagged`,
      time: 'Just now',
      type: 'maintenance'
    }
    setActivities([newAct, ...activities])
  }

  // Handle export report simulation
  const handleExportReportAction = () => {
    setExportingReport(true)
    setExportSuccess(false)
    
    setTimeout(() => {
      setExportingReport(false)
      setExportSuccess(true)
      
      const newAct = {
        id: Date.now(),
        text: `Exported system reports: utilization and maintenance audit.pdf`,
        time: 'Just now',
        type: 'allocation'
      }
      setActivities([newAct, ...activities])

      // Clear success banner after 4s
      setTimeout(() => setExportSuccess(false), 4000)
    }, 2000)
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
          ) : activeMenu === 'Resource Booking' ? (
            <div className="resource-booking-view-container">
              {/* Resource Select dropdown matching slide 6 */}
              <div className="booking-resource-picker-row">
                <label className="booking-picker-label">Resource</label>
                <div className="booking-select-wrapper">
                  <select
                    value={selectedResource}
                    onChange={(e) => setSelectedResource(e.target.value)}
                    className="booking-resource-select-box"
                  >
                    <option value="Conference room B2 - Tue, 7 Jul">Conference room B2 - Tue, 7 Jul</option>
                    <option value="Server Room A - Tue, 7 Jul">Server Room A - Tue, 7 Jul</option>
                    <option value="Projector AF-0062 - Tue, 7 Jul">Projector AF-0062 - Tue, 7 Jul</option>
                  </select>
                </div>
              </div>

              {/* Schedule Timeline Grid */}
              <div className="booking-timeline-board">
                
                {/* 9:00 Slot Row */}
                <div className="timeline-slot-row">
                  <div className="timeline-hour-col">9:00</div>
                  <div className="timeline-card-col">
                    {bookings
                      .filter(b => b.resource === selectedResource && b.start === '9:00' && b.type === 'confirmed')
                      .map(b => (
                        <div key={b.id} className="timeline-booking-block confirmed">
                          <span className="booking-block-text">{b.text}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Overlapping Conflict Indicator (Dashed red box 9:30 to 10:30) */}
                <div className="timeline-slot-row">
                  <div className="timeline-hour-col">10:00</div>
                  <div className="timeline-card-col relative-col">
                    {bookings
                      .filter(b => b.resource === selectedResource && b.type === 'conflict')
                      .map(b => (
                        <div key={b.id} className="timeline-booking-block conflict-dashed">
                          <AlertTriangle size={14} className="conflict-block-icon" />
                          <span className="booking-block-text">{b.text}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 11:00 Slot Row */}
                <div className="timeline-slot-row">
                  <div className="timeline-hour-col">11:00</div>
                  <div className="timeline-card-col">
                    {bookings
                      .filter(b => b.resource === selectedResource && b.start === '11:00' && b.type === 'confirmed')
                      .map(b => (
                        <div key={b.id} className="timeline-booking-block confirmed">
                          <span className="booking-block-text">{b.text}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 12:00 Slot Row */}
                <div className="timeline-slot-row">
                  <div className="timeline-hour-col">12:00</div>
                  <div className="timeline-card-col">
                    {bookings
                      .filter(b => b.resource === selectedResource && b.start === '12:00' && b.type === 'confirmed')
                      .map(b => (
                        <div key={b.id} className="timeline-booking-block confirmed">
                          <span className="booking-block-text">{b.text}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 1:00 Slot Row */}
                <div className="timeline-slot-row">
                  <div className="timeline-hour-col">1:00</div>
                  <div className="timeline-card-col">
                    {bookings
                      .filter(b => b.resource === selectedResource && b.start === '13:00' && b.type === 'confirmed')
                      .map(b => (
                        <div key={b.id} className="timeline-booking-block confirmed">
                          <span className="booking-block-text">{b.text}</span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

              {/* Book a slot bottom action button */}
              <div className="booking-footer-action-row">
                <button
                  className="booking-primary-action-btn"
                  onClick={() => setShowNewBookingModal(true)}
                >
                  Book a slot
                </button>
              </div>
            </div>
          ) : activeMenu === 'Audit' ? (
            <div className="audit-view-container">
              {/* Q3 audit cycle info box matching Screen 8 */}
              <div className="audit-cycle-info-box">
                <div className="audit-cycle-title">Q3 audit: Engineering dept - 1-15 jul</div>
                <div className="audit-cycle-auditors">Auditors: A. Rao, S. Iqbal</div>
              </div>

              {/* Verification Checklist Table */}
              <div className="audit-table-responsive-wrapper">
                <table className="audit-data-table-wire">
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Expected location</th>
                      <th className="verification-col-header">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditAssets.map((asset) => (
                      <tr key={asset.id}>
                        <td className="font-semibold-wire">{asset.name}</td>
                        <td className="text-muted-wire">{asset.location}</td>
                        <td className="verification-cell-wire">
                          <button
                            type="button"
                            className={`audit-status-oval ${asset.verification.toLowerCase()}`}
                            onClick={() => handleToggleVerification(asset.id)}
                            title="Click to toggle status (Verified -> Missing -> Damaged)"
                            disabled={auditCycleClosed}
                          >
                            {asset.verification}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Divider and Alert Banner */}
              <div className="audit-horizontal-divider"></div>
              
              {!auditCycleClosed ? (
                <>
                  {discrepancyCount > 0 ? (
                    <div className="discrepancy-banner-alert">
                      <AlertTriangle size={18} className="alert-banner-icon" />
                      <span className="alert-banner-text">
                        {discrepancyCount} assets flagged - discrepancy report generated automatically
                      </span>
                    </div>
                  ) : (
                    <div className="discrepancy-banner-alert success-theme">
                      <CheckCircle size={18} className="alert-banner-icon success-theme" />
                      <span className="alert-banner-text">
                        No discrepancies flagged - system verified
                      </span>
                    </div>
                  )}

                  {/* Close Audit Cycle button */}
                  <div className="audit-footer-action-row">
                    <button
                      className="audit-primary-action-btn"
                      onClick={handleCloseAuditCycle}
                    >
                      Close audit cycle
                    </button>
                  </div>
                </>
              ) : (
                <div className="discrepancy-banner-alert closed-theme">
                  <CheckCircle size={18} className="alert-banner-icon closed-theme" />
                  <span className="alert-banner-text">
                    Audit Cycle Closed Successfully - {discrepancyCount} discrepancies recorded in discrepancy report
                  </span>
                </div>
              )}

            </div>
          ) : activeMenu === 'Reports' ? (
            <div className="reports-view-container">
              {/* Row of Two Charts matching Screen 9 */}
              <div className="reports-charts-row-grid">
                
                {/* Left Chart: Utilization by department */}
                <div className="report-chart-card">
                  <h4 className="report-chart-title">Utilization by department</h4>
                  <div className="report-chart-svg-wrapper">
                    <svg viewBox="0 0 240 120" className="report-vector-svg">
                      {/* Grid baseline */}
                      <line x1="20" y1="100" x2="220" y2="100" stroke="#cbd5e1" strokeWidth="1.2" />
                      {/* Department Bars */}
                      {/* Bar 1 */}
                      <rect x="35" y="60" width="16" height="40" rx="3" fill="#3e322a" stroke="#5c4a3e" strokeWidth="1" className="animated-bar-1" />
                      {/* Bar 2 */}
                      <rect x="75" y="40" width="16" height="60" rx="3" fill="#3e322a" stroke="#5c4a3e" strokeWidth="1" className="animated-bar-2" />
                      {/* Bar 3 */}
                      <rect x="115" y="25" width="16" height="75" rx="3" fill="#3e322a" stroke="#5c4a3e" strokeWidth="1" className="animated-bar-3" />
                      {/* Bar 4 */}
                      <rect x="155" y="50" width="16" height="50" rx="3" fill="#3e322a" stroke="#5c4a3e" strokeWidth="1" className="animated-bar-4" />
                      {/* Bar 5 */}
                      <rect x="195" y="35" width="16" height="65" rx="3" fill="#3e322a" stroke="#5c4a3e" strokeWidth="1" className="animated-bar-5" />
                    </svg>
                  </div>
                </div>

                {/* Right Chart: Maintenance Frequency */}
                <div className="report-chart-card">
                  <h4 className="report-chart-title">Maintenance Frequency</h4>
                  <div className="report-chart-svg-wrapper">
                    <svg viewBox="0 0 240 120" className="report-vector-svg">
                      {/* Grid baseline */}
                      <line x1="20" y1="100" x2="220" y2="100" stroke="#cbd5e1" strokeWidth="1.2" />
                      {/* Rising line path matching wireframe */}
                      <path d="M 30 95 L 65 65 L 100 70 L 135 50 L 170 70 L 205 35" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Area fill under path */}
                      <path d="M 30 95 L 65 65 L 100 70 L 135 50 L 170 70 L 205 35 L 205 100 L 30 100 Z" fill="rgba(244, 63, 94, 0.08)" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Lists Section: Most used and Idle assets */}
              <div className="reports-lists-flex-row">
                
                {/* Most Used Assets Column */}
                <div className="report-metrics-list-col">
                  <h4 className="report-metrics-title">Most used assets</h4>
                  <div className="report-metrics-content-box">
                    <div className="report-metrics-item-line">
                      <span className="item-badge primary">ROOM</span>
                      <p className="item-text-detail">Room B2: 34 booking this month</p>
                    </div>
                    <div className="report-metrics-item-line">
                      <span className="item-badge primary">VEHICLE</span>
                      <p className="item-text-detail">Van AF-343: 21 trips this month</p>
                    </div>
                    <div className="report-metrics-item-line">
                      <span className="item-badge primary">DEVICE</span>
                      <p className="item-text-detail">Projector AF-335: 18 uses</p>
                    </div>
                  </div>
                </div>

                {/* Idle Assets Column */}
                <div className="report-metrics-list-col">
                  <h4 className="report-metrics-title">Idle assets</h4>
                  <div className="report-metrics-content-box">
                    <div className="report-metrics-item-line">
                      <span className="item-badge warning">60+ DAYS</span>
                      <p className="item-text-detail">Camera AF-0301 : unused 60+ days</p>
                    </div>
                    <div className="report-metrics-item-line">
                      <span className="item-badge warning">45 DAYS</span>
                      <p className="item-text-detail">chair AF-0410 : unused 45 days</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Section Divider Line */}
              <div className="reports-divider-line"></div>

              {/* Maintenance & Retirement Section */}
              <div className="retirement-section">
                <h4 className="retirement-title">Assets due for maintenance / nearing retirement</h4>
                <div className="retirement-content-box">
                  <div className="retirement-item-line">
                    <AlertTriangle size={15} className="retirement-warn-icon" />
                    <p className="retirement-text-detail">
                      <strong>Forklift AF-0087</strong> : service due in 5 days
                    </p>
                  </div>
                  <div className="retirement-item-line">
                    <AlertTriangle size={15} className="retirement-warn-icon" />
                    <p className="retirement-text-detail">
                      <strong>Laptop AF-0020</strong> : 4 years old : nearing retirement
                    </p>
                  </div>
                </div>
              </div>

              {/* Export Report Action Row */}
              <div className="reports-footer-action-row">
                <button
                  className="reports-primary-action-btn"
                  onClick={handleExportReportAction}
                  disabled={exportingReport}
                >
                  {exportingReport ? (
                    <>
                      <Loader2 size={16} className="spinner-icon-animate" />
                      <span>Exporting PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Export report</span>
                    </>
                  )}
                </button>
              </div>

              {/* Export Success Alert Banner */}
              {exportSuccess && (
                <div className="export-success-banner-alert">
                  <CheckCircle size={18} className="export-success-icon" />
                  <span>Report exported successfully! Downloaded: **utilization_and_maintenance_audit.pdf**</span>
                </div>
              )}

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

      {/* New Timeline Booking Modal */}
      {showNewBookingModal && (
        <div className="modal-overlay-wire">
          <div className="modal-card-wire">
            <div className="modal-header-wire">
              <h3>Create Timeline Slot Booking</h3>
              <button className="modal-close-wire" onClick={() => setShowNewBookingModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateTimelineBooking} className="modal-form-wire">
              <div className="form-group-wire">
                <label>Team Name</label>
                <input 
                  type="text" 
                  value={bookingTeamName}
                  onChange={(e) => setBookingTeamName(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group-wire">
                  <label>Start Hour</label>
                  <select 
                    value={bookingStartTime}
                    onChange={(e) => setBookingStartTime(e.target.value)}
                  >
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                  </select>
                </div>
                <div className="form-group-wire">
                  <label>End Hour</label>
                  <select 
                    value={bookingEndTime}
                    onChange={(e) => setBookingEndTime(e.target.value)}
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions-wire">
                <button type="button" className="modal-btn-cancel" onClick={() => setShowNewBookingModal(false)}>Cancel</button>
                <button type="submit" className="modal-btn-submit">Confirm Slot</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
