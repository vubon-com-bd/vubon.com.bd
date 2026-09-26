import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_RANKING_FEATURE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_RANKING_FEATURE));

export class RankingFeatureVO extends BaseTypeVO<string> {
  static create(raw: string): RankingFeatureVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid ranking feature: ${raw}`);
    }
    return new RankingFeatureVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
