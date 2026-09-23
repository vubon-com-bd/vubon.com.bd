import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SocialMediaIdVO extends BaseIdVO {
  static create(raw: string): SocialMediaIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SocialMediaId cannot be empty');
    }
    return new SocialMediaIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
