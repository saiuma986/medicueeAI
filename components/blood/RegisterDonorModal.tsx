import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { BloodDonor } from '../../types';
import { useTranslation } from '../../i18n';

interface RegisterDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (donorData: Omit<BloodDonor, 'id'>) => void;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RegisterDonorModal: React.FC<RegisterDonorModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState(bloodTypes[0]);
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !location.trim() || !contact.trim()) {
        setError('All fields are required.');
        return;
    }
    onSubmit({ name, bloodType, location, contact });
    // Reset form and close
    setName('');
    setBloodType(bloodTypes[0]);
    setLocation('');
    setContact('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('bloodNetwork.registerDonorModal.title')}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 text-[var(--text-secondary)]">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.registerDonorModal.nameLabel')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.registerDonorModal.bloodTypeLabel')}</label>
            <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
            >
                {bloodTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.registerDonorModal.locationLabel')}</label>
            <input
              type="text"
              value={location}
              placeholder="e.g., Vijayawada, AP"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.registerDonorModal.contactLabel')}</label>
            <input
              type="text"
              value={contact}
              placeholder="Email or Phone Number"
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="secondary">{t('hospitalFinder.cancel')}</Button>
            <Button type="submit">{t('bloodNetwork.registerDonorModal.submitButton')}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterDonorModal;