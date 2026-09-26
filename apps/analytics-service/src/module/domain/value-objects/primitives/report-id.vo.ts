import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ReportIdVO extends BaseIdVO {
  static create(raw: string): ReportIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ReportId cannot be empty');
    }
    return new ReportIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
