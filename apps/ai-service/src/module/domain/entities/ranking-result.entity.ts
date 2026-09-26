import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { RankingIdVO } from '../value-objects/primitives/ranking-id.vo';
import { RankingResultVO } from '../value-objects/composites/ranking-result.vo';

export interface RankingResultEntityProps {
  readonly rankingId: RankingIdVO;
  readonly result: RankingResultVO;
}

export class RankingResultEntity extends BaseEntity<RankingIdVO> {
  private readonly _rankingId: RankingIdVO;
  private readonly _result: RankingResultVO;

  private constructor(
    id: RankingIdVO,
    props: RankingResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._rankingId = props.rankingId;
    this._result = props.result;
  }

  static create(props: RankingResultEntityProps): RankingResultEntity {
    const now = new Date().toISOString();
    return new RankingResultEntity(props.rankingId, props, now, now, null);
  }

  static reconstitute(
    id: RankingIdVO,
    props: RankingResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): RankingResultEntity {
    return new RankingResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get rankingId(): RankingIdVO { return this._rankingId; }
  get result(): RankingResultVO { return this._result; }

  size(): number {
    return this._result.size();
  }
}
