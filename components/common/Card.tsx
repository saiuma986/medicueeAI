import React from 'react';
import { useTheme } from '../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg shadow-[var(--shadow-color)] overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-strong)] hover:border-[var(--border-strong)] ${className}`}
    >
      {title && (
        <div className="p-4 border-b border-[var(--border-color)]">
          <h2 
            className="text-lg font-semibold text-[var(--text-accent-primary)]" 
            style={theme === 'dark' ? { textShadow: '0 0 5px var(--color-primary)'} : {}}
          >
            {title}
          </h2>
        </div>
      )}
      <div className={title ? 'p-0' : 'p-0'}>{children}</div>
    </div>
  );
};

export default Card;