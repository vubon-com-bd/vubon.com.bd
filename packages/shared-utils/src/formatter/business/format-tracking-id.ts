/**
 * Format a tracking number for display
 * @module shared-utils/formatter/business
 */
export function formatTrackingId(id: string, groupBy = 4): string {
  if (!Number.isInteger(groupBy) || groupBy < 1) {
    throw new RangeError('groupBy must be a positive integer');
  }
  const cleaned = id.replace(/\s+/g, '').toUpperCase();
  if (!cleaned) return '';
  const chunks: string[] = [];
  for (let i = 0; i < cleaned.length; i += groupBy) {
    chunks.push(cleaned.slice(i, i + groupBy));
  }
  return chunks.join('-');
}
