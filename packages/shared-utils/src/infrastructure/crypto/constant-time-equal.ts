/**
 * Constant-time string equality (timing-attack safe)
 * @module shared-utils/infrastructure/crypto
 */
export function constantTimeEqual(a: string, b: string): boolean {
  const lenA = a.length;
  const lenB = b.length;
  const maxLen = Math.max(lenA, lenB);
  let diff = lenA ^ lenB;

  for (let i = 0; i < maxLen; i++) {
    const ca = i < lenA ? a.charCodeAt(i) : 0;
    const cb = i < lenB ? b.charCodeAt(i) : 0;
    diff |= ca ^ cb;
  }

  return diff === 0;
}
