/**
 * PolicyNumber Value Object — POL-YYYY-XXXXXX
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const POLICY_PATTERN = /^POL-\d{4}-[A-Z0-9]{6}$/;

export class PolicyNumberVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static generate(sequence: number, year = new Date().getFullYear()): PolicyNumberVO {
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new ValidationError('Policy sequence must be non-negative integer', 'sequence');
    }
    return new PolicyNumberVO(`POL-${year}-${String(sequence).padStart(6, '0')}`);
  }

  static create(raw: string): PolicyNumberVO {
    if (typeof raw !== 'string' || !POLICY_PATTERN.test(raw.trim().toUpperCase())) {
      throw new ValidationError('Invalid policy number (expected POL-YYYY-XXXXXX)', 'policyNumber');
    }
    return new PolicyNumberVO(raw.trim().toUpperCase());
  }

  static reconstitute(raw: string): PolicyNumberVO { return new PolicyNumberVO(raw); }

  get year(): number { return Number(this.value.split('-')[1]); }
  get sequence(): number { return Number(this.value.split('-')[2]); }
}
