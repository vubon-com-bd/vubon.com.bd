import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ClusterIdVO } from '../value-objects/primitives/cluster-id.vo';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { ClusterResultVO } from '../value-objects/composites/cluster-result.vo';

export interface ClusterEntityProps {
  readonly vectorIds: readonly VectorIdVO[];
  readonly algorithm: string;
  readonly result: ClusterResultVO;
}

export class ClusterEntity extends AggregateRoot<ClusterIdVO> {
  private readonly _vectorIds: readonly VectorIdVO[];
  private readonly _algorithm: string;
  private readonly _result: ClusterResultVO;

  private constructor(
    id: ClusterIdVO,
    props: ClusterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vectorIds = Object.freeze([...props.vectorIds]);
    this._algorithm = props.algorithm;
    this._result = props.result;
  }

  static create(props: ClusterEntityProps): ClusterEntity {
    if (props.vectorIds.length === 0) {
      throw new Error('Cluster: vectorIds cannot be empty');
    }
    const now = new Date().toISOString();
    const id = ClusterIdVO.create(crypto.randomUUID());
    return new ClusterEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ClusterIdVO,
    props: ClusterEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ClusterEntity {
    return new ClusterEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  vectorCount(): number {
    return this._vectorIds.length;
  }

  get vectorIds(): readonly VectorIdVO[] { return this._vectorIds; }
  get algorithm(): string { return this._algorithm; }
  get result(): ClusterResultVO { return this._result; }
}
