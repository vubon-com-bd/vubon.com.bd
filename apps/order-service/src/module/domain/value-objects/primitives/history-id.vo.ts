/**
 * HistoryId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class HistoryIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): HistoryIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('HistoryId cannot be empty', 'historyId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('HistoryId must be a valid UUID', 'historyId');
    }
    return new HistoryIdVO(trimmed);
  }

  static reconstitute(raw: string): HistoryIdVO { return new HistoryIdVO(raw); }
}
