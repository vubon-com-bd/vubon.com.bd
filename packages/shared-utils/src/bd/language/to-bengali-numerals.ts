/**
 * Convert English digits in a string to Bengali numerals
 * @module shared-utils/bd/language
 */
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumerals(value: string | number): string {
  const str = String(value);
  let out = '';
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) out += BN_DIGITS[code - 48];
    else out += ch;
  }
  return out;
}
