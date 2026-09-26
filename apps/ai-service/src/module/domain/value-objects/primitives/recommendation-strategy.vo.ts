import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'collaborative_filtering',
  'content_based',
  'hybrid',
  'matrix_factorization',
  'popularity',
  'recently_viewed',
]);

export class RecommendationStrategyVO extends BaseTypeVO<string> {
  static create(raw: string): RecommendationStrategyVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid recommendation strategy: ${raw}`);
    }
    return new RecommendationStrategyVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isCollaborative(): boolean { return this.value === 'collaborative_filtering'; }
  isContentBased(): boolean { return this.value === 'content_based'; }
  isHybrid(): boolean { return this.value === 'hybrid'; }
}
