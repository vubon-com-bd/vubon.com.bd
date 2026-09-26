import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiCluster as PrismaCluster } from '@prisma/client';
import { ClusterResultEntity } from '../../../../domain/entities/cluster-result.entity';
import type { ClusterResultRepository } from '../../../../domain/repositories/cluster-result.repository.interface';
import { ClusterIdVO } from '../../../../domain/value-objects/primitives/cluster-id.vo';
import { ClusterResultVO } from '../../../../domain/value-objects/composites/cluster-result.vo';
import { PrismaService } from '../prisma.service';

interface ClusterEntry {
  readonly clusterIndex: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

@Injectable()
export class ClusterResultPrismaRepository
  extends BasePrismaRepository<ClusterResultEntity, ClusterIdVO>
  implements ClusterResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaCluster): ClusterResultEntity {
    const clusters = (raw.result as unknown as ClusterEntry[]) ?? [];
    return ClusterResultEntity.reconstitute(
      ClusterIdVO.create(raw.id),
      {
        clusterId: ClusterIdVO.create(raw.id),
        result: ClusterResultVO.create({
          id: ClusterIdVO.create(raw.id),
          clusters,
          algorithm: raw.algorithm,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ClusterIdVO): Promise<ClusterResultEntity | null> {
    const raw = await this.prisma.aiCluster.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ClusterResultEntity[]> {
    const rows = await this.prisma.aiCluster.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ClusterResultEntity): Promise<ClusterResultEntity> {
    const data = {
      result: entity.result.clusters as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiCluster.upsert({
      where: { id: entity.clusterId.value },
      create: {
        id: entity.clusterId.value,
        algorithm: entity.result.algorithm,
        clusterCount: entity.result.clusterCount(),
        totalMembers: entity.result.totalMembers(),
        ...data,
      },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ClusterIdVO): Promise<void> {
    await this.prisma.aiCluster.delete({ where: { id: id.value } });
  }

  async findByClusterId(clusterId: ClusterIdVO): Promise<ClusterResultEntity | null> {
    const raw = await this.prisma.aiCluster.findUnique({ where: { id: clusterId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
