/**
 * Text Formatter — display formatting.
 * Note: capitalize, truncate live in helper/string.helper.ts.
 */
export const formatText = (text: string): string => text.replace(/\s+/g, ' ').trim();

export const titleCase = (text: string): string =>
  text
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export const sentenceCase = (text: string): string => {
  const trimmed = text.trim();
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
