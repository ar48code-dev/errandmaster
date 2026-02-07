import { GoogleGenerativeAI } from '@google/generative-ai';

// Default model configuration for Gemini 3
export const MODEL_NAME = 'gemini-3-flash'; // Optimized for hackathon performance

export const MODEL_CONFIG = {
    generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
    },
    safetySettings: [
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
        },
    ],
};

/**
 * Initialize Gemini 3 with a specific API key
 */
export const getGeminiModel = (apiKey) => {
    if (!apiKey) return null;
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: MODEL_NAME,
    });
};
