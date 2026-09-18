import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SsoTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SsoTokenVO {
    BaseCodeVO.validateNonEmpty(raw, 'SsoToken');
    return new SsoTokenVO(raw);
  }
}
