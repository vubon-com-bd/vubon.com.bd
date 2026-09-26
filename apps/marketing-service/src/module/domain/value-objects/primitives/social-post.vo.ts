import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SocialPostVO extends BaseCodeVO {
  static create(raw: string): SocialPostVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SocialPost cannot be empty');
    }
    return new SocialPostVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
