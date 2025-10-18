import React, { useState, useEffect, useMemo, useRef } from 'react';
import Card from './common/Card';
import { mockAmbulances, mockHospitals } from '../services/mockData';
import { Ambulance } from '../types';
import { useTranslation } from '../i18n';
import AmbulanceBookingModal, { BookingData } from './ambulance/AmbulanceBookingModal';
import Button from './common/Button';
import Modal from './common/Modal';
import AmbulanceMap from './ambulance/AmbulanceMap';
import { useTheme } from './theme/ThemeContext';
import TrafficControlDashboard from './ambulance/TrafficControlDashboard';

const AmbulanceStatusCard: React.FC<{ ambulance: Ambulance }> = ({ ambulance }) => {
    const { t } = useTranslation();
    const statusStyles = {
        'available': 'text-green-300 border-green-300/50',
        'booked': 'text-yellow-300 border-yellow-300/50',
        'en-route': 'text-cyan-300 border-cyan-300/50',
        'at-hospital': 'text-fuchsia-300 border-fuchsia-300/50',
    };

    return (
        <Card className="bg-gray-800/70">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-bold text-[var(--text-primary)] text-lg">{ambulance.vehicleNumber}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{ambulance.baseLocation}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 border rounded-full ${statusStyles[ambulance.status]}`}>
                        {t(`ambulanceBooking.status.${ambulance.status}`)}
                    </span>
                </div>
                {ambulance.status !== 'available' && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)] text-sm">
                        <p><span className="font-semibold text-[var(--text-secondary)]">Patient:</span> <span className="text-[var(--text-primary)]">{ambulance.patientName}</span></p>
                        <p><span className="font-semibold text-[var(--text-secondary)]">Pickup:</span> <span className="text-[var(--text-primary)]">{ambulance.pickupLocation}</span></p>
                        {ambulance.bookingTime && (
                           <p className="text-xs text-gray-500 mt-2">
                                Booked {Math.round((Date.now() - ambulance.bookingTime.getTime()) / (1000 * 60))} mins ago
                           </p>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

const InfoRow: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-semibold text-[var(--text-secondary)]">{label}</p>
        <p className="text-lg text-[var(--text-primary)]">{value || 'N/A'}</p>
    </div>
);


const ActiveBookingCard: React.FC<{ ambulance: Ambulance; onCancel: () => void }> = ({ ambulance, onCancel }) => {
    const { t } = useTranslation();
    const statuses: Array<Ambulance['status']> = ['booked', 'en-route', 'at-hospital'];
    const currentStatusIndex = statuses.indexOf(ambulance.status);
    const [coordinationLog, setCoordinationLog] = useState<string[]>([]);
    // FIX: Changed NodeJS.Timeout to number for browser compatibility with setTimeout.
    const timeoutsRef = useRef<number[]>([]);
    
    const destinationHospital = useMemo(() => {
        return mockHospitals.find(h => h.id === ambulance.destinationHospitalId);
    }, [ambulance.destinationHospitalId]);

    const addLogMessage = (message: string) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});
        setCoordinationLog(prev => [...prev, `[${timestamp}] ${message}`]);
    };

    useEffect(() => {
        // Clear previous timeouts and log when ambulance ID changes
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setCoordinationLog([]);

        if (ambulance.status === 'en-route') {
            const destination = destinationHospital?.name || 'the hospital';
            
            addLogMessage(`Route to ${destination} calculated. Alerting Traffic Police HQ.`);

            const t1 = setTimeout(() => addLogMessage(`HQ dispatched alerts to patrol units along the route.`), 2000);
            const t_new = setTimeout(() => addLogMessage(`Patrol units are now clearing the route ahead of the ambulance.`), 3500);
            const t2 = setTimeout(() => addLogMessage(`Approaching MG Road Junction. Alerting nearest traffic unit.`), 5000);
            const t3 = setTimeout(() => addLogMessage(`Unit 7 confirms MG Road Junction is cleared. Proceeding.`), 7000);
            const t4 = setTimeout(() => addLogMessage(`Approaching Benz Circle. Alerting nearest traffic unit.`), 10000);
            const t5 = setTimeout(() => addLogMessage(`Unit 12 confirms Benz Circle is cleared. Proceeding.`), 12000);
            
            timeoutsRef.current = [t1, t_new, t2, t3, t4, t5];
        }
        
        if (ambulance.status === 'at-hospital' && ambulance.bookingTime) {
             addLogMessage(`Ambulance has arrived at ${destinationHospital?.name}. Route cleared. All units stand down.`);
        }
        
        // Cleanup function
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    // We only want this to re-run when the core booking identifier (id) or its primary state (status) changes.
    }, [ambulance.status, ambulance.id, destinationHospital]);


    return (
        <Card className="mb-6 border-2 border-[var(--color-primary)] shadow-xl shadow-[var(--shadow-cyan)]">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-[var(--text-accent-primary)] mb-2">{t('ambulanceBooking.activeBooking.title')}</h2>
                <p className="text-[var(--text-secondary)] mb-4">{t('ambulanceBooking.activeBooking.subtitle')}</p>
                
                {/* Status Progress Bar */}
                <div className="relative flex justify-between items-center w-full my-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--bg-input)] -translate-y-1/2">
                        <div 
                            className="h-full bg-[var(--color-primary)] transition-all duration-500"
                            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                    {statuses.map((status, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        return (
                            <div key={status} className="relative z-10 flex flex-col items-center w-24">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${isCompleted ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'bg-[var(--bg-light)] border-[var(--border-strong)]'}`}>
                                    {isCompleted && <i className="fas fa-check text-white"></i>}
                                </div>
                                <p className={`mt-2 text-xs text-center font-semibold transition-colors duration-500 ${isCompleted ? 'text-[var(--text-accent-primary)]' : 'text-gray-500'}`}>
                                    {t(`ambulanceBooking.activeBooking.status.${status}`)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm my-6 p-4 bg-black/20 rounded-lg">
                    <InfoRow label={t('ambulanceBooking.activeBooking.vehicleNumber')} value={ambulance.vehicleNumber} />
                    <InfoRow label={t('ambulanceBooking.activeBooking.patientName')} value={ambulance.patientName} />
                    <InfoRow label={t('ambulanceBooking.activeBooking.pickupLocation')} value={ambulance.pickupLocation} />
                    <InfoRow label={t('ambulanceBooking.activeBooking.destination')} value={destinationHospital?.name} />
                </div>
                
                {/* Live Coordination Log */}
                {coordinationLog.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-[var(--text-accent-primary)] mb-3 flex items-center">
                            <i className="fas fa-siren-on mr-3 animate-pulse text-[var(--text-accent-primary)]"></i>
                            {t('ambulanceBooking.activeBooking.trafficPoliceCoordination')}
                        </h3>
                        <div className="p-4 bg-black/20 rounded-lg max-h-40 overflow-y-auto space-y-2">
                            {coordinationLog.map((message, index) => {
                                const iconClass = message.toLowerCase().includes('cleared') ? 'fa-check-circle text-green-400' 
                                    : message.toLowerCase().includes('alerting') ? 'fa-exclamation-triangle text-yellow-400' 
                                    : 'fa-broadcast-tower text-cyan-400';
                                
                                return (
                                    <p key={index} className="text-xs text-[var(--text-secondary)] font-mono flex items-start">
                                        <i className={`fas ${iconClass} mr-2.5 mt-0.5 shrink-0 w-4 text-center`}></i>
                                        <span>{message}</span>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                <Button onClick={onCancel} variant="danger" className="mt-6">
                    <i className="fas fa-times-circle mr-2"></i>
                    {t('ambulanceBooking.activeBooking.cancelBooking')}
                </Button>
            </div>
        </Card>
    );
};


const AmbulanceTracker: React.FC = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [ambulances, setAmbulances] = useState<Ambulance[]>(() => {
        // Initialize patrol targets for available ambulances to make them move around
        return mockAmbulances.map(amb => {
            if (amb.status === 'available' && amb.currentLocation) {
                return {
                    ...amb,
                    patrolTarget: {
                        lat: amb.currentLocation.lat + (Math.random() - 0.5) * 0.04,
                        lng: amb.currentLocation.lng + (Math.random() - 0.5) * 0.04,
                    }
                };
            }
            return amb;
        });
    });
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
    const initiallyBookedAmbulance = mockAmbulances.find(a => a.status === 'booked' || a.status === 'en-route');
    const [activeBookingId, setActiveBookingId] = useState<string | null>(initiallyBookedAmbulance ? initiallyBookedAmbulance.id : null);

    const cities = useMemo(() => {
        const cityNames = mockAmbulances.map(a => a.baseLocation.split(' ')[0]);
        const uniqueCities = [...new Set(cityNames)];
        return ['All Cities', ...uniqueCities];
    }, []);

    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);

    const filteredAmbulances = useMemo(() => {
        if (selectedCity === 'All Cities') {
            return ambulances;
        }
        return ambulances.filter(amb => amb.baseLocation.startsWith(selectedCity));
    }, [selectedCity, ambulances]);

    // Effect to simulate movement for ALL ambulances
    useEffect(() => {
        const interval = setInterval(() => {
            setAmbulances(prevAmbulances => 
                prevAmbulances.map(amb => {
                    // If at hospital, do nothing
                    if (amb.status === 'at-hospital') {
                        return amb;
                    }

                    // Logic for booked/en-route ambulances
                    if ((amb.status === 'booked' || amb.status === 'en-route') && amb.pickupCoords && amb.destinationHospitalId && amb.currentLocation) {
                        const destinationHospital = mockHospitals.find(h => h.id === amb.destinationHospitalId);
                        if (!destinationHospital) return amb;

                        // Determine target based on status
                        const target = amb.status === 'booked' ? amb.pickupCoords : destinationHospital.location;
                        const newLocation = { ...amb.currentLocation };
                        
                        const latDiff = target.lat - newLocation.lat;
                        const lngDiff = target.lng - newLocation.lng;
                        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                        
                        let newStatus: Ambulance['status'] = amb.status;

                        // Check for arrival
                        if (distance < 0.001) {
                            if (amb.status === 'booked') {
                                newStatus = 'en-route';
                            } else if (amb.status === 'en-route') {
                                newStatus = 'at-hospital';
                            }
                        } else {
                            // Move 8% of the way to the target
                            newLocation.lat += latDiff * 0.08;
                            newLocation.lng += lngDiff * 0.08;
                        }

                        return { ...amb, currentLocation: newLocation, status: newStatus };
                    }

                    // Logic for available ambulances (patrolling from place to place)
                    if (amb.status === 'available' && amb.currentLocation && amb.patrolTarget) {
                        const target = amb.patrolTarget;
                        const newLocation = { ...amb.currentLocation };
                        
                        const latDiff = target.lat - newLocation.lat;
                        const lngDiff = target.lng - newLocation.lng;
                        const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

                        let newPatrolTarget = target;
                        // If ambulance is close to its target, assign a new one
                        if (distance < 0.001) {
                             const originalAmbulance = mockAmbulances.find(a => a.id === amb.id);
                             const baseLocation = originalAmbulance?.currentLocation || amb.currentLocation;
                             newPatrolTarget = {
                                lat: baseLocation.lat + (Math.random() - 0.5) * 0.04,
                                lng: baseLocation.lng + (Math.random() - 0.5) * 0.04,
                             };
                        } else {
                            // Move 5% of the way to the patrol target (slower than a mission)
                            newLocation.lat += latDiff * 0.05;
                            newLocation.lng += lngDiff * 0.05;
                        }

                        return { ...amb, currentLocation: newLocation, patrolTarget: newPatrolTarget };
                    }


                    // For any other case (e.g., missing location data), return unchanged
                    return amb;
                })
            );
        }, 1500); // Update positions every 1.5 seconds

        return () => clearInterval(interval);
    }, []); // Run this effect only once on component mount

    const handleOpenBookingModal = () => {
        if (activeBookingId) {
            alert("An ambulance booking is already in progress.");
            return;
        }
        setIsBookingModalOpen(true);
    };

    const handleConfirmBooking = (bookingData: BookingData) => {
        const availableAmbulanceIndex = ambulances.findIndex(a => a.status === 'available');

        if (availableAmbulanceIndex === -1) {
            alert("Sorry, no ambulances are currently available. Please try again later.");
            return;
        }

        const bookedAmbulance = ambulances[availableAmbulanceIndex];

        // For demo: create mock pickup coordinates near the destination
        const destination = mockHospitals.find(h => h.id === bookingData.destinationHospitalId);
        const pickupCoords = destination 
            ? { lat: destination.location.lat - 0.05, lng: destination.location.lng - 0.05 }
            : { lat: 16.50, lng: 80.60 };


        setAmbulances(prevAmbulances => {
            const newAmbulances = [...prevAmbulances];
            newAmbulances[availableAmbulanceIndex] = {
                ...bookedAmbulance,
                status: 'booked' as const,
                patientName: bookingData.patientName,
                pickupLocation: bookingData.pickupLocation,
                contactNumber: bookingData.contactNumber,
                destinationHospitalId: bookingData.destinationHospitalId,
                pickupCoords: pickupCoords,
                bookingTime: new Date(),
                patrolTarget: undefined, // Clear patrol target on booking
            };
            return newAmbulances;
        });
        
        setActiveBookingId(bookedAmbulance.id);
        alert(`Ambulance ${bookedAmbulance.vehicleNumber} has been booked successfully!`);
    };

    const handleCancelBooking = () => {
        if (!activeBookingId) return;

        // Find an approx base location from mock data for reset
        const originalAmbulance = mockAmbulances.find(a => a.id === activeBookingId);

        setAmbulances(prevAmbulances => {
            return prevAmbulances.map(amb => {
                if (amb.id === activeBookingId) {
                    const baseLocation = originalAmbulance?.currentLocation || amb.currentLocation || { lat: 16.5, lng: 80.6 };
                    const newPatrolTarget = {
                        lat: baseLocation.lat + (Math.random() - 0.5) * 0.04,
                        lng: baseLocation.lng + (Math.random() - 0.5) * 0.04,
                    };
                    return {
                        ...amb,
                        status: 'available',
                        patientName: undefined,
                        pickupLocation: undefined,
                        contactNumber: undefined,
                        bookingTime: undefined,
                        destinationHospitalId: undefined,
                        pickupCoords: undefined,
                        currentLocation: originalAmbulance?.currentLocation,
                        patrolTarget: newPatrolTarget,
                    };
                }
                return amb;
            });
        });

        setActiveBookingId(null);
        setIsCancelConfirmOpen(false);
    };

    const promptCancelBooking = () => {
        setIsCancelConfirmOpen(true);
    };
    
    const availableCount = filteredAmbulances.filter(a => a.status === 'available').length;
    const activeBooking = activeBookingId ? ambulances.find(a => a.id === activeBookingId) : null;
    const locationText = selectedCity === 'All Cities' ? '' : ` in ${selectedCity}`;
    
    const emergencyButtonStyle = theme === 'dark' 
        ? { animation: 'pulse-glow-emergency 2s infinite ease-in-out', boxShadow: '0 0 20px var(--color-danger)' }
        : { animation: 'pulse-scale 2s infinite ease-in-out' };

    return (
        <div>
            <h1 
              className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
              style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
            >
              {t('ambulanceBooking.title')}
            </h1>
            
            <div className="mb-6 h-96 md:h-[500px] rounded-lg overflow-hidden border border-[var(--border-strong)] shadow-lg shadow-[var(--shadow-cyan)]">
                <AmbulanceMap
                    ambulances={filteredAmbulances}
                    activeBookingId={activeBookingId}
                    onBookFromMap={handleOpenBookingModal}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    {activeBooking ? (
                        <ActiveBookingCard ambulance={activeBooking} onCancel={promptCancelBooking} />
                    ) : (
                        <Card className="mb-6 bg-gradient-to-br from-transparent to-red-900/20">
                            <div className="p-8 text-center">
                                <h2 className="text-2xl font-bold text-[var(--text-accent-primary)] mb-2">{t('ambulanceBooking.requestService')}</h2>
                                <p className="text-[var(--text-secondary)] mb-6">{availableCount > 0 ? `${availableCount} ${t('ambulanceBooking.availableText')}${locationText}` : `${t('ambulanceBooking.noneAvailableText')}${locationText}`}</p>
                                <button
                                    onClick={handleOpenBookingModal}
                                    disabled={availableCount === 0}
                                    className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-[var(--bg-deep)] transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:shadow-none disabled:animate-none bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] focus:ring-[var(--color-danger)]"
                                    style={availableCount > 0 ? emergencyButtonStyle : {}}
                                >
                                    <i className="fas fa-truck-medical mr-3"></i>
                                    {t('ambulanceBooking.bookAmbulance')}
                                </button>
                            </div>
                        </Card>
                    )}
                </div>
                <div>
                     {activeBooking && <TrafficControlDashboard ambulance={activeBooking} />}
                </div>
            </div>



            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 mt-8 gap-4">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{t('ambulanceBooking.fleetStatus')}</h2>
                <div className="flex items-center gap-2">
                    <label htmlFor="city-filter" className="text-sm text-[var(--text-secondary)] shrink-0">Filter by City:</label>
                    <select
                        id="city-filter"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="bg-[var(--bg-input)] border border-[var(--border-strong)] text-[var(--text-primary)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAmbulances.map(amb => (
                    <AmbulanceStatusCard key={amb.id} ambulance={amb} />
                ))}
            </div>

            <AmbulanceBookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSubmit={handleConfirmBooking}
            />

            <Modal
                isOpen={isCancelConfirmOpen}
                onClose={() => setIsCancelConfirmOpen(false)}
                title={t('ambulanceBooking.cancelModal.title')}
            >
                <div className="text-[var(--text-secondary)]">
                    <p>{t('ambulanceBooking.cancelModal.message')}</p>
                    <div className="mt-6 flex justify-end gap-4">
                        <Button variant="secondary" onClick={() => setIsCancelConfirmOpen(false)}>
                            {t('ambulanceBooking.cancelModal.keepButton')}
                        </Button>
                        <Button onClick={handleCancelBooking} variant="danger">
                            {t('ambulanceBooking.cancelModal.confirmButton')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AmbulanceTracker;