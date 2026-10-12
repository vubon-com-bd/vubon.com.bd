/**
 * Page Path Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Page-এর URL path (analytics tracking-এর জন্য)।
 * Business Rule:
 * - Must start with "/"
 * - Max 500 chars
 * - Query string allowed
 * - Hash fragment allowed
 * - No protocol/host (relative path only)
 * - Normalize: lowercase, remove trailing slash (except root)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 500;

export class PagePathVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PagePathVO {
    if (typeof raw !== 'string') {
      throw new Error('PagePath must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      throw new Error('PagePath cannot be empty');
    }

    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`PagePath must be at most ${MAX_LENGTH} chars`);
    }

    if (!trimmed.startsWith('/')) {
      throw new Error('PagePath must start with "/"');
    }

    if (/^https?:\/\//i.test(trimmed)) {
      throw new Error('PagePath must be relative (no protocol)');
    }

    // Normalize trailing slash (except root)
    const normalized =
      trimmed.length > 1 && trimmed.endsWith('/')
        ? trimmed.slice(0, -1)
        : trimmed;

    return new PagePathVO(normalized);
  }

  /** Root path কিনা */
  isRoot(): boolean {
    return this.value === '/';
  }

  /** Query string আছে কিনা */
  hasQuery(): boolean {
    return this.value.includes('?');
  }

  /** Hash fragment আছে কিনা */
  hasHash(): boolean {
    return this.value.includes('#');
  }

  /** Query string ছাড়া path */
  basePath(): string {
    const qIndex = this.value.indexOf('?');
    const hIndex = this.value.indexOf('#');
    let cut = this.value.length;
    if (qIndex >= 0) cut = Math.min(cut, qIndex);
    if (hIndex >= 0) cut = Math.min(cut, hIndex);
    return this.value.slice(0, cut);
  }

  /** Path segments */
  segments(): readonly string[] {
    return this.basePath()
      .split('/')
      .filter((s) => s.length > 0);
  }

  /** Depth (segment count) */
  depth(): number {
    return this.segments().length;
  }

  /** Dynamic segment আছে কিনা (e.g., /product/123) */
  hasDynamicSegment(): boolean {
    return this.segments().some((s) => /^\d+$/.test(s) || /^[0-9a-f]{8,}$/i.test(s));
  }
}
