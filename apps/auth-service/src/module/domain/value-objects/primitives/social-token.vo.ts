import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SocialTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SocialTokenVO {
    BaseCodeVO.validateNonEmpty(raw, 'SocialToken');
    return new SocialTokenVO(raw);
  }
}
