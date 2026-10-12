/**
 * VendorWebsite Value Object — http(s) URL only
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Url } from '@vubon/shared-types/common';

const MAX_LENGTH = 500;

export class VendorWebsiteVO extends BaseVO<Url> {
  private constructor(value: Url) {
    super(value);
  }

  static create(raw: string): VendorWebsiteVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor website must be a string', 'website');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Vendor website must be 1-${MAX_LENGTH} chars`, 'website');
    }
    if (!/^https?:\/\/[^\s]+$/i.test(trimmed)) {
      throw new ValidationError('Vendor website must be a valid http(s) URL', 'website');
    }
    try {
      const u = new URL(trimmed);
      if (!u.hostname.includes('.')) {
        throw new Error('bad host');
      }
    } catch {
      throw new ValidationError('Vendor website URL is malformed', 'website');
    }
    return new VendorWebsiteVO(trimmed as Url);
  }

  static reconstitute(raw: string): VendorWebsiteVO {
    return new VendorWebsiteVO(raw as Url);
  }

  isHttps(): boolean {
    return this.value.startsWith('https://');
  }

  getHostname(): string {
    try {
      return new URL(this.value).hostname;
    } catch {
      return '';
    }
  }

  normalize(): VendorWebsiteVO {
    try {
      const u = new URL(this.value);
      const normalized = `${u.protocol}//${u.hostname}${u.pathname === '/' ? '' : u.pathname}`;
      return new VendorWebsiteVO(normalized.replace(/\/$/, '') as Url);
    } catch {
      return this;
    }
  }
}
