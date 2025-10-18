import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Page } from '../App';
import { User } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage, isAuthenticated, user, onLogout, onSearch }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  return (
    <div className="flex min-h-screen bg-[var(--bg-deep)]">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-16 md:ml-64 transition-all duration-300">
        <Header 
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
          onSearch={onSearch}
        />
        <div className="container mx-auto mt-6">
          {children}
          <footer className="text-center mt-12 py-4">
            <p 
              className="text-sm font-bold text-[var(--color-secondary)] animate-pulse tracking-widest" 
              style={theme === 'dark' ? { textShadow: '0 0 8px var(--color-secondary)'} : {}}
            >
              {t('footer.text')}
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Layout;