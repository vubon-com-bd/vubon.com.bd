import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AiAnalyticsIdVO extends BaseIdVO {
  static create(value: string): AiAnalyticsIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('AiAnalyticsId cannot be empty');
    }
    return new AiAnalyticsIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
