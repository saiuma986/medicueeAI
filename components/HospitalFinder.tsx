import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { mockHospitals } from '../services/mockData';
import { Hospital, Doctor, Appointment } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

const HospitalCard: React.FC<{ hospital: Hospital; onBook: (hospital: Hospital) => void }> = ({ hospital, onBook }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[var(--text-accent-primary)]">{hospital.name}</h3>
        <p className="text-[var(--text-secondary)] text-sm">{hospital.location.address}</p>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-yellow-400 flex items-center"><i className="fas fa-star mr-1"></i> {hospital.rating}</span>
          <span className="text-[var(--text-secondary)]">{hospital.distance} {t('hospitalFinder.kmAway')}</span>
        </div>
        <div className="mt-3">
          {hospital.treatmentTypes.map(type => (
            <span key={type} className="bg-cyan-900/50 text-[var(--text-accent-primary)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{t(`hospitalFinder.${type}`)}</span>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => onBook(hospital)}>{t('hospitalFinder.bookAppointment')}</Button>
        </div>
      </div>
    </Card>
  );
};

interface HospitalFinderProps {
  onAddAppointment: (appointment: Appointment) => void;
}

const HospitalFinder: React.FC<HospitalFinderProps> = ({ onAddAppointment }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [treatmentFilter, setTreatmentFilter] = useState('any');
  const [costFilter, setCostFilter] = useState('any');
  const [distanceFilter, setDistanceFilter] = useState('any');

  const handleBookClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    const firstDoctor = hospital.doctors[0] || null;
    setSelectedDoctor(firstDoctor);
    setSelectedSlot(firstDoctor?.availability[0] || '');
    setIsModalOpen(true);
  };

  const handleBookingConfirm = () => {
    if(selectedHospital && selectedDoctor && selectedSlot) {
      const slotParts = selectedSlot.split(' ');
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        hospitalName: selectedHospital.name,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: `Upcoming ${slotParts[0]}`,
        time: slotParts.slice(1).join(' ')
      };
      onAddAppointment(newAppointment);
      alert(`Appointment booked successfully at ${selectedHospital.name} with ${selectedDoctor.name} for ${selectedSlot}!`);
      setIsModalOpen(false);
      setSelectedHospital(null);
      setSelectedDoctor(null);
      setSelectedSlot('');
    }
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctor = selectedHospital?.doctors.find(d => d.id === e.target.value) || null;
    setSelectedDoctor(doctor);
    setSelectedSlot(doctor?.availability[0] || '');
  };

  const filteredHospitals = mockHospitals.filter(hospital => {
    // Search filter
    if (searchQuery.trim() !== '') {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const nameMatch = hospital.name.toLowerCase().includes(lowerCaseQuery);
        const specialtyMatch = hospital.doctors.some(doctor => 
            doctor.specialty.toLowerCase().includes(lowerCaseQuery)
        );
        if (!nameMatch && !specialtyMatch) {
            return false;
        }
    }
    
    // Treatment filter
    if (treatmentFilter !== 'any' && !hospital.treatmentTypes.includes(treatmentFilter as 'general' | 'ayurvedic' | 'surgery')) {
        return false;
    }

    // Cost filter
    if (costFilter !== 'any' && hospital.costRange !== costFilter) {
        return false;
    }

    // Distance filter
    if (distanceFilter === '<5' && hospital.distance >= 5) {
        return false;
    }
    if (distanceFilter === '<10' && hospital.distance >= 10) {
        return false;
    }
    if (distanceFilter === '>10' && hospital.distance <= 10) {
        return false;
    }

    return true;
  });

  return (
    <div>
      <h1 
        className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
        style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
      >
        {t('hospitalFinder.title')}
      </h1>
      {/* Filter Section */}
      <div className="bg-[var(--bg-card)] p-4 rounded-lg mb-6 flex flex-col md:flex-row flex-wrap gap-4 items-center border border-[var(--border-color)]">
        <input
            type="text"
            placeholder={t('hospitalFinder.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:flex-grow bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
        <div className="flex gap-4">
            <select 
              value={treatmentFilter}
              onChange={(e) => setTreatmentFilter(e.target.value)}
              className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
            >
              <option value="any">{t('hospitalFinder.anyTreatment')}</option>
              <option value="general">{t('hospitalFinder.general')}</option>
              <option value="ayurvedic">{t('hospitalFinder.ayurvedic')}</option>
              <option value="surgery">{t('hospitalFinder.surgery')}</option>
            </select>
            <select 
              value={costFilter}
              onChange={(e) => setCostFilter(e.target.value)}
              className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
            >
              <option value="any">{t('hospitalFinder.anyCost')}</option>
              <option value="low">{t('hospitalFinder.low')}</option>
              <option value="medium">{t('hospitalFinder.medium')}</option>
              <option value="high">{t('hospitalFinder.high')}</option>
            </select>
            <select 
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
            >
              <option value="any">{t('hospitalFinder.anyDistance')}</option>
              <option value="<5">&lt; 5 km</option>
              <option value="<10">&lt; 10 km</option>
              <option value=">10">&gt; 10 km</option>
            </select>
        </div>
      </div>

      {/* Hospital List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} onBook={handleBookClick} />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedHospital && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${t('hospitalFinder.modalTitle')} ${selectedHospital.name}`}>
            <div className="text-[var(--text-secondary)]">
                <p className="mb-4">{t('hospitalFinder.modalDescription')}</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('hospitalFinder.doctorLabel')}</label>
                    <select
                        value={selectedDoctor?.id || ''}
                        onChange={handleDoctorChange}
                        className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
                    >
                        {selectedHospital.doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>)}
                    </select>
                </div>
                {selectedDoctor && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('hospitalFinder.slotsLabel')}</label>
                        <select 
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          className="w-full bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-2"
                        >
                            {selectedDoctor.availability.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                        </select>
                    </div>
                )}
                <div className="mt-6 flex justify-end gap-4">
                    <Button onClick={() => setIsModalOpen(false)} variant="secondary">{t('hospitalFinder.cancel')}</Button>
                    <Button onClick={handleBookingConfirm} disabled={!selectedDoctor || !selectedSlot}>{t('hospitalFinder.confirmBooking')}</Button>
                </div>
            </div>
        </Modal>
      )}
    </div>
  );
};

export default HospitalFinder;