import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class OAuthTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OAuthTokenVO {
    BaseCodeVO.validateNonEmpty(raw, 'OAuthToken');
    return new OAuthTokenVO(raw);
  }
}
