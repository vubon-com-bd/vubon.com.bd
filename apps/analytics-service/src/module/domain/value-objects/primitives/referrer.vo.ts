/**
 * Referrer Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Traffic referrer (previous page URL)।
 * Business Rule:
 * - Full URL অথবা "direct" (no referrer)
 * - Max 2000 chars
 * - Extract domain for grouping
 * - Classify: internal, search, social, other
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 2000;
const DIRECT = 'direct';

const SEARCH_ENGINES: readonly string[] = [
  'google.',
  'bing.',
  'yahoo.',
  'duckduckgo.',
  'baidu.',
  'yandex.',
];

const SOCIAL_PLATFORMS: readonly string[] = [
  'facebook.',
  'instagram.',
  'twitter.',
  'x.com',
  'linkedin.',
  'tiktok.',
  'youtube.',
  'pinterest.',
  'reddit.',
  'whatsapp.',
  'telegram.',
];

export class ReferrerVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string | null | undefined): ReferrerVO {
    if (raw === null || raw === undefined || raw === '') {
      return new ReferrerVO(DIRECT);
    }

    if (typeof raw !== 'string') {
      throw new Error('Referrer must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      return new ReferrerVO(DIRECT);
    }

    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`Referrer must be at most ${MAX_LENGTH} chars`);
    }

    try {
      new URL(trimmed);
    } catch {
      throw new Error(`Referrer is not a valid URL: ${trimmed}`);
    }

    return new ReferrerVO(trimmed);
  }

  static direct(): ReferrerVO {
    return new ReferrerVO(DIRECT);
  }

  isDirect(): boolean {
    return this.value === DIRECT;
  }

  /** Host (domain) extract */
  host(): string | null {
    if (this.isDirect()) return null;
    try {
      return new URL(this.value).hostname.toLowerCase();
    } catch {
      return null;
    }
  }

  /** Search engine referrer কিনা */
  isFromSearch(): boolean {
    const host = this.host();
    if (!host) return false;
    return SEARCH_ENGINES.some((s) => host.includes(s));
  }

  /** Social referrer কিনা */
  isFromSocial(): boolean {
    const host = this.host();
    if (!host) return false;
    return SOCIAL_PLATFORMS.some((s) => host.includes(s));
  }

  /** Internal referrer কিনা (own site — inject host) */
  isInternal(ownHost: string): boolean {
    const host = this.host();
    if (!host) return false;
    return host === ownHost.toLowerCase();
  }

  /** External referrer কিনা */
  isExternal(): boolean {
    return !this.isDirect();
  }

  /** Referrer category */
  category(ownHost: string): 'direct' | 'internal' | 'search' | 'social' | 'external' {
    if (this.isDirect()) return 'direct';
    if (this.isInternal(ownHost)) return 'internal';
    if (this.isFromSearch()) return 'search';
    if (this.isFromSocial()) return 'social';
    return 'external';
  }
}
