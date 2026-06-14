/**
 * Normalizes a string for use as an icon map key.
 * - Converts to lowercase
 * - Removes diacritical marks / accents (é → e, ã → a, etc.)
 * - Replaces one or more whitespace characters with a single dash
 * - Removes any characters that are not alphanumeric, dashes, or dots
 */
export function normalize(name: string): string {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-.]/g, '');
}


/**
 * Replaces placeholders in a template string with corresponding values from a provided object.
 * Placeholders in the template should be in the format {key}, where "key" corresponds to a property in the values object.
 * If a placeholder does not have a corresponding value, it will remain unchanged in the output string.
 * @param template The string containing placeholders to be replaced.
 * @param tokens An object where keys correspond to placeholder names and values are the strings or numbers to replace them with.
 * @returns A new string with all placeholders replaced by their corresponding values.
 */
export function replaceTokens(template: string, tokens: Record<string, string | number>): string {
    return template.replace(/\{([^}]+)\}/g, (match, key) => {
        const value = tokens[key];
        return typeof value === 'string' || typeof value === 'number' ? String(value) : match;
    });
}