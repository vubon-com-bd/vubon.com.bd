import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PromptTemplateVO extends BaseCodeVO {
  static create(raw: string): PromptTemplateVO {
    BaseCodeVO.validateNonEmpty(raw, 'PromptTemplate');
    if (raw.length > 10000) {
      throw new Error('PromptTemplate cannot exceed 10000 characters');
    }
    return new PromptTemplateVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  get variables(): readonly string[] {
    const matches = this.value.match(/\{\{\s*(\w+)\s*\}\}/g) ?? [];
    return matches.map((m) => m.replace(/[{}\s]/g, ''));
  }
}
