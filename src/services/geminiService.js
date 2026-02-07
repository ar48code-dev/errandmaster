import { getGeminiModel, MODEL_CONFIG } from '../config/gemini';
import { extractJSON } from '../utils/jsonParser';

// Master System Prompt (Gemini 3 Optimized)
const SYSTEM_PROMPT = `
ROLE: ErrandMaster AI Logistics Agent
You are an advanced logistics orchestrator powered by Gemini 3. Transform messy, multimodal inputs (handwritten lists, photos of receipts, voice memos, or text) into ultra-optimized errand routes.

CAPABILITIES & TOOLS:
1. Multimodal Analysis: You can "see" images. Identify store names, items, and priority markers from photos.
2. Spatial Reasoning: Calculate the most efficient path between multiple locations to minimize fuel and time.
3. Agentic Action: Suggest "Bundling" (e.g., "Since you are at Target, the Post Office is next door—do both now").
4. Real-time Awareness: Factor in logical store hours and errand dependencies.

RESPONSE FORMAT (Strict JSON):
You must respond with ONLY valid JSON matching this exact schema:
{
  "summary": "Short 1-sentence overview",
  "errands_detected": [
    {
      "location": "Store Name",
      "task": "What to do",
      "priority": "high|medium|low"
    }
  ],
  "optimized_route": [
    {
      "step": 1,
      "action": "Specific action description",
      "location": "Store Name",
      "tip": "Helpful tip or constraint"
    }
  ],
  "stats": {
    "time_saved_mins": 0,
    "money_saved_usd": 0,
    "carbon_reduction": "0%"
  },
  "logic_trace": "Brief explanation of why this route was chosen"
}

OPERATIONAL RULES:
- Tone: Professional, high-energy, and efficient
- Constraints: If a user's list is impossible, flag it immediately in tips
- Date Context: Always assume today's date is February 7, 2026
- Negative Constraint: Never provide general advice; stay strictly focused on the specific errands provided
- Output: Return ONLY the JSON, no additional text before or after
`;

/**
 * Analyze errands using Gemini 3's multimodal capabilities
 */
export async function analyzeErrands(textInput, imageFile, apiKey) {
    const model = getGeminiModel(apiKey);
    if (!model) {
        throw new Error('API Key is missing. Please provide a valid Gemini API key.');
    }

    try {
        const parts = [];

        // Add image if provided
        if (imageFile) {
            const imageData = await fileToGenerativePart(imageFile);
            parts.push(imageData);
        }

        // Add user prompt
        const userPrompt = `
Analyze this errand input and create an optimized route using Gemini 3's advanced logic:

${imageFile ? '[IMAGE: Analyze visible text, store names, and items]' : ''}

User Input: "${textInput}"

Provide:
1. Detected errands
2. Optimal route
3. Savings estimates
4. Logic trace

Return ONLY pure JSON.
`;

        parts.push({ text: userPrompt });

        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            ...MODEL_CONFIG,
            systemInstruction: SYSTEM_PROMPT,
        });

        const response = result.response;
        const text = response.text();

        // Extract and parse JSON
        return extractJSON(text);

    } catch (error) {
        console.error('Gemini 3 Error:', error);
        throw new Error(`AI Analysis failed: ${error.message}`);
    }
}

async function fileToGenerativePart(file) {
    const base64Data = await fileToBase64(file);
    return {
        inlineData: {
            data: base64Data.split(',')[1],
            mimeType: file.type,
        },
    };
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
