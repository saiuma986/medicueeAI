import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Ambulance, Hospital } from '../../types';
import { mockHospitals } from '../../services/mockData';

// Declare L for Leaflet, as it's loaded globally from a script tag in index.html
declare var L: any;

interface Coords {
  lat: number;
  lng: number;
}

interface AmbulanceMapProps {
  ambulances: Ambulance[];
  activeBookingId: string | null;
  onBookFromMap: () => void;
}

// Helper to generate points on a line for traffic signals
const getPointsOnLine = (p1: Coords | undefined, p2: Coords | undefined, count: number): Coords[] => {
    const points: Coords[] = [];
    if (!p1 || !p2 || isNaN(p1.lat) || isNaN(p2.lat)) return points;
    for (let i = 1; i <= count; i++) {
        const t = i / (count + 1);
        points.push({
            lat: p1.lat + t * (p2.lat - p1.lat),
            lng: p1.lng + t * (p2.lng - p1.lng),
        });
    }
    return points;
};

const AmbulanceMap: React.FC<AmbulanceMapProps> = ({ ambulances, activeBookingId, onBookFromMap }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const ambulanceMarkersRef = useRef(new Map<string, any>());
    const routeLayersRef = useRef<any[]>([]);
    const searchResultMarkerRef = useRef<any>(null);
    const userLocationMarkerRef = useRef<any>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [isCentering, setIsCentering] = useState(false);
    
    const activeAmbulance = useMemo(() => {
        return ambulances.find(a => a.id === activeBookingId) || null;
    }, [ambulances, activeBookingId]);

    const destinationHospital = useMemo(() => {
        if (!activeAmbulance || !activeAmbulance.destinationHospitalId) return null;
        return mockHospitals.find(h => h.id === activeAmbulance.destinationHospitalId) || null;
    }, [activeAmbulance]);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim() || !mapRef.current) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
            const results = await response.json();

            if (results && results.length > 0) {
                const { lat, lon } = results[0];
                const resultCoords = L.latLng(lat, lon);
                
                if (searchResultMarkerRef.current) {
                    mapRef.current.removeLayer(searchResultMarkerRef.current);
                }

                const searchIcon = L.divIcon({
                    html: '<i class="fas fa-search-location fa-2x text-yellow-400"></i>',
                    className: '',
                    iconSize: [30, 42],
                    iconAnchor: [15, 42],
                });
                searchResultMarkerRef.current = L.marker(resultCoords, { icon: searchIcon })
                    .addTo(mapRef.current)
                    .bindPopup(results[0].display_name)
                    .openPopup();
                
                mapRef.current.flyTo(resultCoords, 15);
            } else {
                alert('Location not found.');
            }
        } catch (error) {
            console.error("Error fetching from Nominatim:", error);
            alert("Could not perform search. Please check your connection.");
        }
    };

    const handleRecenter = () => {
        if (!mapRef.current) return;
        
        if (activeAmbulance && activeAmbulance.currentLocation) {
            mapRef.current.flyTo(activeAmbulance.currentLocation, 15, { animate: true });
        } else if (navigator.geolocation) {
            setIsCentering(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
                    mapRef.current.flyTo(userCoords, 15, { animate: true });
                    
                    if(userLocationMarkerRef.current) {
                        userLocationMarkerRef.current.setLatLng(userCoords);
                    } else {
                        const userIcon = L.divIcon({
                            html: '<i class="fas fa-circle text-blue-500 text-lg"></i>',
                            className: 'ring-4 ring-blue-500 rounded-full ring-opacity-50',
                            iconSize: [20, 20],
                            iconAnchor: [10, 10],
                        });
                        userLocationMarkerRef.current = L.marker(userCoords, { icon: userIcon })
                            .addTo(mapRef.current)
                            .bindPopup('Your Location');
                    }
                    setIsCentering(false);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Could not get your location. Please enable location services.");
                    setIsCentering(false);
                    // Fallback to fitting all ambulances
                    const bounds = L.latLngBounds(ambulances.map(a => a.currentLocation).filter(Boolean));
                    if (bounds.isValid()) {
                        mapRef.current.fitBounds(bounds.pad(0.2));
                    }
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };


    // Initialization Effect
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current || typeof L === 'undefined') return;

        mapRef.current = L.map(mapContainerRef.current, {
            scrollWheelZoom: true,
            zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapRef.current);
        
        // Set initial view based on available ambulances
        if (ambulances.length > 0) {
            const bounds = L.latLngBounds(ambulances.map(a => a.currentLocation).filter(Boolean));
            if(bounds.isValid()) {
                 mapRef.current.fitBounds(bounds.pad(0.2));
            } else {
                mapRef.current.setView([16.5062, 80.6480], 12); // Default to Vijayawada
            }
        } else {
             mapRef.current.setView([16.5062, 80.6480], 12); // Default to Vijayawada
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update Ambulance Markers Effect
    useEffect(() => {
        if (!mapRef.current) return;
        
        const ambulanceIcon = L.divIcon({ html: '<i class="fas fa-truck-medical fa-2x text-green-400"></i>', className: '', iconSize: [30, 30], iconAnchor: [15, 15] });
        const bookedIcon = L.divIcon({ html: '<i class="fas fa-truck-medical fa-2x text-yellow-400"></i>', className: '', iconSize: [30, 30], iconAnchor: [15, 15] });
        const activeIcon = L.divIcon({ html: `<i class="fas fa-truck-medical fa-2x text-[var(--color-primary)]"></i>`, className: 'leaflet-pulsing-active-ambulance', iconSize: [30, 30], iconAnchor: [15, 15] });

        const currentMarkerIds = new Set(ambulanceMarkersRef.current.keys());
        const ambulancesToDisplay = new Map(ambulances.map(a => [a.id, a]));

        // Remove markers for ambulances that are no longer in the list
        currentMarkerIds.forEach(id => {
            if (!ambulancesToDisplay.has(id)) {
                mapRef.current.removeLayer(ambulanceMarkersRef.current.get(id));
                ambulanceMarkersRef.current.delete(id);
            }
        });

        // Add or update markers for current ambulances
        ambulancesToDisplay.forEach((amb, id) => {
            if (!amb.currentLocation) return;
            const latLng = L.latLng(amb.currentLocation.lat, amb.currentLocation.lng);
            let icon = amb.status === 'available' ? ambulanceIcon : bookedIcon;
            if (id === activeBookingId) {
                icon = activeIcon;
            }
            
            const popupNode = document.createElement('div');
            popupNode.innerHTML = `
                <div class="font-sans text-sm text-[var(--text-primary)]">
                    <p><b>Vehicle:</b> ${amb.vehicleNumber}</p>
                    <p><b>Base:</b> ${amb.baseLocation}</p>
                    <p class="capitalize"><b>Status:</b> <span class="font-semibold">${amb.status}</span></p>
                </div>`;

            if (amb.status === 'available') {
                const bookButton = document.createElement('button');
                bookButton.innerHTML = `<i class="fas fa-calendar-check mr-2"></i> Book Now`;
                bookButton.className = 'mt-2 px-3 py-1 w-full rounded-md font-semibold text-sm bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-hover)] transition-colors';
                bookButton.onclick = onBookFromMap;
                popupNode.appendChild(bookButton);
            }
            
            if (ambulanceMarkersRef.current.has(id)) {
                const marker = ambulanceMarkersRef.current.get(id);
                marker.setLatLng(latLng);
                marker.setIcon(icon);
                marker.setPopupContent(popupNode);
            } else {
                const newMarker = L.marker(latLng, { icon })
                    .addTo(mapRef.current)
                    .bindPopup(popupNode);
                ambulanceMarkersRef.current.set(id, newMarker);
            }
        });

    }, [ambulances, activeBookingId, onBookFromMap]);

    // Update Route and Signals Effect
    useEffect(() => {
        if (!mapRef.current) return;
        
        // Clear previous route layers
        routeLayersRef.current.forEach(layer => mapRef.current.removeLayer(layer));
        routeLayersRef.current = [];

        if (activeAmbulance && activeAmbulance.currentLocation && activeAmbulance.pickupCoords && destinationHospital) {
            const { currentLocation, pickupCoords, status } = activeAmbulance;
            const destinationCoords = destinationHospital.location;

            const pickupIcon = L.divIcon({ html: `<i class="fas fa-map-marker-alt fa-2x text-[var(--color-secondary)]"></i>`, className: '', iconSize: [30, 42], iconAnchor: [15, 42] });
            const hospitalIcon = L.divIcon({ html: `<i class="fas fa-hospital fa-2x text-[var(--color-primary)]"></i>`, className: '', iconSize: [30, 42], iconAnchor: [15, 42] });
            
            const pickupMarker = L.marker(pickupCoords, { icon: pickupIcon }).bindPopup("Pickup Location");
            const hospitalMarker = L.marker(destinationCoords, { icon: hospitalIcon }).bindPopup(destinationHospital.name);
            
            const routeToPickup = L.polyline([currentLocation, pickupCoords], { color: 'var(--color-secondary)', dashArray: '5, 10' });
            const routeToDestination = L.polyline([pickupCoords, destinationCoords], { color: 'var(--color-primary)' });

            const trafficSignals = getPointsOnLine(pickupCoords, destinationCoords, 8);
            const signalMarkers = trafficSignals.map(pos => {
                const isCleared = status === 'en-route' || status === 'at-hospital';
                const color = isCleared ? '#10b981' : 'var(--color-danger)';
                const marker = L.circleMarker(pos, { radius: 6, color, fillColor: color, fillOpacity: 0.8 });
                if (isCleared && status === 'en-route' && marker.getElement()) {
                    marker.getElement().classList.add('leaflet-pulsing-icon');
                }
                return marker;
            });
            
            const newLayers = [pickupMarker, hospitalMarker, routeToPickup, routeToDestination, ...signalMarkers];
            newLayers.forEach(layer => layer.addTo(mapRef.current));
            routeLayersRef.current = newLayers;
        }

    }, [activeAmbulance, destinationHospital]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            <div className="absolute top-3 left-3 right-3 z-[1000] flex justify-between items-start gap-4 pointer-events-none">
                <button
                    onClick={handleRecenter}
                    className="bg-[var(--bg-card)]/80 text-[var(--text-primary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:bg-[var(--bg-light)] transition-colors pointer-events-auto"
                    title="Recenter Map"
                    disabled={isCentering}
                >
                    <i className={`fas ${isCentering ? 'fa-spinner fa-spin' : 'fa-crosshairs'}`}></i>
                </button>
                <div className="bg-[var(--bg-card)]/80 p-2 rounded-lg shadow-lg backdrop-blur-sm pointer-events-auto">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search location..."
                            className="bg-[var(--bg-input)] text-[var(--text-primary)] border border-[var(--border-strong)] rounded-l-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] w-48"
                        />
                        <button type="submit" className="bg-[var(--color-secondary)] text-white px-3 py-1 rounded-r-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AmbulanceMap;