import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class CohortNameVO extends BaseNameVO {
  private static readonly MAX_LENGTH = 150;

  static create(raw: string): CohortNameVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('CohortName cannot be empty');
    }
    if (trimmed.length > CohortNameVO.MAX_LENGTH) {
      throw new Error(`CohortName too long: ${trimmed.length}`);
    }
    return new CohortNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
