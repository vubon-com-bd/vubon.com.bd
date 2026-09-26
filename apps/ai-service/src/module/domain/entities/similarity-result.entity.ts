import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { SimilarityIdVO } from '../value-objects/primitives/similarity-id.vo';
import { SimilarityResultVO } from '../value-objects/composites/similarity-result.vo';

export interface SimilarityResultEntityProps {
  readonly similarityId: SimilarityIdVO;
  readonly result: SimilarityResultVO;
}

export class SimilarityResultEntity extends BaseEntity<SimilarityIdVO> {
  private readonly _similarityId: SimilarityIdVO;
  private readonly _result: SimilarityResultVO;

  private constructor(
    id: SimilarityIdVO,
    props: SimilarityResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._similarityId = props.similarityId;
    this._result = props.result;
  }

  static create(props: SimilarityResultEntityProps): SimilarityResultEntity {
    const now = new Date().toISOString();
    return new SimilarityResultEntity(props.similarityId, props, now, now, null);
  }

  static reconstitute(
    id: SimilarityIdVO,
    props: SimilarityResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SimilarityResultEntity {
    return new SimilarityResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  size(): number {
    return this._result.size();
  }

  topMatch(): { vectorId: string; score: number } | null {
    const m = this._result.topMatch();
    return m ? { vectorId: m.vectorId, score: m.score } : null;
  }

  get similarityId(): SimilarityIdVO { return this._similarityId; }
  get result(): SimilarityResultVO { return this._result; }
}
