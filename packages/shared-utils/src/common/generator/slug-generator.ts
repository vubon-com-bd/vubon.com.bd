/**
 * Slug Generator
 * স্লাগ জেনারেটর
 */
export const slugGenerator = {
  /**
   * Generate slug from text
   * টেক্সট থেকে স্লাগ তৈরি করা
   */
  generate: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  /**
   * Generate unique slug
   * ইউনিক স্লাগ তৈরি করা
   */
  generateUnique: (text: string, existingSlugs: string[]): string => {
    let slug = slugGenerator.generate(text);
    let uniqueSlug = slug;
    let counter = 1;

    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  },

  /**
   * Generate slug with random suffix
   * র্যান্ডম সাফিক্স সহ স্লাগ তৈরি করা
   */
  generateWithRandomSuffix: (text: string, length: number = 4): string => {
    const slug = slugGenerator.generate(text);
    const suffix = Math.random()
      .toString(36)
      .substring(2, 2 + length);
    return `${slug}-${suffix}`;
  },

  /**
   * Generate Bengali slug
   * বাংলা স্লাগ তৈরি করা
   */
  generateBangla: (text: string): string => {
    // Simple transliteration for Bengali to English
    const transliterationMap: { [key: string]: string } = {
      'া': 'a',
      'ি': 'i',
      'ী': 'i',
      'ু': 'u',
      'ূ': 'u',
      'ে': 'e',
      'ৈ': 'oi',
      'ো': 'o',
      'ৌ': 'ou',
      'ং': 'ng',
      'ঃ': 'h',
      'ঁ': 'n',
      ক: 'k',
      খ: 'kh',
      গ: 'g',
      ঘ: 'gh',
      ঙ: 'ng',
      চ: 'ch',
      ছ: 'chh',
      জ: 'j',
      ঝ: 'jh',
      ঞ: 'n',
      ট: 't',
      ঠ: 'th',
      ড: 'd',
      ঢ: 'dh',
      ণ: 'n',
      ত: 't',
      থ: 'th',
      দ: 'd',
      ধ: 'dh',
      ন: 'n',
      প: 'p',
      ফ: 'ph',
      ব: 'b',
      ভ: 'bh',
      ম: 'm',
      য: 'y',
      র: 'r',
      ল: 'l',
      শ: 'sh',
      ষ: 'sh',
      স: 's',
      হ: 'h',
      ড়: 'r',
      ঢ়: 'rh',
      য়: 'y',
    };

    let transliterated = '';
    for (const char of text) {
      transliterated += transliterationMap[char] || char;
    }

    return slugGenerator.generate(transliterated);
  },

  /**
   * Check if slug is valid
   * স্লাগ ভ্যালিড কিনা চেক করা
   */
  isValid: (slug: string): boolean => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  },

  /**
   * Get slug length
   * স্লাগের দৈর্ঘ্য পাওয়া
   */
  getLength: (slug: string): number => {
    return slug.length;
  },

  /**
   * Extract words from slug
   * স্লাগ থেকে শব্দ বের করা
   */
  extractWords: (slug: string): string[] => {
    return slug.split('-');
  },

  /**
   * Convert slug to title
   * স্লাগকে টাইটেলে রূপান্তর করা
   */
  toTitle: (slug: string): string => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
};
