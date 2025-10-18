import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { BloodRequest } from '../../types';
import { useTranslation } from '../../i18n';

interface RequestBloodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requestData: Omit<BloodRequest, 'id' | 'timestamp' | 'status' | 'hospitalId'>) => void;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RequestBloodModal: React.FC<RequestBloodModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [patientName, setPatientName] = useState('');
  const [bloodType, setBloodType] = useState(bloodTypes[0]);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !location.trim()) {
        setError('All fields are required.');
        return;
    }
    onSubmit({ patientName, bloodType, location });
    // Reset form and close
    setPatientName('');
    setBloodType(bloodTypes[0]);
    setLocation('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('bloodNetwork.requestBloodModal.title')}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 text-[var(--text-secondary)]">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.requestBloodModal.patientNameLabel')}</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.requestBloodModal.bloodTypeLabel')}</label>
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
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('bloodNetwork.requestBloodModal.locationLabel')}</label>
            <input
              type="text"
              value={location}
              placeholder="e.g., Manipal Hospital, Vijayawada"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" onClick={onClose} variant="secondary">{t('hospitalFinder.cancel')}</Button>
            <Button type="submit">{t('bloodNetwork.requestBloodModal.submitButton')}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default RequestBloodModal;