
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { User } from '../../types';
import { useTranslation } from '../../i18n';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSuccess: (user: Omit<User, 'role'>, role: 'patient' | 'hospital') => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin, onSuccess }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'hospital'>('patient');
  const [address, setAddress] = useState('');
  const [hospitalType, setHospitalType] = useState<'general' | 'ayurvedic' | 'surgery'>('general');

  const handleRoleChange = (newRole: 'patient' | 'hospital') => {
    setRole(newRole);
    // Reset fields on role change
    setName('');
    setEmail('');
    setPassword('');
    setAddress('');
    setHospitalType('general');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy register logic
    if (role === 'hospital') {
      alert(`Registered as hospital with name: ${name}, address: ${address}, type: ${hospitalType} and email: ${email}`);
    } else {
      alert(`Registered as ${role} with name: ${name} and email: ${email}`);
    }
    onSuccess({ name, email }, role);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('register.title')}>
      <form onSubmit={handleRegister}>
        <div className="space-y-4 text-[var(--text-secondary)]">
           <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.iAmA')}</label>
            <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-lg">
                <button
                    type="button"
                    onClick={() => handleRoleChange('patient')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                        role === 'patient' ? 'bg-[var(--color-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input-hover)]'
                    }`}
                >
                    <i className="fas fa-user"></i> {t('register.patient')}
                </button>
                <button
                    type="button"
                    onClick={() => handleRoleChange('hospital')}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                        role === 'hospital' ? 'bg-[var(--color-primary)] text-white shadow' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input-hover)]'
                    }`}
                >
                    <i className="fas fa-hospital"></i> {t('register.hospital')}
                </button>
            </div>
          </div>
          
          {role === 'patient' && (
             <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.nameLabel')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
              />
            </div>
          )}

          {role === 'hospital' && (
            <>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.hospitalNameLabel')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  required
                  placeholder="e.g. Apollo Spectra Hospital"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.addressLabel')}</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                  required
                  placeholder="e.g. Koramangala, Bangalore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.hospitalTypeLabel')}</label>
                 <select
                  value={hospitalType}
                  onChange={(e) => setHospitalType(e.target.value as 'general' | 'ayurvedic' | 'surgery')}
                  className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
                  required
                >
                  <option value="general">{t('hospitalFinder.general')}</option>
                  <option value="ayurvedic">{t('hospitalFinder.ayurvedic')}</option>
                  <option value="surgery">{t('hospitalFinder.surgery')}</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('register.passwordLabel')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit">{t('register.registerButton')}</Button>
            <p className="text-center text-sm">
                {t('register.haveAccount')}{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-semibold text-[var(--text-accent-primary)] hover:underline">
                    {t('register.loginHere')}
                </button>
            </p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterModal;
