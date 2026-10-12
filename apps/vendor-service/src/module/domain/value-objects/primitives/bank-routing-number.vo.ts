/**
 * BankRoutingNumber Value Object — BD routing number (9 digits)
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const LENGTH = 9;

export class BankRoutingNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BankRoutingNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Routing number must be a string', 'routingNumber');
    }
    const normalized = raw.replace(/\s+/g, '');
    if (normalized.length !== LENGTH) {
      throw new ValidationError(`Routing number must be exactly ${LENGTH} digits`, 'routingNumber');
    }
    if (!/^\d+$/.test(normalized)) {
      throw new ValidationError('Routing number must contain digits only', 'routingNumber');
    }
    return new BankRoutingNumberVO(normalized);
  }

  static reconstitute(raw: string): BankRoutingNumberVO {
    return new BankRoutingNumberVO(raw);
  }

  /** First 3 digits identify the bank in BD. */
  getBankCode(): string {
    return this.value.slice(0, 3);
  }

  /** Middle 3 digits identify the district. */
  getDistrictCode(): string {
    return this.value.slice(3, 6);
  }

  /** Last 3 digits identify the branch. */
  getBranchCode(): string {
    return this.value.slice(6, 9);
  }
}
