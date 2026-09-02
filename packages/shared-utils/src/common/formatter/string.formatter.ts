/**
 * Format String
 * স্ট্রিং ফরম্যাট করা
 */
export const formatString = {
  /**
   * Capitalize first letter
   * প্রথম অক্ষর বড় করা
   */
  capitalize: (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Capitalize each word
   * প্রতিটি শব্দের প্রথম অক্ষর বড় করা
   */
  capitalizeWords: (str: string): string => {
    if (!str) return '';
    return str
      .split(' ')
      .map((word) => formatString.capitalize(word))
      .join(' ');
  },

  /**
   * Truncate string
   * স্ট্রিং ছোট করা
   */
  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  },

  /**
   * Slugify string
   * স্ট্রিংকে স্লাগে রূপান্তর করা
   */
  slugify: (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  /**
   * Remove extra spaces
   * অতিরিক্ত স্পেস অপসারণ করা
   */
  removeExtraSpaces: (str: string): string => {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
  },

  /**
   * Count words
   * শব্দ সংখ্যা গণনা করা
   */
  wordCount: (str: string): number => {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
  },

  /**
   * Count characters
   * অক্ষর সংখ্যা গণনা করা
   */
  charCount: (str: string): number => {
    if (!str) return 0;
    return str.length;
  },

  /**
   * Extract numbers from string
   * স্ট্রিং থেকে সংখ্যা বের করা
   */
  extractNumbers: (str: string): string => {
    if (!str) return '';
    return str.replace(/[^0-9]/g, '');
  },

  /**
   * Extract letters from string
   * স্ট্রিং থেকে অক্ষর বের করা
   */
  extractLetters: (str: string): string => {
    if (!str) return '';
    return str.replace(/[^a-zA-Z]/g, '');
  },

  /**
   * Mask string
   * স্ট্রিং মাস্ক করা
   */
  maskString: (str: string, visibleChars: number = 4, maskChar: string = '*'): string => {
    if (!str) return '';
    if (str.length <= visibleChars) return str;
    const visible = str.slice(-visibleChars);
    const masked = maskChar.repeat(str.length - visibleChars);
    return masked + visible;
  },

  /**
   * Check if string is empty
   * স্ট্রিং খালি কিনা চেক করা
   */
  isEmpty: (str: string): boolean => {
    return !str || str.trim().length === 0;
  },

  /**
   * Reverse string
   * স্ট্রিং রিভার্স করা
   */
  reverse: (str: string): string => {
    if (!str) return '';
    return str.split('').reverse().join('');
  },
};
