import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'product',
  'content',
  'user',
  'trending',
  'similar',
  'personalized',
]);

export class RecommendationTypeVO extends BaseTypeVO<string> {
  static create(raw: string): RecommendationTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid recommendation type: ${raw}`);
    }
    return new RecommendationTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isPersonalized(): boolean { return this.value === 'personalized'; }
  isTrending(): boolean { return this.value === 'trending'; }
}
