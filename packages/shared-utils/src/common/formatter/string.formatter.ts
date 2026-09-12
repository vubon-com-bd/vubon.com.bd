/**
 * String Formatter.
 */
export const formatString = (str: string): string => str.trim().replace(/\s+/g, ' ');

export const formatTitle = (str: string): string =>
  str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const formatSentence = (str: string): string => {
  const trimmed = str.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const formatMask = (
  str: string,
  visibleStart: number = 0,
  visibleEnd: number = 4,
  maskChar: string = '*'
): string => {
  if (!str) return '';
  if (str.length <= visibleStart + visibleEnd) return maskChar.repeat(str.length);
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const middle = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return `${start}${middle}${end}`;
};
