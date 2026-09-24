import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class CohortIdVO extends BaseIdVO {
  static create(raw: string): CohortIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('CohortId cannot be empty');
    }
    return new CohortIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
