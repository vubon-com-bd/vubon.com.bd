/**
 * Capitalizes the first character of a string
 *
 * @param str - The string to capitalize
 * @returns The capitalized string
 *
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('HELLO') // 'HELLO'
 * capitalize('') // ''
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first character of each word in a name
 *
 * @param str - The name string to format
 * @returns The formatted name with each word capitalized
 *
 * @example
 * capitalizeName('john doe') // 'John Doe'
 * capitalizeName('JOHN DOE') // 'John Doe'
 * capitalizeName('john-doe') // 'John-Doe'
 */
export function capitalizeName(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .trim()
    .split(/\s+/)
    .map((word) => {
      // Handle hyphenated names like "John-Doe"
      return word
        .split('-')
        .map((part) => capitalize(part.toLowerCase()))
        .join('-');
    })
    .join(' ');
}

/**
 * Converts a string to a URL-friendly slug
 *
 * @param str - The string to slugify
 * @returns The URL-friendly slug
 *
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('  Hello   World!  ') // 'hello-world'
 * slugify('Héllo Wörld!') // 'hello-world'
 */
export function slugify(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return (
    str
      .trim()
      .toLowerCase()
      // Replace accented characters with their ASCII equivalents
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace non-alphanumeric characters with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}

/**
 * Truncates a string to a specified maximum length
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the truncated string
 * @param suffix - The suffix to append (default: '...')
 * @returns The truncated string
 *
 * @example
 * truncate('Hello World!', 5) // 'Hello...'
 * truncate('Hello World!', 12, '...') // 'Hello World!'
 * truncate('Hello', 10) // 'Hello'
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (maxLength < 0) {
    throw new Error('maxLength must be a non-negative number');
  }

  if (str.length <= maxLength) {
    return str;
  }

  // Ensure there's room for the suffix
  if (suffix.length >= maxLength) {
    return str.slice(0, maxLength);
  }

  const truncatedLength = maxLength - suffix.length;
  return str.slice(0, truncatedLength) + suffix;
}

/**
 * Converts a string to title case
 *
 * @param str - The string to convert
 * @returns The string in title case
 *
 * @example
 * toTitleCase('hello world') // 'Hello World'
 * toTitleCase('the quick brown fox') // 'The Quick Brown Fox'
 */
export function toTitleCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  // Words that should not be capitalized in title case
  const smallWords = [
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'if',
    'in',
    'into',
    'nor',
    'of',
    'on',
    'or',
    'so',
    'the',
    'to',
    'up',
    'with',
    'yet',
  ];

  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      // Always capitalize the first and last word
      if (index === 0 || index === str.split(/\s+/).length - 1) {
        return capitalize(word);
      }

      // Don't capitalize small words
      if (smallWords.includes(word)) {
        return word;
      }

      return capitalize(word);
    })
    .join(' ');
}

/**
 * Converts a string to camelCase
 *
 * @param str - The string to convert
 * @returns The string in camelCase
 *
 * @example
 * toCamelCase('hello world') // 'helloWorld'
 * toCamelCase('hello-world') // 'helloWorld'
 * toCamelCase('Hello World') // 'helloWorld'
 */
export function toCamelCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const normalized = str.trim().toLowerCase();

  // Split by non-alphanumeric characters
  const words = normalized.split(/[^a-z0-9]+/).filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  // First word is lowercase, rest are capitalized
  return words.reduce((result, word, index) => {
    if (index === 0) {
      return word;
    }
    return result + capitalize(word);
  }, '');
}

/**
 * Converts a string to snake_case
 *
 * @param str - The string to convert
 * @returns The string in snake_case
 *
 * @example
 * toSnakeCase('hello world') // 'hello_world'
 * toSnakeCase('helloWorld') // 'hello_world'
 * toSnakeCase('Hello World') // 'hello_world'
 */
export function toSnakeCase(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const normalized = str.trim();

  // Split by non-alphanumeric characters or camelCase boundaries
  const words = normalized
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle consecutive capitals
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 0);

  return words.join('_');
}
