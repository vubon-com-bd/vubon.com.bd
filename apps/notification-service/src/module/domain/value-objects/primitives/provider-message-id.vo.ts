import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class ProviderMessageIdVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProviderMessageIdVO {
    BaseCodeVO.validateNonEmpty(raw, 'ProviderMessageId');
    return new ProviderMessageIdVO(raw);
  }
}
