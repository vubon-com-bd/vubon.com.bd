import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class EmailTemplateIdVO extends BaseIdVO {
  static create(raw: string): EmailTemplateIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('EmailTemplateId cannot be empty');
    }
    return new EmailTemplateIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
