/**
 * Check if string is a valid tracking number (basic)
 * @module shared-utils/validator/business
 */
export function isValidTrackingNumber(value: string): boolean {
  if (typeof value !== 'string') return false;
  const cleaned = value.replace(/[-\s]/g, '');
  return /^[A-Z0-9]{8,24}$/i.test(cleaned);
}
