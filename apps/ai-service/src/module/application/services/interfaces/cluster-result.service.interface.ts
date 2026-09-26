import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ClusterResultEntity } from '../../../domain/entities/cluster-result.entity';
import type { ClusterIdVO } from '../../../domain/value-objects/primitives/cluster-id.vo';

export interface ClusterResultServiceInterface
  extends BaseServiceInterface<ClusterResultEntity, ClusterIdVO> {
  findByClusterId(clusterId: string): Promise<ClusterResultEntity | null>;
}
