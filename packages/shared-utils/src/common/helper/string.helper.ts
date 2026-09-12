/**
 * String Helper — low-level string operations.
 */
export const camelCase = (str: string): string =>
  str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

export const snakeCase = (str: string): string =>
  str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_+/, '')
    .replace(/_+/g, '_');

export const kebabCase = (str: string): string =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const pascalCase = (str: string): string =>
  camelCase(str).replace(/^./, (c) => c.toUpperCase());

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const truncate = (str: string, maxLength: number, suffix: string = '...'): string => {
  const chars = [...str];
  if (chars.length <= maxLength) return str;
  return chars.slice(0, Math.max(0, maxLength - suffix.length)).join('') + suffix;
};

export const charCount = (str: string): number => [...str].length;
