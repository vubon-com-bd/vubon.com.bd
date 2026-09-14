/**
 * Convert Bengali digits in a string to English (0-9)
 * @module shared-utils/bd/language
 */
const BN_TO_EN: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

export function fromBengaliNumerals(value: string): string {
  if (typeof value !== 'string') return '';
  let out = '';
  for (const ch of value) out += BN_TO_EN[ch] ?? ch;
  return out;
}
