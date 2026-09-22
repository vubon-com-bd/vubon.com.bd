import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderNoteVO extends BaseVO<string> {
  static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNoteVO {
    const trimmed = raw.trim();
    if (trimmed.length > OrderNoteVO.MAX_LENGTH) {
      throw new ValidationError(
        'OrderNote',
        `must not exceed ${OrderNoteVO.MAX_LENGTH} characters`,
      );
    }
    return new OrderNoteVO(trimmed);
  }
}
