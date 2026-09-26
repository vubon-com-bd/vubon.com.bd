import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class CompletionTextVO extends BaseCodeVO {
  static create(raw: string): CompletionTextVO {
    BaseCodeVO.validateNonEmpty(raw, 'CompletionText');
    if (raw.length > 100000) {
      throw new Error('CompletionText exceeds max length');
    }
    return new CompletionTextVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  get wordCount(): number {
    return this.value.trim().split(/\s+/).length;
  }
}
