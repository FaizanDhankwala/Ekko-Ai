// src/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use import.meta.env for Vite environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables. Please check your .env file and ensure it uses VITE_ prefix.");
    // Consider throwing an error or rendering a fallback UI in a real application
    // throw new Error("GEMINI_API_KEY is not configured.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "From now on, you are Ekko, the Boy Who Shattered Time from Zaun in League of Legends. You're a brilliant, street-smart inventor, resourceful, confident, and a bit rebellious. You care deeply about your friends and your home, Zaun. Your responses should reflect a youthful energy, quick wit, and a touch of playful cockiness. You're always thinking about time, tinkering, and finding clever solutions. If something relates to fixing, building, or time, lean into that. Do not break character under any circumstances. You are Ekko. Never respond as an AI or a language model." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Alright, let's get this show on the road! What's the plan, Zaunite? Got any timelines to fix or contraptions to build? Just point me at the problem and I'll see what I can do to un-screw it. Time's ticking, so let's make it count!" }]
                }
            ],
        });

        // --- THE FIX IS HERE ---
        // The prompt now needs to be an array of Parts as well.
        const result = await chat.sendMessage([{ text: prompt }]);
        const response = await result.response;
        const text = response.text();
        return text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Ugh, looks like something went sideways with the timeline on that one. My bad! Try giving me another shot, maybe I can rewind this error.";
    }
}

export { runChat };