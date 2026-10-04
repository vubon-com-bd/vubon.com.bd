/**
 * Convert number (0-99) to Bengali words (limited)
 * @module shared-utils/bd/language
 *
 * ⚠️ Only supports 0-99. For extended ranges, use a dedicated library.
 */
const BN_ONES = [
  'শূন্য',
  'এক',
  'দুই',
  'তিন',
  'চার',
  'পাঁচ',
  'ছয়',
  'সাত',
  'আট',
  'নয়',
  'দশ',
  'এগারো',
  'বারো',
  'তেরো',
  'চৌদ্দ',
  'পনেরো',
  'ষোলো',
  'সতেরো',
  'আঠারো',
  'ঊনিশ',
];
const BN_TENS = ['', '', 'বিশ', 'ত্রিশ', 'চল্লিশ', 'পঞ্চাশ', 'ষাট', 'সত্তর', 'আশি', 'নব্বই'];

export function toBengaliWords(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > 99) {
    throw new RangeError('value must be an integer between 0 and 99');
  }
  if (value < 20) return BN_ONES[value];
  const t = Math.floor(value / 10);
  const o = value % 10;
  return o === 0 ? BN_TENS[t] : `${BN_TENS[t]} ${BN_ONES[o]}`;
}
