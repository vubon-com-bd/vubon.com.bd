/**
 * Robots.txt সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/content
 */

/**
 * Robots ডিরেক্টিভসমূহ
 */
export const ROBOTS_DIRECTIVES = [
  'index',
  'noindex',
  'follow',
  'nofollow',
  'noarchive',
  'nosnippet',
] as const;

/**
 * ডিফল্ট Robots ডিরেক্টিভ
 */
export const DEFAULT_ROBOTS = ['index', 'follow'] as const;

/**
 * Sitemap পাথ
 */
export const ROBOTS_SITEMAP_PATH = '/sitemap.xml' as const;

/**
 * Robots ডিরেক্টিভ টাইপ
 */
export type RobotsDirective = (typeof ROBOTS_DIRECTIVES)[number];

/**
 * Robots কনফিগ ইন্টারফেস
 */
export interface RobotsConfig {
  directives: RobotsDirective[];
  sitemap?: string;
  userAgent?: string;
  disallow?: string[];
  allow?: string[];
}

/**
 * Robots মেটা ট্যাগ ইন্টারফেস
 */
export interface RobotsMetaTag {
  content: string;
  name?: string;
}

/**
 * Robots ডিরেক্টিভ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRobotsDirective(directive: string): directive is RobotsDirective {
  return ROBOTS_DIRECTIVES.includes(directive as RobotsDirective);
}

/**
 * Robots ডিরেক্টিভ কম্বিনেশন বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRobotsCombination(directives: string[]): boolean {
  if (!Array.isArray(directives) || directives.length === 0) {
    return false;
  }

  // Check if all directives are valid
  const allValid = directives.every((d) => isValidRobotsDirective(d));
  if (!allValid) {
    return false;
  }

  // Check for conflicting directives
  const hasIndex = directives.includes('index');
  const hasNoIndex = directives.includes('noindex');
  const hasFollow = directives.includes('follow');
  const hasNoFollow = directives.includes('nofollow');

  // index and noindex cannot be together
  if (hasIndex && hasNoIndex) {
    return false;
  }

  // follow and nofollow cannot be together
  if (hasFollow && hasNoFollow) {
    return false;
  }

  return true;
}

/**
 * Robots মেটা ট্যাগ কন্টেন্ট তৈরির ফাংশন
 */
export function generateRobotsMetaContent(directives: RobotsDirective[]): string {
  if (!isValidRobotsCombination(directives)) {
    throw new Error('Invalid robots directives combination');
  }
  return directives.join(', ');
}

/**
 * Robots.txt কন্টেন্ট তৈরির ফাংশন
 */
export function generateRobotsTxtContent(config: RobotsConfig): string {
  const lines: string[] = [];

  // User-agent
  const userAgent = config.userAgent || '*';
  lines.push(`User-agent: ${userAgent}`);

  // Disallow rules
  if (config.disallow && config.disallow.length > 0) {
    config.disallow.forEach((path) => {
      lines.push(`Disallow: ${path}`);
    });
  }

  // Allow rules
  if (config.allow && config.allow.length > 0) {
    config.allow.forEach((path) => {
      lines.push(`Allow: ${path}`);
    });
  }

  // Sitemap
  const sitemap = config.sitemap || ROBOTS_SITEMAP_PATH;
  lines.push(`Sitemap: ${sitemap}`);

  return lines.join('\n');
}

/**
 * Robots ডিরেক্টিভ থেকে মেটা ট্যাগ তৈরির ফাংশন
 */
export function createRobotsMetaTag(directives: RobotsDirective[]): RobotsMetaTag {
  const content = generateRobotsMetaContent(directives);
  return {
    name: 'robots',
    content,
  };
}

/**
 * ডিফল্ট Robots কনফিগ পাওয়ার ফাংশন
 */
export function getDefaultRobotsConfig(): RobotsConfig {
  return {
    directives: ['index', 'follow'] as RobotsDirective[],
    sitemap: ROBOTS_SITEMAP_PATH,
    userAgent: '*',
    disallow: [],
    allow: [],
  };
}

/**
 * সব Robots ডিরেক্টিভের তালিকা পাওয়ার ফাংশন
 */
export function getAllRobotsDirectives(): readonly RobotsDirective[] {
  return ROBOTS_DIRECTIVES;
}

/**
 * ডিফল্ট Robots ডিরেক্টিভ পাওয়ার ফাংশন
 */
export function getDefaultRobotsDirectives(): readonly RobotsDirective[] {
  return DEFAULT_ROBOTS;
}

/**
 * Robots ডিরেক্টিভে index আছে কিনা চেক করার ফাংশন
 */
export function hasIndexDirective(directives: RobotsDirective[]): boolean {
  return directives.includes('index');
}

/**
 * Robots ডিরেক্টিভে noindex আছে কিনা চেক করার ফাংশন
 */
export function hasNoIndexDirective(directives: RobotsDirective[]): boolean {
  return directives.includes('noindex');
}

/**
 * Robots ডিরেক্টিভে follow আছে কিনা চেক করার ফাংশন
 */
export function hasFollowDirective(directives: RobotsDirective[]): boolean {
  return directives.includes('follow');
}

/**
 * Robots ডিরেক্টিভে nofollow আছে কিনা চেক করার ফাংশন
 */
export function hasNoFollowDirective(directives: RobotsDirective[]): boolean {
  return directives.includes('nofollow');
}
