import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ClusterServiceInterface } from '../interfaces/cluster.service.interface';
import type { ClusterRepository } from '../../../domain/repositories/cluster.repository.interface';
import type { VectorRepository } from '../../../domain/repositories/vector.repository.interface';
import { ClusterEntity } from '../../../domain/entities/cluster.entity';
import { ClusterIdVO } from '../../../domain/value-objects/primitives/cluster-id.vo';
import { VectorIdVO } from '../../../domain/value-objects/primitives/vector-id.vo';
import { ClusterResultVO } from '../../../domain/value-objects/composites/cluster-result.vo';
import { ClusteringService } from '../../../domain/services/clustering.service';
import { ClusteringFailedError } from '../../errors/cluster.errors';
import type { CreateClustersRequestDTO } from '../../dtos/requests/cluster/create-clusters.dto';
import type { ClusterResponseDTO } from '../../dtos/responses/cluster-response.dto';

@Injectable()
export class ClusterService
  extends BaseService<ClusterEntity, ClusterIdVO>
  implements ClusterServiceInterface
{
  readonly name = 'ClusterService';

  constructor(
    private readonly clusterRepo: ClusterRepository,
    private readonly vectorRepo: VectorRepository,
    private readonly clusteringService: ClusteringService,
  ) {
    super();
  }

  async create(input: CreateClustersRequestDTO): Promise<ClusterResponseDTO> {
    const algorithm = typeof input.algorithm === 'string' ? input.algorithm : 'kmeans';
    const k = typeof input.k === 'number' ? input.k : 2;
    const maxIterations = typeof input.maxIterations === 'number' ? input.maxIterations : 100;

    const vectors = await Promise.all(
      input.vectorIds.map((id) => this.vectorRepo.findById(VectorIdVO.create(id))),
    );

    const valid = vectors.filter((v): v is NonNullable<typeof v> => v !== null);
    if (valid.length < k) {
      throw new ClusteringFailedError('Not enough vectors for k clusters');
    }

    const clusterable = valid.map((v) => ({ id: v.id.value, values: v.values }));
    const clusters = this.clusteringService.kmeans(clusterable, k, maxIterations);

    const result = ClusterResultVO.create({
      id: ClusterIdVO.create(crypto.randomUUID()),
      clusters: clusters.map((c) => ({
        clusterIndex: c.index,
        memberIds: c.memberIds,
        centroid: c.centroid,
      })),
      algorithm,
    });

    const entity = ClusterEntity.create({
      vectorIds: valid.map((v) => v.id),
      algorithm,
      result,
    });

    await this.clusterRepo.save(entity);

    return {
      id: entity.id.value,
      algorithm: entity.algorithm,
      clusterCount: result.clusterCount(),
      totalMembers: result.totalMembers(),
      clusters: result.clusters.map((c) => ({
        clusterIndex: c.clusterIndex,
        memberIds: c.memberIds,
        centroid: c.centroid,
      })),
      createdAt: entity.createdAt,
    };
  }
}
