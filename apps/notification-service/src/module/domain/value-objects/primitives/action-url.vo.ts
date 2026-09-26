import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

export class ActionUrlVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActionUrlVO {
    BaseCodeVO.validateNonEmpty(raw, 'ActionUrl');
    const trimmed = raw.trim();
    if (!REGEX.URL.test(trimmed)) {
      throw new Error(`Invalid action URL: ${raw}`);
    }
    return new ActionUrlVO(trimmed);
  }
}
