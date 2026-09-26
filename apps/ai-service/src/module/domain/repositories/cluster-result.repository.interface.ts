import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ClusterResultEntity } from '../entities/cluster-result.entity';
import { ClusterIdVO } from '../value-objects/primitives/cluster-id.vo';

export interface ClusterResultRepository
  extends BaseRepository<ClusterResultEntity, ClusterIdVO> {
  findByClusterId(clusterId: ClusterIdVO): Promise<ClusterResultEntity | null>;
}
