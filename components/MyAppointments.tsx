import React, { useState, useEffect } from 'react';
import { Appointment, Doctor } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { useTranslation } from '../i18n';
import { mockHospitals } from '../services/mockData';
import { useTheme } from './theme/ThemeContext';

// Reschedule Modal component
interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null;
    onConfirm: (appointmentId: string, newDate: string, newTime: string) => void;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ isOpen, onClose, appointment, onConfirm }) => {
    const { t } = useTranslation();
    const [selectedSlot, setSelectedSlot] = useState('');
    const [doctor, setDoctor] = useState<Doctor | null>(null);

    useEffect(() => {
        if (appointment) {
            const hospital = mockHospitals.find(h => h.name === appointment.hospitalName);
            const doc = hospital?.doctors.find(d => d.name === appointment.doctorName);
            if (doc) {
                setDoctor(doc);
                setSelectedSlot(doc.availability[0] || '');
            } else {
                setDoctor(null);
                setSelectedSlot('');
            }
        }
    }, [appointment]);
    
    const handleConfirm = () => {
        if (appointment && selectedSlot) {
            const slotParts = selectedSlot.split(' ');
            const newDate = `Upcoming ${slotParts[0]}`; // NOTE: This format is simplistic, matching the booking flow.
            const newTime = slotParts.slice(1).join(' ');
            onConfirm(appointment.id, newDate, newTime);
            onClose();
        }
    };

    if (!isOpen || !appointment) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('myAppointments.rescheduleModal.title')}>
            <div className="text-[var(--text-secondary)]">
                <p className="mb-4">{t('myAppointments.rescheduleModal.description')}</p>
                 <div className="p-4 bg-black/20 rounded-lg space-y-1 mb-4">
                    <p><span className="font-semibold text-[var(--text-secondary)]">Doctor:</span> {appointment.doctorName}</p>
                    <p><span className="font-semibold text-[var(--text-secondary)]">Hospital:</span> {appointment.hospitalName}</p>
                </div>
                {doctor && doctor.availability.length > 0 ? (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('hospitalFinder.slotsLabel')}</label>
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
                        >
                            {doctor.availability.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                    </div>
                ) : (
                    <p className="text-yellow-400">No other slots are available for this doctor. Please cancel and book with another doctor.</p>
                )}
                <div className="mt-6 flex justify-end gap-4">
                    <Button onClick={onClose} variant="secondary">{t('hospitalFinder.cancel')}</Button>
                    <Button onClick={handleConfirm} disabled={!selectedSlot || !doctor || doctor.availability.length === 0}>{t('myAppointments.rescheduleModal.confirmButton')}</Button>
                </div>
            </div>
        </Modal>
    );
};

// Cancel Modal component
interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: Appointment | null;
    onConfirm: () => void;
}

const CancelAppointmentModal: React.FC<CancelModalProps> = ({ isOpen, onClose, appointment, onConfirm }) => {
    const { t } = useTranslation();
    if (!isOpen || !appointment) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('myAppointments.cancelModal.title')}>
            <div className="text-[var(--text-secondary)]">
                <p className="mb-4">{t('myAppointments.cancelModal.message')}</p>
                <div className="p-4 bg-black/20 rounded-lg space-y-1">
                    <p><span className="font-semibold text-[var(--text-secondary)]">Doctor:</span> {appointment.doctorName}</p>
                    <p><span className="font-semibold text-[var(--text-secondary)]">Hospital:</span> {appointment.hospitalName}</p>
                    <p><span className="font-semibold text-[var(--text-secondary)]">Date:</span> {appointment.date} at {appointment.time}</p>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Button onClick={onClose} variant="secondary">{t('myAppointments.cancelModal.keepButton')}</Button>
                    <Button onClick={onConfirm} variant="danger">{t('myAppointments.cancelModal.confirmButton')}</Button>
                </div>
            </div>
        </Modal>
    );
};

const AppointmentCard: React.FC<{ 
    appointment: Appointment, 
    onCancel: (appointment: Appointment) => void,
    onReschedule: (appointment: Appointment) => void
}> = ({ appointment, onCancel, onReschedule }) => {
    const { t } = useTranslation();

    return (
        <Card>
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-xl text-[var(--text-accent-primary)]">{appointment.doctorName}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{appointment.specialty}</p>
                        <p className="text-md text-[var(--text-primary)] mt-1">{appointment.hospitalName}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold text-[var(--text-accent-secondary)]">{appointment.date}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{appointment.time}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex justify-end gap-3">
                    <Button variant="secondary" onClick={() => onCancel(appointment)}>{t('myAppointments.cancel')}</Button>
                    <Button onClick={() => onReschedule(appointment)}>{t('myAppointments.reschedule')}</Button>
                </div>
            </div>
        </Card>
    );
};

interface MyAppointmentsProps {
    appointments: Appointment[];
    onCancelAppointment: (id: string) => void;
    onRescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
}

const MyAppointments: React.FC<MyAppointmentsProps> = ({ appointments, onCancelAppointment, onRescheduleAppointment }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleOpenRescheduleModal = (appointment: Appointment) => {
      setSelectedAppointment(appointment);
      setIsRescheduleModalOpen(true);
  };
  
  const handleOpenCancelModal = (appointment: Appointment) => {
      setSelectedAppointment(appointment);
      setIsCancelModalOpen(true);
  };

  const handleCloseModals = () => {
      setSelectedAppointment(null);
      setIsRescheduleModalOpen(false);
      setIsCancelModalOpen(false);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
        onCancelAppointment(selectedAppointment.id);
        handleCloseModals();
    }
  };

  return (
    <div>
      <h1 
        className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
        style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
      >
        {t('myAppointments.title')}
      </h1>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map(apt => (
            <AppointmentCard 
                key={apt.id} 
                appointment={apt} 
                onCancel={handleOpenCancelModal} 
                onReschedule={handleOpenRescheduleModal}
            />
          ))}
        </div>
      ) : (
        <Card>
            <div className="p-8 text-center text-[var(--text-secondary)]">
                <i className="fas fa-calendar-times fa-3x mb-4 text-fuchsia-500/30"></i>
                <p>{t('myAppointments.noAppointments')}</p>
            </div>
        </Card>
      )}
      <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={handleCloseModals}
        appointment={selectedAppointment}
        onConfirm={onRescheduleAppointment}
      />
      <CancelAppointmentModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseModals}
        appointment={selectedAppointment}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default MyAppointments;