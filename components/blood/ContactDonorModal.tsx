import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { BloodDonor } from '../../types';
import { useTranslation } from '../../i18n';

interface ContactDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
  donor: BloodDonor | null;
}

const InfoRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="py-2">
        <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
        <p className="text-lg text-[var(--text-primary)]">{value}</p>
    </div>
);

const ContactDonorModal: React.FC<ContactDonorModalProps> = ({ isOpen, onClose, donor }) => {
  const { t } = useTranslation();

  if (!donor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('bloodNetwork.contactDonorModal.title')}>
        <div className="space-y-3">
            <InfoRow label={t('bloodNetwork.contactDonorModal.nameLabel')} value={donor.name} />
            <InfoRow label={t('bloodNetwork.contactDonorModal.bloodTypeLabel')} value={donor.bloodType} />
            <InfoRow label={t('bloodNetwork.contactDonorModal.locationLabel')} value={donor.location} />
            <div className="pt-2">
                 <p className="text-sm font-medium text-[var(--text-secondary)]">{t('bloodNetwork.contactDonorModal.contactLabel')}</p>
                <p className="text-lg text-[var(--text-accent-primary)] font-semibold tracking-wider">{donor.contact}</p>
            </div>
        </div>
        <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="secondary">{t('bloodNetwork.contactDonorModal.closeButton')}</Button>
        </div>
    </Modal>
  );
};

export default ContactDonorModal;