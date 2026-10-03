/**
 * Format an excerpt from long text
 * @module shared-utils/formatter/text
 */
export function formatExcerpt(text: string, maxLength = 160, suffix = '…'): string {
  if (typeof text !== 'string') return '';
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError('maxLength must be a positive integer');
  }
  const normalized = text.trim().replace(/\s+/g, ' ');
  if (normalized.length <= maxLength) return normalized;
  const cut = normalized.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return safeCut.trimEnd() + suffix;
}
