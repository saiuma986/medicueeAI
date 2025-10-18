
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { User } from '../../types';
import { useTranslation } from '../../i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSuccess: (user: Omit<User, 'role'>, role: 'patient' | 'hospital') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister, onSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'hospital'>('patient');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    alert(`Logging in as ${role} with: ${email}`);
    const name = email.split('@')[0];
    onSuccess({ name, email }, role);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('login.title')}>
      <form onSubmit={handleLogin}>
        <div className="space-y-4 text-[var(--text-secondary)]">
           <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('login.iAmA')}</label>
            <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-lg">
                <button
                    type="button"
                    onClick={() => setRole('patient')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                        role === 'patient' ? 'bg-[var(--color-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input-hover)]'
                    }`}
                >
                    <i className="fas fa-user"></i> {t('login.patient')}
                </button>
                <button
                    type="button"
                    onClick={() => setRole('hospital')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                        role === 'hospital' ? 'bg-[var(--color-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input-hover)]'
                    }`}
                >
                    <i className="fas fa-hospital"></i> {t('login.hospital')}
                </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('login.emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('login.passwordLabel')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit">{t('login.loginButton')}</Button>
            <p className="text-center text-sm">
                {t('login.noAccount')}{' '}
                <button type="button" onClick={onSwitchToRegister} className="font-semibold text-[var(--text-accent-primary)] hover:underline">
                    {t('login.registerHere')}
                </button>
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;