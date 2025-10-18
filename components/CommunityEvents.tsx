import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import { mockEvents } from '../services/mockData';
import { HealthEvent } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

const EventCard: React.FC<{ event: HealthEvent; onRegister: (event: HealthEvent) => void; isRegistered: boolean; }> = ({ event, onRegister, isRegistered }) => {
    const { t } = useTranslation();
    return (
        <Card>
            <div className="p-5">
                <p className="text-sm text-[var(--text-accent-primary)] font-semibold">{event.date}</p>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">{event.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{t('communityEvents.hostedBy')} {event.hospitalName}</p>
                <p className="text-[var(--text-secondary)] mt-3 text-sm">{event.description}</p>
                <div className="mt-4">
                    <Button onClick={() => onRegister(event)} disabled={isRegistered}>
                        {isRegistered ? t('communityEvents.registered') : t('communityEvents.register')}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

const CommunityEvents: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [events] = React.useState(mockEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<HealthEvent | null>(null);
    const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

    const handleRegisterClick = (event: HealthEvent) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleConfirmRegistration = () => {
        if (selectedEvent) {
            setRegisteredEventIds(prev => [...prev, selectedEvent.id]);
            setIsModalOpen(false);
            alert(`${t('communityEvents.registrationSuccess')} "${selectedEvent.name}"!`);
            setSelectedEvent(null);
        }
    };

    return (
        <div>
            <h1 
              className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
              style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
            >
              {t('communityEvents.title')}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                    <EventCard 
                        key={event.id} 
                        event={event} 
                        onRegister={handleRegisterClick} 
                        isRegistered={registeredEventIds.includes(event.id)}
                    />
                ))}
            </div>

            {/* Registration Confirmation Modal */}
            {selectedEvent && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    title={t('communityEvents.modal.title')}
                >
                    <div className="text-[var(--text-secondary)]">
                        <p className="mb-4">{t('communityEvents.modal.message')}</p>
                        <div className="p-4 bg-black/20 rounded-lg space-y-2">
                            <p><span className="font-semibold text-[var(--text-secondary)]">{t('communityEvents.modal.eventName')}:</span> {selectedEvent.name}</p>
                            <p><span className="font-semibold text-[var(--text-secondary)]">{t('communityEvents.modal.date')}:</span> {selectedEvent.date}</p>
                            <p><span className="font-semibold text-[var(--text-secondary)]">{t('communityEvents.modal.location')}:</span> {selectedEvent.hospitalName}</p>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>{t('communityEvents.modal.cancelButton')}</Button>
                            <Button onClick={handleConfirmRegistration}>{t('communityEvents.modal.confirmButton')}</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CommunityEvents;