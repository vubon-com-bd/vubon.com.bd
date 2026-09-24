import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TemplateIdVO extends BaseIdVO {
  static create(value: string): TemplateIdVO {
    return new TemplateIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
