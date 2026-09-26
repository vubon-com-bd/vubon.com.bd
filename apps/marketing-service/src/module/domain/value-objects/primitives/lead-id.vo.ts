import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class LeadIdVO extends BaseIdVO {
  static create(raw: string): LeadIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('LeadId cannot be empty');
    }
    return new LeadIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
