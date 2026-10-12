/**
 * ReturnType Value Object — vendor return policy type
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_RETURN_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_RETURN_TYPE) as readonly string[];

export class ReturnTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): ReturnTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid return type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'returnType',
      );
    }
    return new ReturnTypeVO(raw);
  }

  static reconstitute(raw: string): ReturnTypeVO {
    return new ReturnTypeVO(raw);
  }

  allowsReturn(): boolean {
    return this.value !== VENDOR_RETURN_TYPE.NO_RETURN;
  }

  allowsRefund(): boolean {
    return this.value === VENDOR_RETURN_TYPE.FULL_RETURN
      || this.value === VENDOR_RETURN_TYPE.PARTIAL_RETURN;
  }

  isExchangeOnly(): boolean {
    return this.value === VENDOR_RETURN_TYPE.EXCHANGE_ONLY;
  }

  isConditional(): boolean {
    return this.value === VENDOR_RETURN_TYPE.CONDITIONAL;
  }

  isFullReturn(): boolean {
    return this.value === VENDOR_RETURN_TYPE.FULL_RETURN;
  }
}
