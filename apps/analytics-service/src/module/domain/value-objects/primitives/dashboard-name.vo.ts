import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class DashboardNameVO extends BaseNameVO {
  private static readonly MAX_LENGTH = 150;

  static create(raw: string): DashboardNameVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('DashboardName cannot be empty');
    }
    if (trimmed.length > DashboardNameVO.MAX_LENGTH) {
      throw new Error(`DashboardName too long: ${trimmed.length}`);
    }
    return new DashboardNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
