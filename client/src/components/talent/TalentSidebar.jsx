<<<<<<< HEAD
=======
import { useState } from 'react';
>>>>>>> 61eeb18 (Complete)
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ── Clean SVG line-art icons ── */
const IconDashboard = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="7" height="7" rx="1.5"/>
    <rect x="11" y="2" width="7" height="7" rx="1.5"/>
    <rect x="2" y="11" width="7" height="7" rx="1.5"/>
    <rect x="11" y="11" width="7" height="7" rx="1.5"/>
  </svg>
);

<<<<<<< HEAD
const IconTasks = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10l2 2 4-4"/>
    <rect x="3" y="3" width="14" height="14" rx="2"/>
=======
const IconHistory = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8"/>
    <path d="M10 5v5l3 2"/>
  </svg>
);

const IconHelp = () => (
  <svg className="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="10" y1="16" x2="10.01" y2="16"/>
>>>>>>> 61eeb18 (Complete)
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 10H3M13 10l-3-3M13 10l-3 3"/>
    <path d="M7 4H4a1 1 0 00-1 1v10a1 1 0 001 1h3"/>
  </svg>
);

const navItems = [
<<<<<<< HEAD
  { label: 'My Dashboard', path: '/talent/dashboard', Icon: IconDashboard },
  { label: 'My Tasks',     path: '/talent/tasks',     Icon: IconTasks     },
=======
  { label: 'My Dashboard',      path: '/talent/dashboard',   Icon: IconDashboard },
  { label: 'Submission History', path: '/talent/submissions', Icon: IconHistory },
>>>>>>> 61eeb18 (Complete)
];

const TalentSidebar = () => {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
<<<<<<< HEAD

  return (
    <aside className="fixed inset-y-0 left-0 w-[220px] flex flex-col z-50"
      style={{ background: '#0D0D0D' }}>
=======
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <aside className="fixed inset-y-0 left-0 w-[220px] flex flex-col z-50 animate-fade-in"
      style={{ background: '#0D0D0D', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
>>>>>>> 61eeb18 (Complete)

      {/* Brand */}
      <div className="flex items-center justify-center px-5 py-6">
        <img src="/modelsuite-talents.png" alt="ModelSuite Talents" className="w-36 h-auto object-contain" />
      </div>

      <div className="sidebar-divider mx-4" />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1 px-3 pt-5">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] px-2 mb-2"
          style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
          Menu
        </p>

        {navItems.map(({ label, path, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <button key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'nav-active' : ''}`}>
              <Icon />
              <span>{label}</span>
            </button>
          );
        })}
<<<<<<< HEAD
=======

        {/* Restart Onboarding Guide */}
        <button
          onClick={() => {
            localStorage.removeItem('onboarding_completed');
            window.location.reload();
          }}
          className="nav-item text-text-muted hover:text-white mt-4 opacity-75 hover:opacity-100 transition-opacity">
          <IconHelp />
          <span>Restart Guide</span>
        </button>
>>>>>>> 61eeb18 (Complete)
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5">
        <div className="sidebar-divider mb-4" />
<<<<<<< HEAD
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full avatar-talent flex items-center justify-center text-[12px] font-bold text-white shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? 'T'}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold truncate max-w-[100px]"
                style={{ color: '#E5E2E1', fontFamily: 'Inter, sans-serif' }}>
                {user?.name}
              </p>
              <p className="text-[11px]" style={{ color: '#4B5563' }}>Talent</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login'); }}
            title="Sign out"
            className="logout-btn">
            <IconLogout />
          </button>
        </div>
=======

        {showConfirm ? (
          <div className="flex flex-col gap-2 p-2.5 bg-[#141414] border border-white/5 rounded-xl animate-fade-in">
            <p className="text-[11px] font-medium text-red-400 text-center font-sans">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="flex-1 py-1.5 text-[10.5px] font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-lg transition-all font-sans cursor-pointer">
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-1.5 text-[10.5px] font-bold text-[#E5E2E1] bg-[#2E2E2E] hover:bg-[#3E3E3E] active:scale-95 rounded-lg transition-all font-sans cursor-pointer">
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full avatar-talent flex items-center justify-center text-[12px] font-bold text-white shrink-0">
                {user?.name?.[0]?.toUpperCase() ?? 'T'}
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold truncate max-w-[100px]"
                  style={{ color: '#E5E2E1', fontFamily: 'Inter, sans-serif' }}>
                  {user?.name}
                </p>
                <p className="text-[11px]" style={{ color: '#4B5563' }}>Talent</p>
              </div>
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              title="Sign out"
              className="logout-btn">
              <IconLogout />
            </button>
          </div>
        )}
>>>>>>> 61eeb18 (Complete)
      </div>
    </aside>
  );
};

export default TalentSidebar;
