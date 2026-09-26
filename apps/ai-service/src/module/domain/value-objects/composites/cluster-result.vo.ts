import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ClusterIdVO } from '../primitives/cluster-id.vo';

export interface ClusterEntryProps {
  readonly clusterIndex: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

export interface ClusterResultProps {
  readonly id: ClusterIdVO;
  readonly clusters: readonly ClusterEntryProps[];
  readonly algorithm: string;
}

export class ClusterResultVO extends BaseVO<ClusterResultProps> {
  static create(props: ClusterResultProps): ClusterResultVO {
    for (const cluster of props.clusters) {
      if (cluster.clusterIndex < 0) {
        throw new Error('ClusterResult: clusterIndex cannot be negative');
      }
    }
    return new ClusterResultVO(props);
  }

  private constructor(props: ClusterResultProps) {
    super(
      Object.freeze({
        ...props,
        clusters: Object.freeze(
          props.clusters.map((c) =>
            Object.freeze({
              ...c,
              memberIds: Object.freeze([...c.memberIds]),
              centroid: Object.freeze([...c.centroid]),
            }),
          ),
        ),
      }),
    );
  }

  get id(): ClusterIdVO { return this.value.id; }
  get clusters(): readonly ClusterEntryProps[] { return this.value.clusters; }
  get algorithm(): string { return this.value.algorithm; }

  clusterCount(): number {
    return this.value.clusters.length;
  }

  totalMembers(): number {
    return this.value.clusters.reduce((sum, c) => sum + c.memberIds.length, 0);
  }
}
