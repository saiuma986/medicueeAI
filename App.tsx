
import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HospitalFinder from './components/HospitalFinder';
import BloodNetwork from './components/BloodNetwork';
import AmbulanceTracker from './components/AmbulanceTracker';
import CommunityEvents from './components/CommunityEvents';
import MyAppointments from './components/MyAppointments';
import Chatbot from './components/Chatbot';
import SearchResultsModal from './components/SearchResultsModal';
import { User, Appointment, BloodRequest, BloodDonor, SearchResults, Hospital, HealthEvent } from './types';
import { LanguageProvider } from './i18n';
import { ThemeProvider } from './components/theme/ThemeContext';
import { mockAppointments, mockBloodRequests, mockDonors, mockHospitals, mockEvents } from './services/mockData';
import { getSearchResults } from './services/geminiService';

export enum Page {
  Home = 'Home',
  Dashboard = 'Dashboard',
  MyAppointments = 'My Appointments',
  Hospitals = 'Hospitals',
  BloodNetwork = 'Blood Network',
  AmbulanceBooking = 'Ambulance Booking',
  CommunityEvents = 'Community Events',
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(mockBloodRequests);
  const [donors, setDonors] = useState<BloodDonor[]>(mockDonors);
  
  // Search state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({ hospitals: [], donors: [], events: [] });
  const [isSearching, setIsSearching] = useState(false);


  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const handleRescheduleAppointment = (appointmentId: string, newDate: string, newTime: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, date: newDate, time: newTime }
        : apt
    ));
    alert('Appointment rescheduled successfully!');
  };

  const handleAddBloodRequest = (requestData: Omit<BloodRequest, 'id' | 'timestamp' | 'status' | 'hospitalId'>) => {
    const newRequest: BloodRequest = {
      id: `br-${Date.now()}`,
      ...requestData,
      hospitalId: 'h-custom', // Assign a generic ID or implement logic to find a matching hospital
      status: 'pending',
      timestamp: new Date(),
    };
    setBloodRequests(prev => [newRequest, ...prev]);
  };
  
  const handleAddDonor = (donorData: Omit<BloodDonor, 'id'>) => {
    const newDonor: BloodDonor = {
      id: `dn-${Date.now()}`,
      ...donorData,
    };
    setDonors(prev => [newDonor, ...prev]);
  };

  const handleLoginSuccess = (userData: Omit<User, 'role'>, role: 'patient' | 'hospital') => {
    setIsAuthenticated(true);
    setUser({ ...userData, role });
    setCurrentPage(Page.Dashboard);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage(Page.Home);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }
    setSearchQuery(query);
    setIsSearchModalOpen(true);
    setIsSearching(true);
    setSearchResults({ hospitals: [], donors: [], events: [] });

    const resultIds = await getSearchResults(query, mockHospitals, mockDonors, mockEvents);

    // Fallback to simple search if Gemini fails or returns no results
    if (!resultIds || (resultIds.hospitals.length === 0 && resultIds.donors.length === 0 && resultIds.events.length === 0)) {
        console.log("Gemini search returned no results or failed, falling back to local filter.");
        const lowerCaseQuery = query.toLowerCase();

        const filteredHospitals = mockHospitals.filter(h => 
            h.name.toLowerCase().includes(lowerCaseQuery) ||
            h.location.address.toLowerCase().includes(lowerCaseQuery) ||
            h.doctors.some(d => d.specialty.toLowerCase().includes(lowerCaseQuery))
        );

        const filteredDonors = mockDonors.filter(d =>
            d.name.toLowerCase().includes(lowerCaseQuery) ||
            d.location.toLowerCase().includes(lowerCaseQuery) ||
            d.bloodType.toLowerCase().includes(lowerCaseQuery)
        );
          
        const filteredEvents = mockEvents.filter(e =>
            e.name.toLowerCase().includes(lowerCaseQuery) ||
            e.hospitalName.toLowerCase().includes(lowerCaseQuery) ||
            e.description.toLowerCase().includes(lowerCaseQuery)
        );

        setSearchResults({
          hospitals: filteredHospitals,
          donors: filteredDonors,
          events: filteredEvents,
        });
    } else {
        const filteredHospitals = mockHospitals.filter(h => resultIds.hospitals.includes(h.id));
        const filteredDonors = mockDonors.filter(d => resultIds.donors.includes(d.id));
        const filteredEvents = mockEvents.filter(e => resultIds.events.includes(e.id));
        
        setSearchResults({
          hospitals: filteredHospitals,
          donors: filteredDonors,
          events: filteredEvents,
        });
    }
    
    setIsSearching(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home setCurrentPage={setCurrentPage} isAuthenticated={isAuthenticated} onAuthSuccess={handleLoginSuccess} />;
      case Page.Dashboard:
        return <Dashboard appointments={appointments} />;
      case Page.MyAppointments:
        return <MyAppointments appointments={appointments} onCancelAppointment={handleCancelAppointment} onRescheduleAppointment={handleRescheduleAppointment} />;
      case Page.Hospitals:
        return <HospitalFinder onAddAppointment={handleAddAppointment} />;
      case Page.BloodNetwork:
        return <BloodNetwork requests={bloodRequests} onAddRequest={handleAddBloodRequest} donors={donors} onAddDonor={handleAddDonor} />;
      case Page.AmbulanceBooking:
        return <AmbulanceTracker />;
      case Page.CommunityEvents:
        return <CommunityEvents />;
      default:
        return <Home setCurrentPage={setCurrentPage} isAuthenticated={isAuthenticated} onAuthSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="bg-[var(--bg-deep)] min-h-screen text-[var(--text-primary)] font-sans transition-colors duration-300">
          <Layout 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onSearch={handleSearch}
          >
            {renderContent()}
          </Layout>
          <Chatbot />
          <SearchResultsModal 
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            query={searchQuery}
            results={searchResults}
            isLoading={isSearching}
          />
        </div>
      </ThemeProvider>
    {/* FIX: Corrected the closing tag for LanguageProvider. It was incorrectly cased and contained a hyphen. */}
    </LanguageProvider>
  );
};

export default App;