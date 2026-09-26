import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ProductIdVO } from '../primitives/product-id.vo';

export interface RankedItemProps {
  readonly productId: ProductIdVO;
  readonly rank: number;
  readonly score: number;
  readonly features: Readonly<Record<string, number>>;
}

export interface RankingResultProps {
  readonly items: readonly RankedItemProps[];
  readonly algorithm: string;
}

export class RankingResultVO extends BaseVO<RankingResultProps> {
  static create(props: RankingResultProps): RankingResultVO {
    for (const item of props.items) {
      if (item.rank < 1) {
        throw new Error('RankingResult: rank must be >= 1');
      }
    }
    return new RankingResultVO(props);
  }

  private constructor(props: RankingResultProps) {
    super(
      Object.freeze({
        ...props,
        items: Object.freeze(
          props.items.map((i) =>
            Object.freeze({ ...i, features: Object.freeze({ ...i.features }) }),
          ),
        ),
      }),
    );
  }

  get items(): readonly RankedItemProps[] { return this.value.items; }
  get algorithm(): string { return this.value.algorithm; }

  size(): number {
    return this.value.items.length;
  }
}
