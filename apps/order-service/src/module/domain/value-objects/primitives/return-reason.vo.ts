import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'wrong_item',
  'damaged',
  'defective',
  'not_as_described',
  'size_mismatch',
  'changed_mind',
  'late_delivery',
  'quality_issue',
]);

export class ReturnReasonVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnReasonVO {
    const trimmed = raw.trim();
    if (VALID.has(trimmed)) {
      return new ReturnReasonVO(trimmed);
    }
    if (trimmed.length === 0 || trimmed.length > ReturnReasonVO.MAX_LENGTH) {
      throw new ValidationError(
        'ReturnReason',
        `must be 1-${ReturnReasonVO.MAX_LENGTH} characters`,
      );
    }
    return new ReturnReasonVO(trimmed);
  }
}
