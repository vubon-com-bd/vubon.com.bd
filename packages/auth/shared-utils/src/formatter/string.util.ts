/**
 * String formatting utilities
 * Provides various string manipulation and formatting functions
 */

export const capitalize = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => capitalize(word))
    .join(' ');
};

export const capitalizeEachWord = (str: string, delimiter: string = ' '): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .split(delimiter)
    .filter((word) => word.length > 0)
    .map((word) => capitalize(word))
    .join(delimiter);
};

export const toSnakeCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/\s+/g, '_')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

export const toKebabCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/\s+/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const toCamelCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const words = str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  const first = words[0].toLowerCase();
  const rest = words.slice(1).map((word) => capitalize(word));

  return first + rest.join('');
};

export const toPascalCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const words = str
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(' ')
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  return words.map((word) => capitalize(word)).join('');
};

export const toTitleCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const smallWords = [
    'a',
    'an',
    'the',
    'and',
    'but',
    'or',
    'for',
    'nor',
    'on',
    'at',
    'to',
    'by',
    'with',
    'without',
  ];

  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index === 0 || index === str.split(' ').length - 1) {
        return capitalize(word);
      }

      if (smallWords.includes(word)) {
        return word;
      }

      return capitalize(word);
    })
    .join(' ');
};

export const slugify = (str: string, separator: string = '-'): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, separator)
    .replace(/-+/g, separator)
    .replace(/^-|-$/g, '');
};

export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (length < 1) {
    return '';
  }

  if (str.length <= length) {
    return str;
  }

  return str.substring(0, length).trim() + suffix;
};

export const truncateWords = (str: string, wordCount: number, suffix: string = '...'): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (wordCount < 1) {
    return '';
  }

  const words = str.split(' ');

  if (words.length <= wordCount) {
    return str;
  }

  return words.slice(0, wordCount).join(' ') + suffix;
};

export const escapeHtml = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const unescapeHtml = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export const stripHtml = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/<[^>]*>/g, '');
};

export const reverse = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.split('').reverse().join('');
};

export const countWords = (str: string): number => {
  if (!str || typeof str !== 'string') {
    return 0;
  }

  const words = str.trim().split(/\s+/);
  return words.length;
};

export const countCharacters = (str: string, includeSpaces: boolean = true): number => {
  if (!str || typeof str !== 'string') {
    return 0;
  }

  if (includeSpaces) {
    return str.length;
  }

  return str.replace(/\s/g, '').length;
};

export const isUpperCase = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  if (str.length === 0) {
    return false;
  }

  return str === str.toUpperCase() && str !== str.toLowerCase();
};

export const isLowerCase = (str: string): boolean => {
  if (!str || typeof str !== 'string') {
    return false;
  }

  if (str.length === 0) {
    return false;
  }

  return str === str.toLowerCase() && str !== str.toUpperCase();
};

export const toAlternatingCase = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .split('')
    .map((char, index) => {
      if (index % 2 === 0) {
        return char.toUpperCase();
      }
      return char.toLowerCase();
    })
    .join('');
};

export const removeAccents = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const removeWhitespace = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/\s/g, '');
};

export const removeExtraWhitespace = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/\s+/g, ' ').trim();
};

export const padStart = (str: string, length: number, char: string = ' '): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length >= length) {
    return str;
  }

  return char.repeat(length - str.length) + str;
};

export const padEnd = (str: string, length: number, char: string = ' '): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length >= length) {
    return str;
  }

  return str + char.repeat(length - str.length);
};

export const padBoth = (str: string, length: number, char: string = ' '): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length >= length) {
    return str;
  }

  const totalPad = length - str.length;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;

  return char.repeat(leftPad) + str + char.repeat(rightPad);
};

export const maskString = (
  str: string,
  visibleStart: number = 4,
  visibleEnd: number = 4,
  maskChar: string = '*',
): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length <= visibleStart + visibleEnd) {
    return str;
  }

  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const maskedLength = str.length - visibleStart - visibleEnd;

  return start + maskChar.repeat(maskedLength) + end;
};

export const maskEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }

  const [localPart, domain] = email.split('@');

  if (!localPart || !domain) {
    return email;
  }

  const maskedLocal = maskString(localPart, 2, 1);
  return `${maskedLocal}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  const digits = phone.replace(/\D/g, '');

  if (digits.length <= 4) {
    return phone;
  }

  const visibleEnd = 2;
  const visibleStart = 2;
  const masked = maskString(digits, visibleStart, visibleEnd);

  let result = '';
  let maskedIndex = 0;

  for (let i = 0; i < phone.length; i++) {
    const char = phone.charAt(i);
    if (/\d/.test(char)) {
      const targetChar = masked.charAt(maskedIndex);
      result += targetChar;
      maskedIndex++;
    } else {
      result += char;
    }
  }

  return result;
};

export const toBase64 = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return Buffer.from(str).toString('base64');
};

export const fromBase64 = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return Buffer.from(str, 'base64').toString();
};

export const toUrlSafeBase64 = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const fromUrlSafeBase64 = (str: string): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  while (base64.length % 4) {
    base64 += '=';
  }

  return fromBase64(base64);
};
