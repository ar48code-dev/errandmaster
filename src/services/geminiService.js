import { getGeminiModel, MODEL_CONFIG } from '../config/gemini';
import { extractJSON } from '../utils/jsonParser';

/**
 * GEMINI 3 ADVANCED MULTIMODAL REASONER
 * 
 * This service implements Interleaved Multimodal Reasoning, allowing the model
 * to cross-reference multiple data sources (Audio, Image, Video, Text) simultaneously.
 * 
 * Hackathon-Specific Features:
 * 1. Parallel Source Synthesis: Analyzing a voice memo in context of a list photo.
 * 2. Real-Time Logistics Grounding: Saturday, February 7, 2026.
 * 3. Agentic Routing: Bundling and Conflict Detection.
 */

const SYSTEM_PROMPT = `
ROLE: ErrandMaster AI Logistics Agent (Powered by Gemini 3 Native Multimodality)

OBJECTIVE:
Synthesize messy, interleaved multimodal inputs into an ultra-optimized logistical plan.

CAPABILITIES:
1. INTERLEAVED SYNTHESIS: You will receive text, images, audio, and video *together*. Cross-reference them. e.g. If the user says "Get this" in audio while pointing at a handwritten item in a photo, link them.
2. SPATIAL REASONING: Calculate the logically shortest path between physical locations.
3. AGENTIC CONFLICT RESOLUTION: Identify impossible tasks (e.g. "Get mail" when the Post Office is closed on the specific date).
4. SMART BUNDLING: Group errands by proximity.

DATE CONTEXT:
Today is Saturday, February 7, 2026. Use this to determine store hours and traffic patterns.

RESPONSE ARCHITECTURE (STRICT JSON):
{
  "summary": "Professional overview of the synthesized plan",
  "errands_detected": [
    {
      "location": "Name of store/place",
      "task": "Specific item/action",
      "priority": "high/medium/low",
      "source": "Found in [Image/Audio/Text/Video/Camera]"
    }
  ],
  "optimized_route": [
    {
      "step": 1,
      "action": "Specific instruction",
      "location": "Where to go",
      "tip": "Logistics advice (bundling, closure alerts, etc.)"
    }
  ],
  "stats": {
    "time_saved_mins": 0,
    "money_saved_usd": 0,
    "carbon_reduction": "0%"
  },
  "logic_trace": "Forensic explanation of how you synthesized the interleaved sources."
}

OPERATIONAL RULES:
- Never provide general advice.
- Be precise with 2026 logistical context.
- Be high-energy and professional.
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

    // Advanced Synthesis Prompt
    const userPrompt = `
[SYSTEM_LOG: INTERLEAVED SYNTHESIS REQUEST]
Input Status: ${files.length} Multimodal Attachments + ${textInput.length > 0 ? 'Text Context' : 'No Text Context'}

USER INPUTS:
"${textInput || 'Synthesize provided attachments into a route.'}"

INSTRUCTIONS:
1. Examine all attachments in parallel.
2. Extract errands from the Voice/Photos/Video.
3. Apply logic for Saturday, Feb 7, 2026.
4. Generate the optimized sequence.

Return ONLY the raw JSON block.
`;

    parts.push({ text: userPrompt });

    // Using generateContent with systemInstruction (Gemini 3 pattern)
    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      ...MODEL_CONFIG,
      systemInstruction: SYSTEM_PROMPT,
    });

    const response = await result.response;
    const text = response.text();

    return extractJSON(text);

  } catch (error) {
    console.error('Gemini 3 Reasoning Error:', error);
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
