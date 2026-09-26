import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PromptIdVO extends BaseIdVO {
  static create(value: string): PromptIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('PromptId cannot be empty');
    }
    return new PromptIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
