import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ClusterIdVO } from '../value-objects/primitives/cluster-id.vo';
import { ClusterResultVO } from '../value-objects/composites/cluster-result.vo';

export interface ClusterResultEntityProps {
  readonly clusterId: ClusterIdVO;
  readonly result: ClusterResultVO;
}

export class ClusterResultEntity extends BaseEntity<ClusterIdVO> {
  private readonly _clusterId: ClusterIdVO;
  private readonly _result: ClusterResultVO;

  private constructor(
    id: ClusterIdVO,
    props: ClusterResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._clusterId = props.clusterId;
    this._result = props.result;
  }

  static create(props: ClusterResultEntityProps): ClusterResultEntity {
    const now = new Date().toISOString();
    return new ClusterResultEntity(props.clusterId, props, now, now, null);
  }

  static reconstitute(
    id: ClusterIdVO,
    props: ClusterResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ClusterResultEntity {
    return new ClusterResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  clusterCount(): number {
    return this._result.clusterCount();
  }

  totalMembers(): number {
    return this._result.totalMembers();
  }

  get clusterId(): ClusterIdVO { return this._clusterId; }
  get result(): ClusterResultVO { return this._result; }
}
