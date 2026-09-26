import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class RankingIdVO extends BaseIdVO {
  static create(value: string): RankingIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('RankingId cannot be empty');
    }
    return new RankingIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
