import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class TemplateIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('TemplateId cannot be empty');
    }
    return new TemplateIdVO(raw);
  }
}
