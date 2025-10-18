import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import RequestBloodModal from './blood/RequestBloodModal';
import RegisterDonorModal from './blood/RegisterDonorModal';
import ContactDonorModal from './blood/ContactDonorModal';
import { BloodRequest, BloodDonor } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

const BloodRequestCard: React.FC<{ request: BloodRequest }> = ({ request }) => {
    const { t } = useTranslation();
    const statusStyle = {
        pending: 'text-yellow-300 border-yellow-300/50 shadow-[0_0_8px_rgba(252,211,77,0.5)]',
        fulfilled: 'text-green-300 border-green-300/50 shadow-[0_0_8px_rgba(74,222,128,0.5)]',
        'in-progress': 'text-cyan-300 border-cyan-300/50 shadow-[0_0_8px_rgba(34,211,238,0.5)]',
    };

    return (
        <Card>
            <div className="p-5 flex justify-between items-start">
                <div>
                    <div className="flex items-center">
                        <div className="text-3xl font-bold text-red-500 mr-4">{request.bloodType}</div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--text-accent-primary)]">{request.patientName}</h3>
                            <p className="text-[var(--text-secondary)] text-sm">{request.location}</p>
                        </div>
                    </div>
                </div>
                <div className={`text-xs font-bold px-2 py-1 border rounded-full ${statusStyle[request.status]}`}>
                    {t(`bloodNetwork.status.${request.status}`)}
                </div>
            </div>
            <div className="px-5 pb-4 text-xs text-gray-500">
                Requested {Math.round((Date.now() - request.timestamp.getTime()) / (1000 * 60))} {t('bloodNetwork.minsAgo')}
            </div>
        </Card>
    );
};

const DonorCard: React.FC<{ donor: BloodDonor; onContact: (donor: BloodDonor) => void }> = ({ donor, onContact }) => {
    const { t } = useTranslation();
    return (
        <Card>
            <div className="p-5 flex justify-between items-center">
                 <div className="flex items-center">
                    <div className="text-3xl font-bold text-red-500 mr-4">{donor.bloodType}</div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--text-accent-primary)]">{donor.name}</h3>
                        <p className="text-[var(--text-secondary)] text-sm">{donor.location}</p>
                    </div>
                </div>
                <Button variant="secondary" onClick={() => onContact(donor)}>{t('bloodNetwork.contactDonor')}</Button>
            </div>
        </Card>
    );
};


interface BloodNetworkProps {
    requests: BloodRequest[];
    donors: BloodDonor[];
    onAddRequest: (requestData: Omit<BloodRequest, 'id' | 'timestamp' | 'status' | 'hospitalId'>) => void;
    onAddDonor: (donorData: Omit<BloodDonor, 'id'>) => void;
}

const BloodNetwork: React.FC<BloodNetworkProps> = ({ requests, donors, onAddRequest, onAddDonor }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState<BloodDonor | null>(null);

    const handleContactDonor = (donor: BloodDonor) => {
        setSelectedDonor(donor);
        setIsContactModalOpen(true);
    };

    return (
        <div>
            <h1 
              className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
              style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
            >
              {t('bloodNetwork.title')}
            </h1>
            <div className="flex flex-wrap gap-4 mb-6">
                <Button onClick={() => setIsRequestModalOpen(true)}>{t('bloodNetwork.requestBlood')}</Button>
                <Button variant="secondary" onClick={() => setIsRegisterModalOpen(true)}>{t('bloodNetwork.registerDonor')}</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-[var(--text-accent-primary)] mb-4">{t('bloodNetwork.urgentRequests')}</h2>
                    <div className="space-y-4">
                        {requests.filter(r => r.status !== 'fulfilled').map(request => (
                            <BloodRequestCard key={request.id} request={request} />
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold text-[var(--text-accent-primary)] mt-8 mb-4">{t('bloodNetwork.recentlyFulfilled')}</h2>
                    <div className="space-y-4">
                        {requests.filter(r => r.status === 'fulfilled').map(request => (
                            <BloodRequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-[var(--text-accent-primary)] mb-4">{t('bloodNetwork.registeredDonors')}</h2>
                    <div className="space-y-4">
                        {donors.map(donor => (
                            <DonorCard key={donor.id} donor={donor} onContact={handleContactDonor} />
                        ))}
                    </div>
                </div>
            </div>

            <RequestBloodModal 
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSubmit={onAddRequest}
            />
            <RegisterDonorModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSubmit={onAddDonor}
            />
            <ContactDonorModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                donor={selectedDonor}
            />
        </div>
    );
};

export default BloodNetwork;