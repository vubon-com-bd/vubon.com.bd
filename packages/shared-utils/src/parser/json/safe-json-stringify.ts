/**
 * Stringify to JSON safely. Returns null on failure (e.g., circular).
 * @module shared-utils/parser/json
 */
export function safeJsonStringify(value: unknown): string | null {
  try {
    const result = JSON.stringify(value);
    return result === undefined ? null : result;
  } catch {
    return null;
  }
}
