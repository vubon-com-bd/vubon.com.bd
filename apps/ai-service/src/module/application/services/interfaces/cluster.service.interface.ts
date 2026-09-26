import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ClusterEntity } from '../../../domain/entities/cluster.entity';
import type { ClusterIdVO } from '../../../domain/value-objects/primitives/cluster-id.vo';
import type { CreateClustersRequestDTO } from '../../dtos/requests/cluster/create-clusters.dto';
import type { ClusterResponseDTO } from '../../dtos/responses/cluster-response.dto';

export interface ClusterServiceInterface
  extends BaseServiceInterface<ClusterEntity, ClusterIdVO> {
  create(input: CreateClustersRequestDTO): Promise<ClusterResponseDTO>;
}
