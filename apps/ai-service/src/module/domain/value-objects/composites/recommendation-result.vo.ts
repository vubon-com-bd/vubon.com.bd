import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { RecommendationScoreVO } from '../primitives/recommendation-score.vo';

export interface RecommendationResultItemProps {
  readonly productId: ProductIdVO;
  readonly score: RecommendationScoreVO;
  readonly rank: number;
  readonly reason: string | null;
}

export interface RecommendationResultProps {
  readonly items: readonly RecommendationResultItemProps[];
  readonly generatedAt: Date;
}

export class RecommendationResultVO extends BaseVO<RecommendationResultProps> {
  static create(props: RecommendationResultProps): RecommendationResultVO {
    for (const item of props.items) {
      if (item.rank < 1) {
        throw new Error('RecommendationResult: rank must be >= 1');
      }
    }
    return new RecommendationResultVO(props);
  }

  private constructor(props: RecommendationResultProps) {
    super(
      Object.freeze({
        ...props,
        items: Object.freeze(props.items.map((i) => Object.freeze({ ...i }))),
      }),
    );
  }

  get items(): readonly RecommendationResultItemProps[] { return this.value.items; }
  get generatedAt(): Date { return this.value.generatedAt; }

  get topN(): RecommendationResultItemProps | null {
    return this.value.items[0] ?? null;
  }

  size(): number {
    return this.value.items.length;
  }
}
