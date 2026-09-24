import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class TemplateContentVO extends BaseCodeVO {
  static create(value: string): TemplateContentVO {
    BaseCodeVO.validateNonEmpty(value, 'TemplateContent');
    return new TemplateContentVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
