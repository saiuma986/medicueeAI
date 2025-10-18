
import { GoogleGenAI, Type } from "@google/genai";
import { Hospital, BloodDonor, HealthEvent } from '../types';

const SYSTEM_INSTRUCTION = `You are Ghostfreak, the invisible AI assistant inside Medicube. Your purpose is to help users navigate the app to find hospitals, track ambulances, connect for blood donations, and discover community health events. You must not provide any medical diagnosis, advice, or treatment suggestions. Your tone should be calm, caring, empathetic, and professional. Keep your sentences short and to the point.
Examples:
User: "Find cheap eye surgery hospitals near me."
Ghostfreak: "I can help with that. Here are 3 hospitals nearby with affordable eye surgery options. Would you like to see their details or book an appointment?"

User: "I need A+ blood urgently."
Ghostfreak: "I understand the urgency. I've found 2 hospitals and 3 registered donors nearby with A+ blood. Shall I help you send a request?"

User: "Where is my ambulance?"
Ghostfreak: "I can track the ambulance for you. It appears to be 10 minutes away from your location. The hospital has been notified."
`;

export async function getChatbotResponse(prompt: string): Promise<string> {
    // IMPORTANT: This check is for the hackathon environment.
    // In a real app, the API_KEY would be set in a secure environment.
    if (!process.env.API_KEY) {
        console.warn("API_KEY is not set. Returning a mock response.");
        return new Promise(resolve => setTimeout(() => resolve("This is a mock response as the API key is not configured. I can help you find hospitals, blood donors, or track ambulances. What would you like to do?"), 1000));
    }
    
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.5,
            topP: 0.9,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "I seem to be having trouble connecting. Please try again in a moment.";
  }
}

const SEARCH_SYSTEM_INSTRUCTION = `You are a powerful search assistant for the Medicube healthcare app. Your task is to analyze a user's search query and find relevant items from the provided data context, which includes lists of hospitals, blood donors, and health events. You must respond with a JSON object containing arrays of IDs for the matching items.

- Analyze the query for keywords related to location, specialty, cost, treatment type, blood type, event names, etc.
- Match these keywords against the data provided.
- For location queries, consider the address fields.
- For specialty queries, consider doctor specialties within hospitals.
- Be intelligent in your matching. For example, "heart doctor" should match "Cardiologist". "Cheap" should match "low" costRange.
- If the query is vague, return a broader set of results. If it's specific, narrow them down.
- Only return the IDs of the matching items in the specified JSON format. Do not return any other text or explanation.`;

export async function getSearchResults(
    query: string,
    hospitals: Hospital[],
    donors: BloodDonor[],
    events: HealthEvent[]
): Promise<{ hospitals: string[], donors: string[], events: string[] }> {
    if (!process.env.API_KEY) {
        console.warn("API_KEY is not set for search. This feature will not work. Falling back to local search.");
        return { hospitals: [], donors: [], events: [] };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Simplified data for context to reduce tokens
        const dataContext = `
        Here is the data to search from:
        Hospitals: ${JSON.stringify(hospitals.map(({ id, name, location, treatmentTypes, costRange, doctors, rating }) => ({ id, name, location: location.address, treatmentTypes, costRange, specialties: doctors.map(d => d.specialty), rating })))}
        Donors: ${JSON.stringify(donors.map(({id, name, bloodType, location}) => ({id, name, bloodType, location})))}
        Events: ${JSON.stringify(events.map(({id, name, hospitalName, description, location}) => ({id, name, hospitalName, description, location: location.address})))}
        `;

        const prompt = `User query: "${query}"\n\n${dataContext}`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: SEARCH_SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        hospitals: {
                            type: Type.ARRAY,
                            description: "Array of string IDs of matching hospitals.",
                            items: { type: Type.STRING }
                        },
                        donors: {
                            type: Type.ARRAY,
                            description: "Array of string IDs of matching blood donors.",
                            items: { type: Type.STRING }
                        },
                        events: {
                            type: Type.ARRAY,
                            description: "Array of string IDs of matching health events.",
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["hospitals", "donors", "events"]
                }
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return result;

    } catch (error) {
        console.error("Error fetching search results from Gemini API:", error);
        // Fallback or error indication
        return { hospitals: [], donors: [], events: [] };
    }
}
