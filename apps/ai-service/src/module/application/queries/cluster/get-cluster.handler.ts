import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetClusterQuery } from './get-cluster.query';
import type { ClusterRepository } from '../../../domain/repositories/cluster.repository.interface';
import { ClusterIdVO } from '../../../domain/value-objects/primitives/cluster-id.vo';
import type { ClusterResponseDTO } from '../../dtos/responses/cluster-response.dto';

@QueryHandler(GetClusterQuery)
export class GetClusterHandler
  extends BaseQueryHandler<GetClusterQuery, ClusterResponseDTO | null>
  implements IQueryHandler<GetClusterQuery>
{
  readonly queryType = 'ai.cluster.get';
  constructor(private readonly clusterRepo: ClusterRepository) { super(); }

  async execute(query: GetClusterQuery): Promise<ClusterResponseDTO | null> {
    const entity = await this.clusterRepo.findById(ClusterIdVO.create(query.clusterId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      algorithm: entity.algorithm,
      clusterCount: entity.result.clusterCount(),
      totalMembers: entity.result.totalMembers(),
      clusters: entity.result.clusters.map((c) => ({
        clusterIndex: c.clusterIndex,
        memberIds: c.memberIds,
        centroid: c.centroid,
      })),
      createdAt: entity.createdAt,
    };
  }
}
