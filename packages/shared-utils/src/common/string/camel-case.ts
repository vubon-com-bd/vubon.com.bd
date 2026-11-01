/**
 * Convert to camelCase
 * @module shared-utils/common/string
 *
 * @example
 * camelCase('hello world')  // 'helloWorld'
 * camelCase('hello-world')  // 'helloWorld'
 * camelCase('Hello_World')  // 'helloWorld'
 */
export function camelCase(value: string): string {
  const words = toWords(value);
  if (words.length === 0) return '';
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  );
}

function toWords(value: string): string[] {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-\s]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}
