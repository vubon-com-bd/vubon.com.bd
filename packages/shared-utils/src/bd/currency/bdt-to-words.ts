/**
 * Convert BDT amount into English words (Indian numbering: crore, lakh)
 * @module shared-utils/bd/currency
 *
 * @example
 * bdtToWords(125000) // 'One Lakh Twenty Five Thousand Taka Only'
 */
const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return `${TENS[t]}${o ? ' ' + ONES[o] : ''}`;
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (h && rest) return `${ONES[h]} Hundred ${twoDigits(rest)}`;
  if (h) return `${ONES[h]} Hundred`;
  return twoDigits(rest);
}

export function bdtToWords(amount: number): string {
  if (!Number.isFinite(amount)) return 'Zero Taka Only';
  const rounded = Math.floor(Math.abs(amount));
  if (rounded === 0) return 'Zero Taka Only';

  const crore = Math.floor(rounded / 10000000);
  const lakh = Math.floor((rounded % 10000000) / 100000);
  const thousand = Math.floor((rounded % 100000) / 1000);
  const rest = rounded % 1000;

  const parts: string[] = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));

  return `${parts.join(' ')} Taka Only`;
}
