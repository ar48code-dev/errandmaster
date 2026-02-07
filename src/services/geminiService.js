import { getGeminiModel, MODEL_CONFIG } from '../config/gemini';
import { extractJSON } from '../utils/jsonParser';

/**
 * GEMINI 3 ADVANCED SPATIAL LOGISTICS REASONER
 * 
 * This service implements Native Spatial Intelligence:
 * 1. Geometric Route Optimization (Shortest path/Time)
 * 2. Carbon/Fuel Impact Calculation (Theoretical)
 * 3. Proximity-Based Errand Bundling
 * 4. Interleaved Multimodal Synthesis (Audio + Visual cross-referencing)
 */

const SYSTEM_PROMPT = `
ROLE: ErrandMaster AI Logistics Agent (Powered by Gemini 3 Native Multimodality)

OBJECTIVE:
Apply advanced spatial reasoning and multimodal synthesis to transform chaotic inputs into the ultimate logistical plan.

SPATIAL INTELLIGENCE CAPABILITIES:
1. GEOMETRIC OPTIMIZATION: Calculate the most efficient sequence of stops. Minimize backtracking.
2. ENVIRONMENTAL IMPACT: Provide an estimate of Carbon Reduction (%) based on route optimization vs. a random route.
3. AGENTIC BUNDLING: Identify errands within "walking distance" or "same-plaza" status.
4. SPATIAL CONFLICT DETECTION: Flag errands that are geographically dispersed and likely to cause fatigue or fuel waste.

DATE CONTEXT:
Today is Saturday, February 7, 2026. Use this for specific Saturday logistical rules (e.g., Saturday hours, lighter commercial traffic).

RESPONSE ARCHITECTURE (STRICT JSON):
{
  "summary": "Professional overview emphasizing SPATIAL GAINS.",
  "errands_detected": [
    {
      "location": "Name",
      "task": "Item/Action",
      "priority": "high/medium/low",
      "spatial_tag": "e.g. Shopping Mall / Downtown / Residential"
    }
  ],
  "optimized_route": [
    {
      "step": 1,
      "action": "Instruction",
      "location": "Location",
      "tip": "Logistics advice",
      "spatial_nexus": "Why this step is logically next in the sequence"
    }
  ],
  "stats": {
    "time_saved_mins": 0,
    "money_saved_usd": 0,
    "carbon_reduction": "0%",
    "distance_optimized_km": 0
  },
  "logic_trace": "Forensic trace of spatial reasoning and interleaved source synthesis."
}

OPERATIONAL RULES:
- Focus on SPATIAL EFFICIENCY.
- Use Saturday Feb 7, 2026 as the hard context.
- Assume the user wants a professional, high-energy agent.
`;

async function analyzeErrands(textInput, files, apiKey) {
  const model = getGeminiModel(apiKey);
  if (!model) throw new Error('AI Core Auth Failed: Missing API Key.');

  try {
    const parts = [];

    // Interleave all multimodal files
    if (files && files.length > 0) {
      for (const file of files) {
        const fileData = await fileToGenerativePart(file);
        parts.push(fileData);
      }
    }

    const userPrompt = `
[SPATIAL LOGISTICS REQUEST]
Sources: ${files.length} Attachments | User: "${textInput || 'Optimize my errands.'}"

INSTRUCTIONS:
- Perform multiline spatial analysis.
- Link Audio/Visual/Text sources.
- Calculate Carbon/Distance stats.
- Solve for Saturday Feb 7, 2026.

Return ONLY the raw JSON block.
`;

    parts.push({ text: userPrompt });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      ...MODEL_CONFIG,
      systemInstruction: SYSTEM_PROMPT,
    });

    const response = await result.response;
    const text = response.text();

    return extractJSON(text);

  } catch (error) {
    console.error('Gemini 3 Spatial Error:', error);
    throw new Error(`AI Core Fault: ${error.message}`);
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

export { analyzeErrands };
