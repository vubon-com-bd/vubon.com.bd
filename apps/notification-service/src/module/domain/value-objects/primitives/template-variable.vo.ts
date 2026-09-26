import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

export class TemplateVariableVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateVariableVO {
    BaseCodeVO.validateNonEmpty(raw, 'TemplateVariable');
    if (!PATTERN.test(raw)) {
      throw new Error(`Invalid template variable name: ${raw}`);
    }
    return new TemplateVariableVO(raw);
  }
}
