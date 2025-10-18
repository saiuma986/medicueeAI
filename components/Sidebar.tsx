

import React from 'react';
import { Page } from '../App';
import { HomeIcon } from './icons/HomeIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { HospitalIcon } from './icons/HospitalIcon';
import { BloodIcon } from './icons/BloodIcon';
import { AmbulanceIcon } from './icons/AmbulanceIcon';
import { EventIcon } from './icons/EventIcon';
import { AppointmentsIcon } from './icons/AppointmentsIcon';
import { useTranslation } from '../i18n';
import { LogoIcon } from './icons/LogoIcon';
import { useTheme } from './theme/ThemeContext';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string; // Changed to string to accept translated labels
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-3 md:p-4 my-2 cursor-pointer rounded-lg transition-all duration-300 group ${
        isActive
          ? 'bg-[var(--bg-accent-translucent)] text-[var(--color-secondary)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-light)] hover:text-[var(--text-primary)]'
      }`}
    >
      <div className={`
        ${isActive ? 'text-[var(--color-secondary)] scale-110' : 'text-[var(--text-secondary)] group-hover:text-[var(--color-primary)]'} 
        transition-all duration-300
      `}>
        {icon}
      </div>
      <span className="ml-4 text-sm font-medium hidden md:block">{label}</span>
      <span className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[var(--bg-light)] text-[var(--text-accent-primary)] text-xs invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 md:hidden">
        {label}
      </span>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navItems = [
    { icon: <HomeIcon />, page: Page.Home, tKey: 'sidebar.home' },
    { icon: <HospitalIcon />, page: Page.Hospitals, tKey: 'sidebar.hospitals' },
    { icon: <AppointmentsIcon />, page: Page.MyAppointments, tKey: 'sidebar.myAppointments' },
    { icon: <BloodIcon />, page: Page.BloodNetwork, tKey: 'sidebar.bloodNetwork' },
    { icon: <AmbulanceIcon />, page: Page.AmbulanceBooking, tKey: 'sidebar.ambulanceBooking' },
    { icon: <EventIcon />, page: Page.CommunityEvents, tKey: 'sidebar.communityEvents' },
    { icon: <DashboardIcon />, page: Page.Dashboard, tKey: 'sidebar.dashboard' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-16 md:w-64 bg-[var(--bg-medium)] border-r border-[var(--border-color)] shadow-lg shadow-[var(--shadow-color)] z-10 transition-all duration-300">
      <div className="flex items-center justify-center h-20 border-b border-[var(--border-color)] px-4">
        <div className="flex items-center gap-2">
            <LogoIcon className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
            <h1 
              className="text-xl font-bold text-[var(--text-primary)] hidden md:block" 
              style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-secondary)' } : {}}
            >
                {t('sidebar.title')}
            </h1>
        </div>
      </div>
      <nav>
        <ul className="p-2 md:p-4">
          {navItems.map((item) => (
            <NavItem
              key={item.page}
              icon={item.icon}
              label={t(item.tKey)}
              isActive={currentPage === item.page}
              onClick={() => setCurrentPage(item.page)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;