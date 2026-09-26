import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ClusterEntity } from '../entities/cluster.entity';
import { ClusterIdVO } from '../value-objects/primitives/cluster-id.vo';

export interface ClusterRepository
  extends BaseRepository<ClusterEntity, ClusterIdVO> {
  findByAlgorithm(algorithm: string): Promise<readonly ClusterEntity[]>;
  findWithVector(vectorId: string): Promise<readonly ClusterEntity[]>;
  findRecent(limit: number): Promise<readonly ClusterEntity[]>;
}
