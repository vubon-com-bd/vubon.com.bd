/**
 * User Agent Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Browser user agent string।
 * Business Rule:
 * - Max 500 chars
 * - Parse для browser, OS, device type hints
 * - Bot detection
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 500;

const BOT_PATTERNS: readonly RegExp[] = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /crawling/i,
  /slurp/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java\//i,
];

export class UserAgentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string | null | undefined): UserAgentVO {
    if (raw === null || raw === undefined || raw === '') {
      return new UserAgentVO('unknown');
    }

    if (typeof raw !== 'string') {
      throw new Error('UserAgent must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      return new UserAgentVO('unknown');
    }

    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`UserAgent must be at most ${MAX_LENGTH} chars`);
    }

    return new UserAgentVO(trimmed);
  }

  static unknown(): UserAgentVO {
    return new UserAgentVO('unknown');
  }

  isUnknown(): boolean {
    return this.value === 'unknown';
  }

  /** Bot/crawler কিনা */
  isBot(): boolean {
    return BOT_PATTERNS.some((p) => p.test(this.value));
  }

  /** Mobile hint */
  isMobileHint(): boolean {
    return /mobile|android|iphone|ipad|tablet/i.test(this.value);
  }

  /** Desktop hint */
  isDesktopHint(): boolean {
    return /windows|macintosh|linux/i.test(this.value) && !this.isMobileHint();
  }

  /** Browser guess */
  browser(): string {
    const ua = this.value;
    if (/edg\//i.test(ua)) return 'edge';
    if (/opr\//i.test(ua) || /opera/i.test(ua)) return 'opera';
    if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) return 'chrome';
    if (/firefox\//i.test(ua)) return 'firefox';
    if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) return 'safari';
    return 'other';
  }

  /** OS guess */
  os(): string {
    const ua = this.value;
    if (/android/i.test(ua)) return 'android';
    if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
    if (/windows/i.test(ua)) return 'windows';
    if (/macintosh|mac os x/i.test(ua)) return 'macos';
    if (/linux/i.test(ua)) return 'linux';
    return 'other';
  }
}
