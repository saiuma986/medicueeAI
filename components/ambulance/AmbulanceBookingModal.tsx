import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useTranslation } from '../../i18n';
import { mockHospitals } from '../../services/mockData';

export interface BookingData {
  patientName: string;
  pickupLocation: string;
  contactNumber: string;
  destinationHospitalId: string;
}

interface AmbulanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

const AmbulanceBookingModal: React.FC<AmbulanceBookingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [patientName, setPatientName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [destinationHospitalId, setDestinationHospitalId] = useState(mockHospitals[0]?.id || '');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !pickupLocation.trim() || !contactNumber.trim() || !destinationHospitalId) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setIsConfirming(true);
  };

  const handleConfirmAndDispatch = () => {
    onSubmit({ patientName, pickupLocation, contactNumber, destinationHospitalId });
    // Reset form and close
    setPatientName('');
    setPickupLocation('');
    setContactNumber('');
    setDestinationHospitalId(mockHospitals[0]?.id || '');
    setError('');
    setIsConfirming(false);
    onClose();
  };
  
  const handleGoBack = () => {
      setIsConfirming(false);
  };

  const handleClose = () => {
    setIsConfirming(false);
    setError('');
    onClose();
  };

  const InfoRow: React.FC<{ label: string, value: string | undefined }> = ({ label, value }) => (
    <div className="py-2 border-b border-[var(--border-strong)]">
        <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
        <p className="text-lg text-[var(--text-primary)]">{value}</p>
    </div>
  );
  
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isConfirming ? t('ambulanceBooking.modal.confirmTitle') : t('ambulanceBooking.modal.title')}>
      {!isConfirming ? (
        <form onSubmit={handleInitialSubmit}>
          <div className="space-y-4 text-[var(--text-secondary)]">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('ambulanceBooking.modal.patientName')}</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
                placeholder="Enter patient's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('ambulanceBooking.modal.pickupLocation')}</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
                placeholder="Enter full pickup address"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('ambulanceBooking.modal.destination')}</label>
              <select
                value={destinationHospitalId}
                onChange={(e) => setDestinationHospitalId(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
              >
                <option value="" disabled>Select a hospital</option>
                {mockHospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('ambulanceBooking.modal.contact')}</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                required
                placeholder="Enter a valid contact number"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="mt-6 flex justify-end gap-4">
              <Button type="button" onClick={handleClose} variant="secondary">{t('ambulanceBooking.modal.cancelButton')}</Button>
              <Button type="submit">{t('ambulanceBooking.modal.submitButton')}</Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-[var(--text-secondary)]">
            <p className="mb-4 text-center">Please review and confirm the details below.</p>
            <div className="space-y-3 mb-6">
                <InfoRow label={t('ambulanceBooking.modal.patientName')} value={patientName} />
                <InfoRow label={t('ambulanceBooking.modal.pickupLocation')} value={pickupLocation} />
                <InfoRow label={t('ambulanceBooking.modal.destination')} value={mockHospitals.find(h => h.id === destinationHospitalId)?.name} />
                <InfoRow label={t('ambulanceBooking.modal.contact')} value={contactNumber} />
            </div>
            <div className="mt-6 flex justify-between items-center gap-4">
              <Button onClick={handleGoBack} variant="secondary">{t('ambulanceBooking.modal.goBackAndEdit')}</Button>
              <Button onClick={handleConfirmAndDispatch}>{t('ambulanceBooking.modal.confirmAndDispatch')}</Button>
            </div>
        </div>
      )}
    </Modal>
  );
};

export default AmbulanceBookingModal;