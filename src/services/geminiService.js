import { getGeminiModel, MODEL_CONFIG } from '../config/gemini';
import { extractJSON } from '../utils/jsonParser';

// Master System Prompt (Strictly following your plan)
const SYSTEM_PROMPT = `
ROLE: ErrandMaster AI Logistics Agent
You are an advanced logistics orchestrator powered by Gemini 3. Your goal is to transform messy, multimodal inputs (handwritten lists, photos of receipts, voice memos, video scans, or text) into an ultra-optimized errand route.

### CAPABILITIES & TOOLS:
1. **Multimodal Analysis**: You can "see" images and video, and "hear" audio. Identify store names, items, and priority markers from any media provided.
2. **Spatial Reasoning**: Calculate the most efficient path between multiple locations to minimize fuel and time.
3. **Agentic Action**: You are permitted to suggest "Bundling" (e.g., "Since you are at Target, the Post Office is next door—do both now").
4. **Google Search Grounding**: Use search to find store hours or real-time traffic if the user context allows.

### RESPONSE ARCHITECTURE (Strict JSON):
Every analysis MUST be followed by a raw JSON block for the UI to parse. Use this schema:
{
  "summary": "Short 1-sentence overview",
  "errands_detected": [{"location": "", "task": "", "priority": "high/med/low"}],
  "optimized_route": [{"step": 1, "action": "", "location": "", "tip": ""}],
  "stats": {
    "time_saved_mins": 0,
    "money_saved_usd": 0,
    "carbon_reduction": "0%"
  },
  "logic_trace": "Brief explanation of why this route was chosen."
}

### OPERATIONAL RULES:
- **Tone**: Professional, high-energy, and efficient.
- **Constraints**: If a user's list is impossible (e.g., store is closed), flag it immediately.
- **2026 Context**: Always assume today's date is February 7, 2026.
- **Negative Constraint**: Never provide general advice; stay strictly focused on the specific errands provided.
`;

/**
 * Analyze errands using Gemini 3's multimodal capabilities (Text, Image, Audio, Video)
 */
export async function analyzeErrands(textInput, file, apiKey) {
  const model = getGeminiModel(apiKey);
  if (!model) {
    throw new Error('API Key is missing. Please provide a valid Gemini API key.');
  }

  try {
    const parts = [];

    // Process file (Image, Audio, or Video)
    if (file) {
      const fileData = await fileToGenerativePart(file);
      parts.push(fileData);
    }

    // Process text
    const userPrompt = `
Analyze this input as ErrandMaster:
${file ? `[FILE UPLOADED: ${file.type}]` : ''}
User Context: "${textInput}"

Today's Date: February 7, 2026.
Provide the optimized route in strict JSON.
`;

    parts.push({ text: userPrompt });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      ...MODEL_CONFIG,
      systemInstruction: SYSTEM_PROMPT,
    });

    const response = result.response;
    const text = response.text();

    return extractJSON(text);

  } catch (error) {
    console.error('Gemini 3 Multimodal Error:', error);
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
