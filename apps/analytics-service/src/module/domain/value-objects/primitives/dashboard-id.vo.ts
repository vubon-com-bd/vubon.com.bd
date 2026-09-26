import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class DashboardIdVO extends BaseIdVO {
  static create(raw: string): DashboardIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DashboardId cannot be empty');
    }
    return new DashboardIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
