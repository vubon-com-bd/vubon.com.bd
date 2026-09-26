import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

export class TemplateNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateNameVO {
    BaseNameVO.validate(raw);
    return new TemplateNameVO(BaseNameVO.normalize(raw));
  }
}
