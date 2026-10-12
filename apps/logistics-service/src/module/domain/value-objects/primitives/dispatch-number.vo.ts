/**
 * DispatchNumber Value Object — DSP-YYYYMMDD-XXXX
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const DISPATCH_PATTERN = /^DSP-\d{8}-[A-Z0-9]{4}$/;

export class DispatchNumberVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static generate(sequence: number, date: Date = new Date()): DispatchNumberVO {
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new ValidationError('Dispatch sequence must be non-negative integer', 'sequence');
    }
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return new DispatchNumberVO(`DSP-${yyyy}${mm}${dd}-${String(sequence).padStart(4, '0')}`);
  }

  static create(raw: string): DispatchNumberVO {
    if (typeof raw !== 'string' || !DISPATCH_PATTERN.test(raw.trim().toUpperCase())) {
      throw new ValidationError('Invalid dispatch number (expected DSP-YYYYMMDD-XXXX)', 'dispatchNumber');
    }
    return new DispatchNumberVO(raw.trim().toUpperCase());
  }

  static reconstitute(raw: string): DispatchNumberVO { return new DispatchNumberVO(raw); }

  get dateKey(): string { return this.value.split('-')[1] ?? ''; }
  get sequence(): number { return Number(this.value.split('-')[2]); }
}
