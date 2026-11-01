/**
 * ProviderName Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EMAIL_PROVIDER, SMS_PROVIDER, PUSH_PROVIDER } from '@vubon/shared-constants/platform';
import { InvalidProviderNameError } from '@domain/errors/provider.errors.js';

const ALL_KNOWN = [
  ...Object.values(EMAIL_PROVIDER),
  ...Object.values(SMS_PROVIDER),
  ...Object.values(PUSH_PROVIDER),
] as readonly string[];

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;
const NAME_PATTERN = /^[a-z0-9][a-z0-9_\-]*$/;

export class ProviderNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string, allowed?: readonly string[]): ProviderNameVO {
    if (typeof raw !== 'string') {
      throw new InvalidProviderNameError(String(raw), allowed ?? ALL_KNOWN);
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new InvalidProviderNameError(normalized, allowed ?? ALL_KNOWN);
    }
    if (!NAME_PATTERN.test(normalized)) {
      throw new InvalidProviderNameError(normalized, allowed ?? ALL_KNOWN);
    }
    if (allowed && !allowed.includes(normalized)) {
      throw new InvalidProviderNameError(normalized, allowed);
    }
    return new ProviderNameVO(normalized);
  }

  static reconstitute(raw: string): ProviderNameVO {
    return new ProviderNameVO(raw);
  }

  isKnown(): boolean { return ALL_KNOWN.includes(this.value); }
}
