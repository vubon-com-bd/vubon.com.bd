import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class AiSearchIdVO extends BaseIdVO {
  static create(value: string): AiSearchIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('AiSearchId cannot be empty');
    }
    return new AiSearchIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
