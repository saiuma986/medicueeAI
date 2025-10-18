import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Ambulance } from '../../types';
import Card from '../common/Card';
import { useTranslation } from '../../i18n';
import { mockHospitals } from '../../services/mockData';

declare var L: any;

const TrafficControlDashboard: React.FC<{ ambulance: Ambulance }> = ({ ambulance }) => {
    const { t } = useTranslation();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const routeLayersRef = useRef<any[]>([]);

    const [log, setLog] = useState<string[]>([]);
    const timeoutsRef = useRef<number[]>([]);

    const destinationHospital = useMemo(() => {
        return mockHospitals.find(h => h.id === ambulance.destinationHospitalId);
    }, [ambulance.destinationHospitalId]);

    const addLogMessage = (message: string) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});
        setLog(prev => [`[${timestamp}] ${message}`, ...prev]);
    };

    // Log simulation effect
    useEffect(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setLog([]);

        if (ambulance.status === 'booked' && ambulance.bookingTime) {
            addLogMessage(`[ALERT] Ambulance ${ambulance.vehicleNumber} dispatched for pickup. ETA to patient: 5 mins.`);
        } else if (ambulance.status === 'en-route') {
            addLogMessage(`[STATUS] Patient onboard. En-route to ${destinationHospital?.name}. ETA: 8 mins.`);
            const t_new = setTimeout(() => addLogMessage(`[STATUS] All units proceeding to clear designated intersections.`), 1000);
            const t1 = setTimeout(() => addLogMessage(`[ACTION REQUIRED] Clear route at MG Road Junction. Ambulance approaching.`), 2000);
            const t2 = setTimeout(() => addLogMessage(`[CONFIRMED] Route at MG Road Junction cleared.`), 4000);
            const t3 = setTimeout(() => addLogMessage(`[STATUS] Ambulance has passed MG Road Junction. Standing by for next alert.`), 6000);
            const t4 = setTimeout(() => addLogMessage(`[ACTION REQUIRED] Clear route at Benz Circle. Ambulance approaching.`), 8000);
            const t5 = setTimeout(() => addLogMessage(`[CONFIRMED] Route at Benz Circle cleared.`), 10000);
            timeoutsRef.current = [t_new, t1, t2, t3, t4, t5];
        } else if (ambulance.status === 'at-hospital') {
            addLogMessage(`[SUCCESS] Ambulance has arrived at ${destinationHospital?.name}. Mission complete.`)
        }

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        }
    }, [ambulance.status, ambulance.id]);


    // Map Initialization and Updates
    useEffect(() => {
        if (!mapContainerRef.current || typeof L === 'undefined') return;

        // Initialize map
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([16.5062, 80.6480], 13);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }).addTo(mapRef.current);
        }

        // Clear previous layers
        routeLayersRef.current.forEach(layer => mapRef.current.removeLayer(layer));
        routeLayersRef.current = [];
        if (markerRef.current) {
            mapRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
        }

        if (ambulance.currentLocation) {
            const { currentLocation, pickupCoords } = ambulance;
            const latLng = L.latLng(currentLocation.lat, currentLocation.lng);
            
            // Add ambulance marker
            const activeIcon = L.divIcon({ html: `<i class="fas fa-truck-medical fa-2x text-[var(--color-primary)]"></i>`, className: 'leaflet-pulsing-active-ambulance', iconSize: [30, 30], iconAnchor: [15, 15] });
            markerRef.current = L.marker(latLng, { icon: activeIcon }).addTo(mapRef.current);

            // Add route and other markers if en-route
            if ((ambulance.status === 'en-route' || ambulance.status === 'booked') && pickupCoords && destinationHospital) {
                const pickupIcon = L.divIcon({ html: `<i class="fas fa-map-marker-alt fa-2x text-[var(--color-secondary)]"></i>`, className: '', iconSize: [30, 42], iconAnchor: [15, 42] });
                const hospitalIcon = L.divIcon({ html: `<i class="fas fa-hospital fa-2x text-[var(--color-primary)]"></i>`, className: '', iconSize: [30, 42], iconAnchor: [15, 42] });

                const pickupMarker = L.marker(pickupCoords, { icon: pickupIcon });
                const hospitalMarker = L.marker(destinationHospital.location, { icon: hospitalIcon });
                
                const routeToPickup = L.polyline([currentLocation, pickupCoords], { color: 'var(--color-secondary)', dashArray: '5, 10' });
                const routeToDestination = L.polyline([pickupCoords, destinationHospital.location], { color: 'var(--color-primary)' });
                
                const newLayers = [pickupMarker, hospitalMarker, routeToPickup, routeToDestination];
                newLayers.forEach(layer => layer.addTo(mapRef.current));
                routeLayersRef.current = newLayers;

                const bounds = L.latLngBounds([currentLocation, pickupCoords, destinationHospital.location]);
                if (bounds.isValid()) {
                    mapRef.current.fitBounds(bounds.pad(0.2), { animate: true });
                }
            } else {
                 mapRef.current.panTo(latLng, { animate: true });
            }
        }

    }, [ambulance.currentLocation, ambulance.status, destinationHospital]);


    return (
        <Card className="border-2 border-red-500/50 shadow-xl shadow-red-500/20 bg-gray-900/50">
            <div className="p-4">
                <h2 className="text-xl font-bold text-red-400 mb-3">{t('trafficControlDashboard.title')}</h2>
                <div className="bg-red-500/20 text-red-300 text-center py-2 px-3 rounded-lg mb-4 font-semibold text-sm animate-pulse">
                    <i className="fas fa-siren-on mr-2"></i> {t('trafficControlDashboard.alertBanner')}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div ref={mapContainerRef} className="h-48 rounded-lg border border-gray-700 w-full" />

                    <div className="space-y-2 text-sm">
                        <div>
                            <p className="font-semibold text-gray-400">{t('trafficControlDashboard.vehicleNumber')}</p>
                            <p className="text-white font-mono">{ambulance.vehicleNumber}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-400">{t('trafficControlDashboard.eta')}</p>
                            <p className="text-white">{ambulance.status === 'en-route' ? 'Approx. 8 mins' : 'N/A'}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-400">{t('trafficControlDashboard.currentLocation')}</p>
                            <p className="text-white">{ambulance.status === 'booked' ? 'Proceeding to pickup' : ambulance.pickupLocation}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-md font-semibold text-red-400 mb-2">{t('trafficControlDashboard.actionLogTitle')}</h3>
                    <div className="bg-black/30 p-3 rounded-lg h-36 overflow-y-auto space-y-2 flex flex-col-reverse">
                        {log.map((entry, index) => {
                            const iconClass = entry.includes('[CONFIRMED]') || entry.includes('[SUCCESS]') ? 'fa-check-circle text-green-400' 
                                : entry.includes('[ACTION REQUIRED]') ? 'fa-exclamation-triangle text-yellow-400' 
                                : 'fa-info-circle text-cyan-400';
                            return (
                                <p key={index} className="text-xs text-gray-300 font-mono flex items-start">
                                    <i className={`fas ${iconClass} mr-2.5 mt-0.5 shrink-0 w-4 text-center`}></i>
                                    <span>{entry}</span>
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TrafficControlDashboard;