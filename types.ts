export interface Hospital {
  id: string;
  name: string;
  location: { lat: number; lng: number; address: string };
  treatmentTypes: ('general' | 'ayurvedic' | 'surgery')[];
  costRange: 'low' | 'medium' | 'high';
  distance: number; // in km
  doctors: Doctor[];
  rating: number;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
}

export interface BloodRequest {
  id:string;
  patientName: string;
  bloodType: string;
  location: string;
  hospitalId: string;
  status: 'pending' | 'fulfilled' | 'in-progress';
  timestamp: Date;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodType: string;
  location: string;
  contact: string;
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  baseLocation: string;
  status: 'available' | 'booked' | 'en-route' | 'at-hospital';
  // Booking details for non-available ambulances
  patientName?: string;
  pickupLocation?: string;
  contactNumber?: string;
  bookingTime?: Date;
  // New properties for map tracking
  currentLocation?: { lat: number; lng: number };
  pickupCoords?: { lat: number; lng: number };
  destinationHospitalId?: string;
  // Property for patrol simulation
  patrolTarget?: { lat: number; lng: number };
}


export interface HealthEvent {
  id: string;
  name: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  description: string;
  location: { lat: number; lng: number; address: string };
}

export interface User {
  name: string;
  email: string;
  role: 'patient' | 'hospital' | 'admin';
}

export interface Appointment {
  id: string;
  hospitalName: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
}

export interface SearchResults {
  hospitals: Hospital[];
  donors: BloodDonor[];
  events: HealthEvent[];
}