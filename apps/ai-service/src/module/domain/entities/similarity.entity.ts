import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SimilarityIdVO } from '../value-objects/primitives/similarity-id.vo';
import { SimilarityThresholdVO } from '../value-objects/primitives/similarity-threshold.vo';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { SimilarityResultVO } from '../value-objects/composites/similarity-result.vo';

export interface SimilarityEntityProps {
  readonly sourceVectorId: VectorIdVO;
  readonly targetVectorId: VectorIdVO;
  readonly metric: string;
  readonly threshold: SimilarityThresholdVO;
  readonly result: SimilarityResultVO;
}

export class SimilarityEntity extends AggregateRoot<SimilarityIdVO> {
  private readonly _sourceVectorId: VectorIdVO;
  private readonly _targetVectorId: VectorIdVO;
  private readonly _metric: string;
  private readonly _threshold: SimilarityThresholdVO;
  private readonly _result: SimilarityResultVO;

  private constructor(
    id: SimilarityIdVO,
    props: SimilarityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sourceVectorId = props.sourceVectorId;
    this._targetVectorId = props.targetVectorId;
    this._metric = props.metric;
    this._threshold = props.threshold;
    this._result = props.result;
  }

  static create(props: SimilarityEntityProps): SimilarityEntity {
    const now = new Date().toISOString();
    const id = SimilarityIdVO.create(crypto.randomUUID());
    return new SimilarityEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SimilarityIdVO,
    props: SimilarityEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SimilarityEntity {
    return new SimilarityEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isStrict(): boolean {
    return this._threshold.isStrict();
  }

  get sourceVectorId(): VectorIdVO { return this._sourceVectorId; }
  get targetVectorId(): VectorIdVO { return this._targetVectorId; }
  get metric(): string { return this._metric; }
  get threshold(): SimilarityThresholdVO { return this._threshold; }
  get result(): SimilarityResultVO { return this._result; }
}
