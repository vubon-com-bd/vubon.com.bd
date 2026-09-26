import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RankingIdVO } from '../primitives/ranking-id.vo';
import { RankingAlgorithmVO } from '../primitives/ranking-algorithm.vo';
import { RankingFeatureVO } from '../primitives/ranking-feature.vo';
import { RankingResultVO } from './ranking-result.vo';

export interface RankingProps {
  readonly id: RankingIdVO;
  readonly algorithm: RankingAlgorithmVO;
  readonly features: readonly RankingFeatureVO[];
  readonly result: RankingResultVO;
}

export class RankingVO extends BaseVO<RankingProps> {
  static create(props: RankingProps): RankingVO {
    return new RankingVO(props);
  }

  private constructor(props: RankingProps) {
    super(
      Object.freeze({
        ...props,
        features: Object.freeze([...props.features]),
      }),
    );
  }

  get id(): RankingIdVO { return this.value.id; }
  get algorithm(): RankingAlgorithmVO { return this.value.algorithm; }
  get features(): readonly RankingFeatureVO[] { return this.value.features; }
  get result(): RankingResultVO { return this.value.result; }

  usesFeature(feature: RankingFeatureVO): boolean {
    return this.value.features.some((f) => f.value === feature.value);
  }
}
