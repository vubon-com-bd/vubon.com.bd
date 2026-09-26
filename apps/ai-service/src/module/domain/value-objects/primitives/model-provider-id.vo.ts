import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ModelProviderIdVO extends BaseIdVO {
  static create(value: string): ModelProviderIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('ModelProviderId cannot be empty');
    }
    return new ModelProviderIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
