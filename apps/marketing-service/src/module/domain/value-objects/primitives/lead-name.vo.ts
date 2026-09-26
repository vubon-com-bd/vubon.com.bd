import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class LeadNameVO extends BaseNameVO {
  static create(raw: string): LeadNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1) {
      throw new Error('LeadName cannot be empty');
    }
    return new LeadNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
