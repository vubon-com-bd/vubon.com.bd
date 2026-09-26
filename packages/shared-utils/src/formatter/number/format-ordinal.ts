/**
 * Format number as ordinal (1st, 2nd, 3rd, 4th)
 * @module shared-utils/formatter/number
 */
export function formatOrdinal(value: number): string {
  if (!Number.isInteger(value)) {
    throw new RangeError('value must be an integer');
  }
  const abs = Math.abs(value);
  const mod100 = abs % 100;
  const mod10 = abs % 10;

  let suffix = 'th';
  if (mod100 < 11 || mod100 > 13) {
    if (mod10 === 1) suffix = 'st';
    else if (mod10 === 2) suffix = 'nd';
    else if (mod10 === 3) suffix = 'rd';
  }

  return `${value}${suffix}`;
}
