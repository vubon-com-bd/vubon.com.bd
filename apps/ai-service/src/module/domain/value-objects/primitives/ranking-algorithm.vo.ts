import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_RANKING_ALGORITHM } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_RANKING_ALGORITHM));

export class RankingAlgorithmVO extends BaseTypeVO<string> {
  static create(raw: string): RankingAlgorithmVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid ranking algorithm: ${raw}`);
    }
    return new RankingAlgorithmVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
