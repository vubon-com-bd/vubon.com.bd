/**
 * ComplaintIdVO — Complaint record identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'cmp_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class ComplaintIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ComplaintIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ComplaintId must be a string', 'complaintId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ComplaintId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'complaintId',
      );
    }
    return new ComplaintIdVO(trimmed);
  }

  static generate(): ComplaintIdVO {
    const suffix = Date.now().toString(36);
    return ComplaintIdVO.create(`${PREFIX}${suffix}`);
  }
}
