import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class KpiIdVO extends BaseIdVO {
  static create(raw: string): KpiIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('KpiId cannot be empty');
    }
    return new KpiIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
