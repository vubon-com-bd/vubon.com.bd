/**
 * SettlementId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SettlementIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SettlementIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SettlementId cannot be empty', 'settlementId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SettlementId must be a valid UUID', 'settlementId');
    }
    return new SettlementIdVO(trimmed);
  }

  static reconstitute(raw: string): SettlementIdVO {
    return new SettlementIdVO(raw);
  }
}
