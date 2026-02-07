/**
 * Extract JSON from text that might contain markdown or other formatting
 * @param {string} text - Raw text potentially containing JSON
 * @returns {Object} Parsed JSON object
 */
export function extractJSON(text) {
    if (!text || typeof text !== 'string') {
        throw new Error('Invalid input: text must be a non-empty string');
    }

    // Remove markdown code blocks if present
    let cleanText = text.trim();

    // Remove ```json or ``` markers
    cleanText = cleanText.replace(/```json\s*/g, '');
    cleanText = cleanText.replace(/```\s*/g, '');

    // Try to find JSON object boundaries
    const jsonStart = cleanText.indexOf('{');
    const jsonEnd = cleanText.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('No JSON object found in response');
    }

    const jsonStr = cleanText.substring(jsonStart, jsonEnd + 1);

    try {
        const parsed = JSON.parse(jsonStr);
        return parsed;
    } catch (error) {
        console.error('JSON Parse Error:', error);
        console.error('Attempted to parse:', jsonStr);
        throw new Error('Failed to parse JSON from response');
    }
}

/**
 * Safely stringify JSON with error handling
 * @param {Object} obj - Object to stringify
 * @param {boolean} pretty - Whether to format output
 * @returns {string} JSON string
 */
export function safeStringify(obj, pretty = false) {
    try {
        return JSON.stringify(obj, null, pretty ? 2 : 0);
    } catch (error) {
        console.error('JSON Stringify Error:', error);
        return '{}';
    }
}
