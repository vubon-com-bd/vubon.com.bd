/**
 * ReturnPolicyType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RETURN_TYPE } from '@vubon/shared-constants/business';

export type ReturnPolicyTypeValue =
  (typeof VENDOR_RETURN_TYPE)[keyof typeof VENDOR_RETURN_TYPE];

const VALID_TYPES = new Set<string>(Object.values(VENDOR_RETURN_TYPE));

export class ReturnPolicyTypeVO extends BaseTypeVO<ReturnPolicyTypeValue> {
  private constructor(value: ReturnPolicyTypeValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  static create(raw: string): ReturnPolicyTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnPolicyType must be a string', 'returnPolicyType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.has(normalized)) {
      throw new ValidationError(
        `Invalid ReturnPolicyType: "${normalized}". Allowed: ${[...VALID_TYPES].join(', ')}`,
        'returnPolicyType',
      );
    }
    return new ReturnPolicyTypeVO(normalized as ReturnPolicyTypeValue);
  }

  static reconstitute(raw: string): ReturnPolicyTypeVO {
    return new ReturnPolicyTypeVO(raw as ReturnPolicyTypeValue);
  }

  // ─── Predicates ───
  isNoReturn(): boolean { return this.value === 'no_return'; }
  isFullReturn(): boolean { return this.value === 'full_return'; }
  isExchangeOnly(): boolean { return this.value === 'exchange_only'; }
  isPartialReturn(): boolean { return this.value === 'partial_return'; }
  isConditional(): boolean { return this.value === 'conditional'; }

  /** Refund is issued (full or partial) */
  issuesRefund(): boolean {
    return this.isFullReturn() || this.isPartialReturn();
  }

  /** Any form of return allowed */
  allowsReturn(): boolean {
    return !this.isNoReturn();
  }

  /** Cash refund vs store credit */
  isCashRefund(): boolean {
    return this.isFullReturn();
  }

  /** Return is contingent on condition review */
  requiresConditionCheck(): boolean {
    return this.isConditional() || this.isPartialReturn();
  }
}
