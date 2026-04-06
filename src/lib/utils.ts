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
