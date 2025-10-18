import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-deep)] disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5";
  
  const variantClasses = {
    primary: 'bg-[var(--color-secondary)] text-[var(--text-inverted)] hover:bg-[var(--color-secondary-hover)] focus:ring-[var(--color-secondary)] shadow-lg shadow-[var(--shadow-strong)]',
    secondary: 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-input-hover)] hover:text-[var(--text-primary)] focus:ring-gray-500 border border-[var(--border-strong)]',
    danger: 'bg-[var(--color-danger)] text-[var(--text-inverted)] hover:bg-[var(--color-danger-hover)] focus:ring-[var(--color-danger)] shadow-lg shadow-[var(--shadow-danger)]',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;