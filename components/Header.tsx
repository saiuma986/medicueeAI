import React, { useState } from 'react';
import { Page } from '../App';
import { User } from '../types';
import Button from './common/Button';
import { useTranslation, languages } from '../i18n';
import { useTheme } from './theme/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    currentPage: Page;
    isAuthenticated: boolean;
    user: User | null;
    onLogout: () => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, isAuthenticated, user, onLogout, onSearch }) => {
    const { t, language, setLanguage } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-[var(--border-color)] gap-4">
            <div className="w-full flex-grow">
                <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('header.searchPlaceholder')}
                        className="flex-grow bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                    <button type="submit" className="bg-[var(--color-secondary)] text-[var(--text-inverted)] px-4 rounded-r-md hover:bg-[var(--color-secondary-hover)] transition-colors duration-300">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
                 <button
                    onClick={toggleTheme}
                    className="bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
                <div className="flex-grow sm:flex-grow-0">
                    <select 
                        value={language} 
                        onChange={handleLanguageChange} 
                        className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        aria-label={t('header.language')}
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                {isAuthenticated && user ? (
                    <div className="flex items-center gap-4">
                      <span className="text-[var(--text-secondary)] hidden sm:inline">{t('header.welcome')}, <span className="font-bold text-[var(--text-accent-primary)]">{user.name}</span>!</span>
                      <Button onClick={onLogout} variant="secondary">
                          {t('header.signOut')}
                      </Button>
                    </div>
                ) : null}
            </div>
        </header>
    );
};

export default Header;