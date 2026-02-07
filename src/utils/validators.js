/**
 * Validate text input
 */
export function validateTextInput(text) {
    if (!text || typeof text !== 'string') {
        return { valid: false, error: 'Please enter some text' };
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
        return { valid: false, error: 'Input cannot be empty' };
    }

    if (trimmed.length < 3) {
        return { valid: false, error: 'Input too short (minimum 3 characters)' };
    }

    if (trimmed.length > 5000) {
        return { valid: false, error: 'Input too long (maximum 5000 characters)' };
    }

    return { valid: true, error: null };
}

/**
 * Validate image file
 */
export function validateImageFile(file) {
    if (!file) {
        return { valid: true, error: null }; // Image is optional
    }

    const MAX_SIZE = 4 * 1024 * 1024; // 4MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.'
        };
    }

    if (file.size > MAX_SIZE) {
        return {
            valid: false,
            error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 4MB.`
        };
    }

    return { valid: true, error: null };
}

/**
 * Validate API key format
 */
export function validateApiKey(key) {
    if (!key || key === 'your_api_key_here') {
        return false;
    }

    // Basic format check (Gemini keys typically start with specific patterns)
    return key.length > 20 && typeof key === 'string';
}
