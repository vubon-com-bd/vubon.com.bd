import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class CompletionIdVO extends BaseIdVO {
  static create(value: string): CompletionIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('CompletionId cannot be empty');
    }
    return new CompletionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
