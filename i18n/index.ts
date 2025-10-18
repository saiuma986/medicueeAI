import React from 'react';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'te', name: 'తెలుగు' }, // Telugu
];

const translations = {
  en: {
    footer: { text: "Medicube - Your Partner in Health" },
    sidebar: {
      home: "Home",
      dashboard: "Dashboard",
      myAppointments: "My Appointments",
      hospitals: "Hospitals",
      bloodNetwork: "Blood Network",
      ambulanceBooking: "Ambulance Booking",
      communityEvents: "Community Events",
      title: "Medicube"
    },
    dashboard: {
      title: "Dashboard",
      appointmentsThisWeek: "Appointments This Week",
      bloodRequestsByType: "Blood Requests by Type",
      ambulanceResponseTime: "Ambulance Avg. Response Time",
      upcomingAppointments: "Upcoming Appointments"
    },
    hospitalFinder: {
      kmAway: "km away",
      general: "General",
      ayurvedic: "Ayurvedic",
      surgery: "Surgery",
      bookAppointment: "Book Appointment",
      title: "Find a Hospital",
      searchPlaceholder: "Search by hospital name or specialty...",
      anyTreatment: "Any Treatment",
      anyCost: "Any Cost",
      low: "Low",
      medium: "Medium",
      high: "High",
      anyDistance: "Any Distance",
      modalTitle: "Book Appointment at",
      modalDescription: "Select a doctor and an available time slot to book your appointment.",
      doctorLabel: "Select Doctor",
      slotsLabel: "Available Slots",
      cancel: "Cancel",
      confirmBooking: "Confirm Booking"
    },
    bloodNetwork: {
      status: {
        pending: "Pending",
        fulfilled: "Fulfilled",
        "in-progress": "In Progress"
      },
      minsAgo: "mins ago",
      contactDonor: "Contact Donor",
      title: "Blood Network",
      requestBlood: "Request Blood",
      registerDonor: "Register as Donor",
      urgentRequests: "Urgent Requests",
      recentlyFulfilled: "Recently Fulfilled",
      registeredDonors: "Registered Donors",
      requestBloodModal: {
        title: "Request Blood",
        patientNameLabel: "Patient Name",
        bloodTypeLabel: "Blood Type",
        locationLabel: "Hospital / Location",
        submitButton: "Submit Request"
      },
      registerDonorModal: {
        title: "Register as a Donor",
        nameLabel: "Full Name",
        bloodTypeLabel: "Blood Type",
        locationLabel: "City, State",
        contactLabel: "Contact (Email/Phone)",
        submitButton: "Register"
      },
      contactDonorModal: {
        title: "Contact Donor",
        nameLabel: "Name",
        bloodTypeLabel: "Blood Type",
        locationLabel: "Location",
        contactLabel: "Contact Information",
        closeButton: "Close"
      }
    },
    ambulanceBooking: {
      status: {
        available: "Available",
        booked: "Booked",
        "en-route": "En-Route",
        "at-hospital": "At Hospital"
      },
      title: "Ambulance Tracker",
      requestService: "Emergency Ambulance Service",
      availableText: "Ambulances Available for Booking",
      noneAvailableText: "No ambulances currently available",
      bookAmbulance: "Book Ambulance Now",
      fleetStatus: "Live Fleet Status",
      modal: {
        title: "Book an Ambulance",
        confirmTitle: "Confirm Booking Details",
        patientName: "Patient Name",
        pickupLocation: "Pickup Location",
        contact: "Contact Number",
        destination: "Destination Hospital",
        submitButton: "Confirm Booking",
        cancelButton: "Cancel",
        goBackAndEdit: "Go Back & Edit",
        confirmAndDispatch: "Confirm & Dispatch"
      },
      activeBooking: {
        title: "Your Ambulance Details",
        subtitle: "Your ambulance is on its way. Please find the details below.",
        vehicleNumber: "Vehicle Number",
        patientName: "Patient Name",
        pickupLocation: "Pickup Location",
        destination: "Destination",
        bookingTime: "Booking Time",
        cancelBooking: "Cancel Booking",
        trafficPoliceCoordination: "Traffic Police Coordination",
        status: {
            booked: "Booked",
            "en-route": "En-Route",
            "at-hospital": "At Hospital"
        }
      },
      cancelModal: {
        title: "Confirm Cancellation",
        message: "Are you sure you want to cancel your ambulance booking? This action cannot be undone.",
        keepButton: "Keep Booking",
        confirmButton: "Yes, Cancel"
      }
    },
    trafficControlDashboard: {
        title: "Traffic Control Dashboard",
        alertBanner: "INCOMING EMERGENCY: AMBULANCE EN-ROUTE",
        vehicleNumber: "Vehicle No.",
        eta: "ETA to Destination",
        currentLocation: "Current Location / Heading From",
        actionLogTitle: "Traffic Clearance Action Log"
    },
    communityEvents: {
      register: "Register",
      registered: "Registered",
      hostedBy: "Hosted by:",
      registrationSuccess: "Successfully registered for",
      title: "Community Health Events",
      modal: {
        title: "Confirm Registration",
        message: "You are about to register for the following event:",
        eventName: "Event",
        date: "Date",
        location: "Location",
        confirmButton: "Confirm Registration",
        cancelButton: "Cancel"
      }
    },
    chatbot: {
      initialMessage: "Hello! I'm Ghostfreak, your AI assistant. How can I help you find hospitals, donors, or ambulances today?",
      title: "Medicube Assistant",
      placeholder: "Type your message...",
      send: "Send"
    },
    home: {
      title: "Welcome to Medicube",
      subtitle: "Your unified platform for finding hospitals, connecting with blood donors, and tracking ambulances in real-time.",
      login: "Login",
      register: "Register",
      findHospitalsTitle: "Find Hospitals",
      findHospitalsDesc: "Search and filter hospitals by specialty, cost, and location.",
      bloodNetworkTitle: "Blood Network",
      bloodNetworkDesc: "Connect with donors and request blood in emergencies.",
      ambulanceBookingTitle: "Ambulance Booking",
      ambulanceBookingDesc: "Track and book ambulances with live status updates.",
      communityEventsTitle: "Community Events",
      communityEventsDesc: "Discover health camps and workshops near you."
    },
    login: {
      title: "Login to your Account",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      loginButton: "Login",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
      iAmA: "I am a...",
      patient: "Patient",
      hospital: "Hospital"
    },
    register: {
      title: "Create a New Account",
      nameLabel: "Full Name",
      hospitalNameLabel: "Hospital Name",
      addressLabel: "Address",
      hospitalTypeLabel: "Type of Hospital",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      registerButton: "Register",
      haveAccount: "Already have an account?",
      loginHere: "Login here",
      iAmA: "I am a...",
      patient: "Patient",
      hospital: "Hospital"
    },
    header: {
      searchPlaceholder: "Search anything...",
      language: "Select Language",
      welcome: "Welcome",
      signOut: "Sign Out"
    },
    myAppointments: {
      cancel: "Cancel",
      reschedule: "Reschedule",
      title: "My Appointments",
      noAppointments: "You have no upcoming appointments.",
      rescheduleModal: {
          title: "Reschedule Appointment",
          description: "Please select a new available time slot for your appointment.",
          confirmButton: "Confirm Reschedule"
      },
      cancelModal: {
          title: "Confirm Cancellation",
          message: "Are you sure you want to cancel this appointment? This action cannot be undone.",
          keepButton: "Keep Appointment",
          confirmButton: "Yes, Cancel"
      }
    },
    searchResults: {
        title: "Search Results for",
        hospitals: "Hospitals",
        donors: "Blood Donors",
        events: "Events",
        noResults: "No results found for your query."
    }
  },
  hi: { // Partial Hindi translations for demonstration
    footer: { text: "मेडिक्यूब - स्वास्थ्य में आपका साथी" },
    sidebar: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      myAppointments: "मेरी नियुक्तियाँ",
      hospitals: "अस्पताल",
      bloodNetwork: "ब्लड नेटवर्क",
      ambulanceBooking: "एम्बुलेंस बुकिंग",
      communityEvents: "सामुदायिक कार्यक्रम",
      title: "मेडिक्यूब"
    },
    home: {
      title: "मेडिक्यूब में आपका स्वागत है",
      subtitle: "अस्पतालों को खोजने, रक्त दाताओं से जुड़ने और वास्तविक समय में एम्बुलेंस को ट्रैक करने के लिए आपका एकीकृत मंच।",
      login: "लॉग इन करें",
      register: "पंजीकरण करें",
    },
    login: {
      title: "अपने खाते में પ્રવેશ करें",
      iAmA: "मैं एक...",
      patient: "मरीज़",
      hospital: "अस्पताल"
    },
    register: {
      title: "नया खाता बनाएं",
      nameLabel: "पूरा नाम",
      hospitalNameLabel: "अस्पताल का नाम",
      addressLabel: "पता",
      hospitalTypeLabel: "अस्पताल का प्रकार",
      emailLabel: "ईमेल पता",
      passwordLabel: "पासवर्ड",
      registerButton: "पंजीकरण करें",
      haveAccount: "पहले से ही एक खाता है?",
      loginHere: "यहां लॉगिन करें",
      iAmA: "मैं एक...",
      patient: "मरीज़",
      hospital: "अस्पताल"
    },
    ambulanceBooking: {
      modal: {
        confirmTitle: "बुकिंग विवरण की पुष्टि करें",
        goBackAndEdit: "वापस जाएं और संपादित करें",
        confirmAndDispatch: "पुष्टि करें और भेजें",
        destination: "गंतव्य अस्पताल"
      },
      activeBooking: {
        title: "आपकी एम्बुलेंस का विवरण",
        subtitle: "आपकी एम्बुलेंस रास्ते में है। कृपया नीचे विवरण देखें।",
        vehicleNumber: "गाडी नंबर",
        patientName: "मरीज का नाम",
        pickupLocation: "पिकअप स्थान",
        destination: "गंतव्य",
        bookingTime: "बुकिंग का समय",
        cancelBooking: "बुकिंग रद्द करें",
        trafficPoliceCoordination: "यातायात पुलिस समन्वय",
        status: {
            booked: "बुक हो गई",
            "en-route": "रास्ते में",
            "at-hospital": "अस्पताल में"
        }
      },
      cancelModal: {
        title: "रद्दीकरण की पुष्टि करें",
        message: "क्या आप वाकई अपनी एम्बुलेंस बुकिंग रद्द करना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।",
        keepButton: "बुकिंग रखें",
        confirmButton: "हाँ, रद्द करें"
      }
    },
    trafficControlDashboard: {
        title: "यातायात नियंत्रण डैशबोर्ड",
        alertBanner: "आपातकालीन सूचना: एम्बुलेंस रास्ते में है",
        vehicleNumber: "गाड़ी संख्या",
        eta: "गंतव्य तक ETA",
        currentLocation: "वर्तमान स्थान / से जा रही है",
        actionLogTitle: "यातायात निकासी एक्शन लॉग"
    },
    communityEvents: {
      register: "पंजीकरण करें",
      registered: "पंजीकृत",
      hostedBy: "द्वारा आयोजित:",
      registrationSuccess: "के लिए सफलतापूर्वक पंजीकृत",
      title: "सामुदायिक स्वास्थ्य कार्यक्रम",
      modal: {
        title: "पंजीकरण की पुष्टि करें",
        message: "आप निम्नलिखित कार्यक्रम के लिए पंजीकरण करने जा रहे हैं:",
        eventName: "कार्यक्रम",
        date: "दिनांक",
        location: "स्थान",
        confirmButton: "पंजीकरण की पुष्टि करें",
        cancelButton: "रद्द करें"
      }
    },
    myAppointments: {
      cancel: "रद्द करें",
      reschedule: "पुनर्निर्धारित करें",
      title: "मेरी नियुक्तियाँ",
      noAppointments: "आपकी कोई आगामी नियुक्तियाँ नहीं हैं।",
      rescheduleModal: {
          title: "अपॉइंटमेंट को पुनर्निर्धारित करें",
          description: "कृपया अपनी अपॉइंटमेंट के लिए एक नया उपलब्ध समय स्लॉट चुनें।",
          confirmButton: "पुनर्निर्धारण की पुष्टि करें"
      },
      cancelModal: {
        title: "रद्दीकरण की पुष्टि करें",
        message: "क्या आप वाकई इस अपॉइंटमेंट को रद्द करना चाहते हैं? यह कार्रवाई पूर्ववत नहीं की जा सकती।",
        keepButton: "अपॉइंटमेंट रखें",
        confirmButton: "हाँ, रद्द करें"
      }
    }
  },
  te: {
    footer: { text: "మెడిక్యూబ్ - మీ ఆరోగ్య భాగస్వామి" },
    sidebar: {
      home: "హోమ్",
      dashboard: "డాష్‌బోర్డ్",
      myAppointments: "నా అపాయింట్‌మెంట్లు",
      hospitals: "ఆసుపత్రులు",
      bloodNetwork: "బ్లడ్ నెట్‌వర్క్",
      ambulanceBooking: "అంబులెన్స్ బుకింగ్",
      communityEvents: "కమ్యూనిటీ ఈవెంట్‌లు",
      title: "మెడిక్యూబ్"
    },
    dashboard: {
      title: "డాష్‌బోర్డ్",
      appointmentsThisWeek: "ఈ వారం అపాయింట్‌మెంట్లు",
      bloodRequestsByType: "రకం వారీగా రక్త అభ్యర్థనలు",
      ambulanceResponseTime: "అంబులెన్స్ సగటు స్పందన సమయం",
      upcomingAppointments: "రాబోయే అపాయింట్‌మెంట్లు"
    },
    hospitalFinder: {
      kmAway: "కి.మీ దూరంలో",
      general: "జనరల్",
      ayurvedic: "ఆయుర్వేదిక్",
      surgery: "సర్జరీ",
      bookAppointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
      title: "ఆసుపత్రిని కనుగొనండి",
      searchPlaceholder: "ఆసుపత్రి పేరు లేదా స్పెషాలిటీ ద్వారా శోధించండి...",
      anyTreatment: "ఏదైనా చికిత్స",
      anyCost: "ఏదైనా ఖర్చు",
      low: "తక్కువ",
      medium: "మధ్యస్థం",
      high: "అధికం",
      anyDistance: "ఏదైనా దూరం",
      modalTitle: "లో అపాయింట్‌మెంట్ బుక్ చేయండి",
      modalDescription: "మీ అపాయింట్‌మెంట్‌ను బుక్ చేసుకోవడానికి ఒక డాక్టర్‌ను మరియు అందుబాటులో ఉన్న టైమ్ స్లాట్‌ను ఎంచుకోండి.",
      doctorLabel: "డాక్టర్‌ను ఎంచుకోండి",
      slotsLabel: "అందుబాటులో ఉన్న స్లాట్‌లు",
      cancel: "రద్దు చేయి",
      confirmBooking: "బుకింగ్ నిర్ధారించండి"
    },
    bloodNetwork: {
      status: {
        pending: "పెండింగ్‌లో ఉంది",
        fulfilled: "పూర్తయింది",
        "in-progress": "ప్రోగ్రెస్‌లో ఉంది"
      },
      minsAgo: "నిమిషాల క్రితం",
      contactDonor: "దాతను సంప్రదించండి",
      title: "బ్లడ్ నెట్‌వర్క్",
      requestBlood: "రక్తం అభ్యర్థించండి",
      registerDonor: "దాతగా నమోదు చేసుకోండి",
      urgentRequests: "అత్యవసర అభ్యర్థనలు",
      recentlyFulfilled: "ఇటీవల పూర్తయినవి",
      registeredDonors: "నమోదైన దాతలు",
      requestBloodModal: {
        title: "రక్తం అభ్యర్థించండి",
        patientNameLabel: "రోగి పేరు",
        bloodTypeLabel: "రక్త వర్గం",
        locationLabel: "ఆసుపత్రి / ప్రదేశం",
        submitButton: "అభ్యర్థనను సమర్పించండి"
      },
      registerDonorModal: {
        title: "దాతగా నమోదు చేసుకోండి",
        nameLabel: "పూర్తి పేరు",
        bloodTypeLabel: "రక్త వర్గం",
        locationLabel: "నగరం, రాష్ట్రం",
        contactLabel: "సంప్రదింపు (ఇమెయిల్/ఫోన్)",
        submitButton: "నమోదు చేసుకోండి"
      },
      contactDonorModal: {
        title: "దాతను సంప్రదించండి",
        nameLabel: "పేరు",
        bloodTypeLabel: "రక్త వర్గం",
        locationLabel: "ప్రదేశం",
        contactLabel: "సంప్రదింపు సమాచారం",
        closeButton: "మూసివేయండి"
      }
    },
    ambulanceBooking: {
      status: {
        available: "అందుబాటులో ఉంది",
        booked: "బుక్ చేయబడింది",
        "en-route": "మార్గమధ్యంలో ఉంది",
        "at-hospital": "ఆసుపత్రిలో ఉంది"
      },
      title: "అంబులెన్స్ ట్రాకర్",
      requestService: "అత్యవసర అంబులెన్స్ సేవ",
      availableText: "అంబులెన్స్‌లు బుకింగ్ కోసం అందుబాటులో ఉన్నాయి",
      noneAvailableText: "ప్రస్తుతం అంబులెన్స్‌లు అందుబాటులో లేవు",
      bookAmbulance: "ఇప్పుడే అంబులెన్స్ బుక్ చేయండి",
      fleetStatus: "లైవ్ ఫ్లీట్ స్థితి",
      modal: {
        title: "అంబులెన్స్ బుక్ చేయండి",
        confirmTitle: "బుకింగ్ వివరాలను నిర్ధారించండి",
        patientName: "రోగి పేరు",
        pickupLocation: "పికప్ ప్రదేశం",
        contact: "సంప్రదింపు నంబర్",
        destination: "గమ్యస్థాన ఆసుపత్రి",
        submitButton: "బుకింగ్ నిర్ధారించండి",
        cancelButton: "రద్దు చేయి",
        goBackAndEdit: "వెనక్కి వెళ్లి సవరించండి",
        confirmAndDispatch: "నిర్ధారించి పంపండి"
      },
      activeBooking: {
        title: "మీ అంబులెన్స్ వివరాలు",
        subtitle: "మీ అంబులెన్స్ వస్తోంది. దయచేసి క్రింది వివరాలను కనుగొనండి.",
        vehicleNumber: "వాహనం నంబర్",
        patientName: "రోగి పేరు",
        pickupLocation: "పికప్ ప్రదేశం",
        destination: "గమ్యస్థానం",
        bookingTime: "బుకింగ్ సమయం",
        cancelBooking: "బుకింగ్ రద్దు చేయండి",
        trafficPoliceCoordination: "ట్రాఫిక్ పోలీస్ సమన్వయం",
        status: {
            booked: "బుక్ చేయబడింది",
            "en-route": "మార్గమధ్యంలో ఉంది",
            "at-hospital": "ఆసుపత్రిలో ఉంది"
        }
      },
      cancelModal: {
        title: "రద్దును నిర్ధారించండి",
        message: "మీరు మీ అంబులెన్స్ బుకింగ్‌ను రద్దు చేయాలనుకుంటున్నారా? ఈ చర్యను రద్దు చేయడం సాధ్యం కాదు.",
        keepButton: "బుకింగ్ ఉంచండి",
        confirmButton: "అవును, రద్దు చేయండి"
      }
    },
    trafficControlDashboard: {
        title: "ట్రాఫిక్ కంట్రోల్ డాష్‌బోర్డ్",
        alertBanner: "అత్యవసర హెచ్చరిక: అంబులెన్స్ మార్గమధ్యంలో ఉంది",
        vehicleNumber: "వాహనం నెం.",
        eta: "గమ్యస్థానానికి ETA",
        currentLocation: "ప్రస్తుత ప్రదేశం / నుండి బయలుదేరింది",
        actionLogTitle: "ట్రాఫిక్ క్లియరెన్స్ యాక్షన్ లాగ్"
    },
    communityEvents: {
      register: "నమోదు చేసుకోండి",
      registered: "నమోదు చేయబడింది",
      hostedBy: "నిర్వహించినది:",
      registrationSuccess: "కోసం విజయవంతంగా నమోదు చేసుకున్నారు",
      title: "కమ్యూనిటీ ఆరోగ్య ఈవెంట్‌లు",
      modal: {
        title: "నమోదును నిర్ధారించండి",
        message: "మీరు క్రింది ఈవెంట్ కోసం నమోదు చేసుకోబోతున్నారు:",
        eventName: "ఈవెంట్",
        date: "తేదీ",
        location: "ప్రదేశం",
        confirmButton: "నమోదును నిర్ధారించండి",
        cancelButton: "రద్దు చేయి"
      }
    },
    chatbot: {
      initialMessage: "నమస్కారం! నేను ఘోస్ట్‌ఫ్రీక్, మీ AI సహాయకుడిని. ఈ రోజు నేను మీకు ఆసుపత్రులు, దాతలు లేదా అంబులెన్స్‌లను కనుగొనడంలో ఎలా సహాయపడగలను?",
      title: "మెడిక్యూబ్ సహాయకుడు",
      placeholder: "మీ సందేశాన్ని టైప్ చేయండి...",
      send: "పంపు"
    },
    home: {
      title: "మెడిక్యూబ్‌కు స్వాగతం",
      subtitle: "ఆసుపత్రులను కనుగొనడం, రక్తదాతలతో కనెక్ట్ అవ్వడం మరియు అంబులెన్స్‌లను నిజ-సమయంలో ట్రాక్ చేయడం కోసం మీ ఏకీకృత వేదిక.",
      login: "లాగిన్",
      register: "నమోదు చేసుకోండి",
      findHospitalsTitle: "ఆసుపత్రులను కనుగొనండి",
      findHospitalsDesc: "స్పెషాలిటీ, ఖర్చు మరియు ప్రదేశం వారీగా ఆసుపత్రులను శోధించండి మరియు ఫిల్టర్ చేయండి.",
      bloodNetworkTitle: "బ్లడ్ నెట్‌వర్క్",
      bloodNetworkDesc: "అత్యవసర పరిస్థితుల్లో దాతలతో కనెక్ట్ అవ్వండి మరియు రక్తం అభ్యర్థించండి.",
      ambulanceBookingTitle: "అంబులెన్స్ బుకింగ్",
      ambulanceBookingDesc: "లైవ్ స్టేటస్ అప్‌డేట్‌లతో అంబులెన్స్‌లను ట్రాక్ చేయండి మరియు బుక్ చేయండి.",
      communityEventsTitle: "కమ్యూనిటీ ఈవెంట్‌లు",
      communityEventsDesc: "మీకు సమీపంలో ఉన్న ఆరోగ్య శిబిరాలు మరియు వర్క్‌షాప్‌లను కనుగొనండి."
    },
    login: {
      title: "మీ ఖాతాకు లాగిన్ చేయండి",
      emailLabel: "ఇమెయిల్ చిరునామా",
      passwordLabel: "పాస్‌వర్డ్",
      loginButton: "లాగిన్",
      noAccount: "ఖాతా లేదా?",
      registerHere: "ఇక్కడ నమోదు చేసుకోండి",
      iAmA: "నేను ఒక...",
      patient: "రోగి",
      hospital: "ఆసుపత్రి"
    },
    register: {
      title: "కొత్త ఖాతాను సృష్టించండి",
      nameLabel: "పూర్తి పేరు",
      hospitalNameLabel: "ఆసుపత్రి పేరు",
      addressLabel: "చిరునామా",
      hospitalTypeLabel: "ఆసుపత్రి రకం",
      emailLabel: "ఇమెయిల్ చిరునామా",
      passwordLabel: "పాస్‌వర్డ్",
      registerButton: "నమోదు చేసుకోండి",
      haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
      loginHere: "ఇక్కడ లాగిన్ చేయండి",
      iAmA: "నేను ఒక...",
      patient: "రోగి",
      hospital: "ఆసుపత్రి"
    },
    header: {
      searchPlaceholder: "ఏదైనా శోధించండి...",
      language: "భాషను ఎంచుకోండి",
      welcome: "స్వాగతం",
      signOut: "సైన్ అవుట్"
    },
    myAppointments: {
      cancel: "రద్దు చేయి",
      reschedule: "రీషెడ్యూల్",
      title: "నా అపాయింట్‌మెంట్లు",
      noAppointments: "మీకు రాబోయే అపాయింట్‌మెంట్లు ఏవీ లేవు.",
      rescheduleModal: {
          title: "అపాయింట్‌మెంట్‌ను రీషెడ్యూల్ చేయండి",
          description: "దయచేసి మీ అపాయింట్‌మెంట్ కోసం కొత్తగా అందుబాటులో ఉన్న టైమ్ స్లాట్‌ను ఎంచుకోండి.",
          confirmButton: "రీషెడ్యూల్‌ను నిర్ధారించండి"
      },
      cancelModal: {
        title: "రద్దును నిర్ధారించండి",
        message: "మీరు ఈ అపాయింట్‌మెంట్‌ను రద్దు చేయాలనుకుంటున్నారా? ఈ చర్యను రద్దు చేయడం సాధ్యం కాదు.",
        keepButton: "అపాయింట్‌మెంట్ ఉంచండి",
        confirmButton: "అవును, రద్దు చేయండి"
      }
    },
    searchResults: {
        title: "కోసం శోధన ఫలితాలు",
        hospitals: "ఆసుపత్రులు",
        donors: "రక్త దాతలు",
        events: "ఈవెంట్‌లు",
        noResults: "మీ ప్రశ్న కోసం ఫలితాలు ఏవీ కనుగొనబడలేదు."
    }
  },
};

// Helper to get nested properties
const getNested = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}


interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = React.useState('en');

  const setLanguage = (lang: string) => {
    if (translations[lang as keyof typeof translations]) {
      setLanguageState(lang);
    }
  };

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    const fallbackTranslations = translations.en;
    
    let translated = getNested(langTranslations, key);
    if (translated) {
        return translated;
    }

    translated = getNested(fallbackTranslations, key);
    if (translated) {
        return translated;
    }

    return key;
  };

  // FIX: Replaced JSX with React.createElement. JSX is not valid in .ts files, which was causing parsing errors.
  return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useTranslation = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};