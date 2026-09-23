import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'damaged',
  'wrong_item',
  'not_as_described',
  'changed_mind',
  'late_delivery',
  'other',
]);

export class ReturnReasonTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnReasonTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid return reason type: ${raw}`);
    }
    return new ReturnReasonTypeVO(raw);
  }
}
