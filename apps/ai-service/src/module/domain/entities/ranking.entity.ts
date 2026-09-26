import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RankingIdVO } from '../value-objects/primitives/ranking-id.vo';
import { RankingAlgorithmVO } from '../value-objects/primitives/ranking-algorithm.vo';
import { RankingFeatureVO } from '../value-objects/primitives/ranking-feature.vo';
import { RankingResultVO } from '../value-objects/composites/ranking-result.vo';

export interface RankingEntityProps {
  readonly algorithm: RankingAlgorithmVO;
  readonly features: readonly RankingFeatureVO[];
  readonly result: RankingResultVO;
}

export class RankingEntity extends AggregateRoot<RankingIdVO> {
  private readonly _algorithm: RankingAlgorithmVO;
  private readonly _features: readonly RankingFeatureVO[];
  private readonly _result: RankingResultVO;

  private constructor(
    id: RankingIdVO,
    props: RankingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._algorithm = props.algorithm;
    this._features = Object.freeze([...props.features]);
    this._result = props.result;
  }

  static create(props: RankingEntityProps): RankingEntity {
    const now = new Date().toISOString();
    const id = RankingIdVO.create(crypto.randomUUID());
    return new RankingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: RankingIdVO,
    props: RankingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RankingEntity {
    return new RankingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  usesFeature(feature: RankingFeatureVO): boolean {
    return this._features.some((f) => f.value === feature.value);
  }

  get algorithm(): RankingAlgorithmVO { return this._algorithm; }
  get features(): readonly RankingFeatureVO[] { return this._features; }
  get result(): RankingResultVO { return this._result; }
}
