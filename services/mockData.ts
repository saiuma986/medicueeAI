import { Hospital, BloodRequest, Ambulance, HealthEvent, Appointment, BloodDonor } from '../types';

export const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'Apollo Spectra Hospital',
    location: { lat: 12.9716, lng: 77.5946, address: 'Koramangala, Bangalore' },
    treatmentTypes: ['surgery', 'general'],
    costRange: 'high',
    distance: 2.5,
    doctors: [
      { id: 'd1', name: 'Dr. Priya Sharma', specialty: 'Cardiologist', availability: ['Mon 10am-12pm', 'Wed 2pm-4pm'] },
      { id: 'd2', name: 'Dr. Rajesh Kumar', specialty: 'Orthopedic Surgeon', availability: ['Tue 9am-11am', 'Fri 3pm-5pm'] },
    ],
    rating: 4.8
  },
  {
    id: 'h2',
    name: 'Manipal Hospital',
    location: { lat: 12.9592, lng: 77.6432, address: 'Old Airport Road, Bangalore' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'medium',
    distance: 5.1,
    doctors: [
      { id: 'd3', name: 'Dr. Anjali Singh', specialty: 'Neurologist', availability: ['Mon 1pm-3pm', 'Thu 10am-12pm'] },
    ],
    rating: 4.5
  },
  {
    id: 'h3',
    name: 'Kottakkal Arya Vaidya Sala',
    location: { lat: 12.9293, lng: 77.6121, address: 'BTM Layout, Bangalore' },
    treatmentTypes: ['ayurvedic'],
    costRange: 'low',
    distance: 8.2,
    doctors: [
      { id: 'd4', name: 'Vaidyan Mohan', specialty: 'Panchakarma', availability: ['Mon-Sat 9am-6pm'] },
    ],
    rating: 4.9
  },
  {
    id: 'h4',
    name: 'Apollo Hospitals, Visakhapatnam',
    location: { lat: 17.7289, lng: 83.3139, address: 'Ram Nagar, Visakhapatnam, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'high',
    distance: 650.5,
    doctors: [
      { id: 'd5', name: 'Dr. Ramesh Naidu', specialty: 'Oncologist', availability: ['Tue 10am-1pm', 'Thu 3pm-5pm'] },
      { id: 'd6', name: 'Dr. Sita Lakshmi', specialty: 'Pediatrician', availability: ['Mon 9am-12pm', 'Fri 2pm-4pm'] },
    ],
    rating: 4.7
  },
  {
    id: 'h5',
    name: 'Manipal Hospitals, Vijayawada',
    location: { lat: 16.5062, lng: 80.6480, address: 'Tadepalli, Vijayawada, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'medium',
    distance: 4.5,
    doctors: [
      { id: 'd7', name: 'Dr. Krishna Reddy', specialty: 'Cardiologist', availability: ['Wed 11am-2pm', 'Sat 10am-1pm'] },
    ],
    rating: 4.6
  },
  {
    id: 'h7',
    name: 'Rainbow Children\'s Hospital',
    location: { lat: 16.4945, lng: 80.6558, address: 'Benz Circle, Vijayawada, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'high',
    distance: 6.2,
    doctors: [
      { id: 'd9', name: 'Dr. Meena Iyer', specialty: 'Pediatrician', availability: ['Mon 10am-1pm', 'Thu 2pm-5pm'] },
      { id: 'd10', name: 'Dr. Vijay Kumar', specialty: 'Pediatric Surgeon', availability: ['Tue 9am-12pm', 'Fri 3pm-6pm'] },
    ],
    rating: 4.9
  },
  {
    id: 'h8',
    name: 'Andhra Hospitals',
    location: { lat: 16.5161, lng: 80.6321, address: 'MG Road, Vijayawada, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'medium',
    distance: 3.1,
    doctors: [
      { id: 'd11', name: 'Dr. Srinivas Rao', specialty: 'General Surgeon', availability: ['Mon-Fri 10am-4pm'] },
      { id: 'd12', name: 'Dr. Lakshmi Devi', specialty: 'Dermatologist', availability: ['Wed 10am-1pm', 'Sat 9am-12pm'] },
    ],
    rating: 4.5
  },
  {
    id: 'h9',
    name: 'Care & Cure Hospital',
    location: { lat: 16.5175, lng: 80.6329, address: 'Governorpet, Vijayawada, AP' },
    treatmentTypes: ['general'],
    costRange: 'medium',
    distance: 3.8,
    doctors: [
      { id: 'd13', name: 'Dr. Anand Joshi', specialty: 'General Physician', availability: ['Mon-Sat 10am-5pm'] }
    ],
    rating: 4.4
  },
  {
    id: 'h10',
    name: 'Global Heart Institute',
    location: { lat: 16.5082, lng: 80.6495, address: 'Labbipet, Vijayawada, AP' },
    treatmentTypes: ['surgery'],
    costRange: 'high',
    distance: 5.5,
    doctors: [
      { id: 'd14', name: 'Dr. Sunitha Murthy', specialty: 'Cardiothoracic Surgeon', availability: ['Tue 10am-1pm', 'Fri 2pm-5pm'] }
    ],
    rating: 4.9
  },
  {
    id: 'h11',
    name: 'NRI General Hospital',
    location: { lat: 16.5413, lng: 80.7259, address: 'Chinakakani, Vijayawada, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'medium',
    distance: 12.0,
    doctors: [
      { id: 'd15', name: 'Dr. Venkat Rao', specialty: 'Nephrologist', availability: ['Mon 10am-1pm', 'Wed 3pm-5pm'] },
      { id: 'd16', name: 'Dr. Padma Sri', specialty: 'Gynecologist', availability: ['Tue 9am-12pm', 'Fri 2pm-4pm'] }
    ],
    rating: 4.6
  },
  {
    id: 'h12',
    name: 'Kamineni Hospitals',
    location: { lat: 16.5125, lng: 80.6558, address: 'Poranki, Vijayawada, AP' },
    treatmentTypes: ['general', 'surgery'],
    costRange: 'high',
    distance: 7.8,
    doctors: [
      { id: 'd17', name: 'Dr. Murali Krishna', specialty: 'Orthopedic Surgeon', availability: ['Thu 11am-2pm', 'Sat 10am-1pm'] }
    ],
    rating: 4.7
  },
  {
    id: 'h13',
    name: 'Sentini Hospitals',
    location: { lat: 16.5011, lng: 80.6653, address: 'Near Benz Circle, Vijayawada, AP' },
    treatmentTypes: ['general'],
    costRange: 'medium',
    distance: 6.5,
    doctors: [
      { id: 'd18', name: 'Dr. Ayesha Khan', specialty: 'Pulmonologist', availability: ['Mon 9am-12pm', 'Wed 2pm-5pm'] }
    ],
    rating: 4.5
  },
  {
    id: 'h6',
    name: 'SVIMS, Tirupati',
    location: { lat: 13.6288, lng: 79.4192, address: 'Alipiri Road, Tirupati, AP' },
    treatmentTypes: ['general', 'ayurvedic'],
    costRange: 'low',
    distance: 250.8,
    doctors: [
      { id: 'd8', name: 'Dr. Govind Rajan', specialty: 'General Physician', availability: ['Mon-Fri 9am-5pm'] },
    ],
    rating: 4.8
  }
];

export const mockBloodRequests: BloodRequest[] = [
    { id: 'br1', patientName: 'Rohan Verma', bloodType: 'A+', location: 'Apollo Hospital', hospitalId: 'h1', status: 'pending', timestamp: new Date(Date.now() - 3600 * 1000 * 1) },
    { id: 'br2', patientName: 'Sita Menon', bloodType: 'O-', location: 'Manipal Hospital', hospitalId: 'h2', status: 'fulfilled', timestamp: new Date(Date.now() - 3600 * 1000 * 5) },
    { id: 'br3', patientName: 'Amit Patel', bloodType: 'B+', location: 'City General', hospitalId: 'h1', status: 'in-progress', timestamp: new Date(Date.now() - 3600 * 1000 * 0.5) },
];

export const mockDonors: BloodDonor[] = [
    { id: 'dn1', name: 'Priya Singh', bloodType: 'O+', location: 'Vijayawada, AP', contact: 'user@example.com' },
    { id: 'dn2', name: 'Arjun Reddy', bloodType: 'B+', location: 'Bangalore, KA', contact: 'user@example.com' },
    { id: 'dn3', name: 'Meera Kumar', bloodType: 'A-', location: 'Vijayawada, AP', contact: 'user@example.com' },
];

export const mockAmbulances: Ambulance[] = [
    { 
        id: 'a1', 
        vehicleNumber: 'AP-16-G-1234', 
        baseLocation: 'Vijayawada Central', 
        status: 'available',
        currentLocation: { lat: 16.5161, lng: 80.6321 }, // Near Andhra Hospitals
    },
    { 
        id: 'a2', 
        vehicleNumber: 'AP-16-H-5678', 
        baseLocation: 'Vijayawada East', 
        status: 'available',
        currentLocation: { lat: 16.5125, lng: 80.6558 } // Near Kamineni Hospitals
    },
    { 
        id: 'a3', 
        vehicleNumber: 'AP-16-J-9101', 
        baseLocation: 'Vijayawada West', 
        status: 'available',
        currentLocation: { lat: 16.5011, lng: 80.6653 } // Near Sentini Hospitals
    },
    { 
        id: 'a4', 
        vehicleNumber: 'AP-16-K-4321', 
        baseLocation: 'Vijayawada North', 
        status: 'available',
        currentLocation: { lat: 16.5413, lng: 80.7259 } // Near NRI General Hospital
    },
    { 
        id: 'a5', 
        vehicleNumber: 'AP-16-X-1111', 
        baseLocation: 'Vijayawada South', 
        status: 'available',
        currentLocation: { lat: 16.4945, lng: 80.6558 } // Near Rainbow Children's Hospital
    },
];

export const mockEvents: HealthEvent[] = [
    { id: 'e1', name: 'Free Cardiac Check-up Camp', hospitalId: 'h1', hospitalName: 'Apollo Spectra Hospital', date: '2024-08-15', description: 'Comprehensive cardiac health check-up including ECG and consultation.', location: { lat: 12.9716, lng: 77.5946, address: 'Koramangala, Bangalore' } },
    { id: 'e2', name: 'Ayurvedic Wellness Workshop', hospitalId: 'h3', hospitalName: 'Kottakkal Arya Vaidya Sala', date: '2024-08-20', description: 'Learn about daily routines for a healthy life according to Ayurveda.', location: { lat: 12.9293, lng: 77.6121, address: 'BTM Layout, Bangalore' } },
];

export const mockAppointments: Appointment[] = [
    { id: 'apt1', hospitalName: 'Apollo Spectra Hospital', doctorName: 'Dr. Priya Sharma', specialty: 'Cardiologist', date: '2024-08-10', time: '11:00 AM' },
    { id: 'apt2', hospitalName: 'Manipal Hospital', doctorName: 'Dr. Anjali Singh', specialty: 'Neurologist', date: '2024-08-12', time: '02:30 PM' },
    { id: 'apt3', hospitalName: 'Kottakkal Arya Vaidya Sala', doctorName: 'Vaidyan Mohan', specialty: 'Panchakarma', date: '2024-08-15', time: '09:30 AM' },
];

export const dashboardData = {
    appointments: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [12, 19, 3, 5, 2, 3, 9],
    },
    bloodRequests: {
        labels: ['A+', 'O-', 'B+', 'AB+'],
        values: [8, 5, 10, 3],
    },
    ambulanceResponse: {
        labels: ['<5min', '5-10min', '10-15min', '>15min'],
        values: [6, 15, 7, 2],
    }
};