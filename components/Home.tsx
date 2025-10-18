

import React, { useState } from 'react';
import { Page } from '../App';
import { HospitalIcon } from './icons/HospitalIcon';
import { BloodIcon } from './icons/BloodIcon';
import { AmbulanceIcon } from './icons/AmbulanceIcon';
import { EventIcon } from './icons/EventIcon';
import Button from './common/Button';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import { User } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  isAuthenticated: boolean;
  onAuthSuccess: (user: Omit<User, 'role'>, role: 'patient' | 'hospital') => void;
}

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-6 cursor-pointer group transition-all duration-300 hover:bg-fuchsia-500/10 hover:shadow-lg hover:shadow-[var(--shadow-strong)]"
    >
      <div className="flex items-center">
        <div className="p-3 bg-cyan-900/50 rounded-lg mr-4 text-[var(--text-accent-primary)] group-hover:text-[var(--text-accent-secondary)] transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ setCurrentPage, isAuthenticated, onAuthSuccess }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4" 
          style={theme === 'dark' ? { textShadow: '0 0 10px var(--text-primary), 0 0 20px var(--color-primary)' } : {}}
        >
          {t('home.title')}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
        {!isAuthenticated && (
          <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => setIsLoginModalOpen(true)}>{t('home.login')}</Button>
              <Button onClick={() => setIsRegisterModalOpen(true)} variant="secondary">{t('home.register')}</Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<HospitalIcon />}
          title={t('home.findHospitalsTitle')}
          description={t('home.findHospitalsDesc')}
          onClick={() => setCurrentPage(Page.Hospitals)}
        />
        <FeatureCard
          icon={<BloodIcon />}
          title={t('home.bloodNetworkTitle')}
          description={t('home.bloodNetworkDesc')}
          onClick={() => setCurrentPage(Page.BloodNetwork)}
        />
        <FeatureCard
          icon={<AmbulanceIcon />}
          title={t('home.ambulanceBookingTitle')}
          description={t('home.ambulanceBookingDesc')}
          onClick={() => setCurrentPage(Page.AmbulanceBooking)}
        />
        <FeatureCard
          icon={<EventIcon />}
          title={t('home.communityEventsTitle')}
          description={t('home.communityEventsDesc')}
          onClick={() => setCurrentPage(Page.CommunityEvents)}
        />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onSuccess={onAuthSuccess}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onSuccess={onAuthSuccess}
      />
    </div>
  );
};

export default Home;