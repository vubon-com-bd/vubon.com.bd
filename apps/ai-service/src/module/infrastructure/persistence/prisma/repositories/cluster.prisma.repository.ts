import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiCluster as PrismaCluster } from '@prisma/client';
import { ClusterEntity } from '../../../../domain/entities/cluster.entity';
import type { ClusterRepository } from '../../../../domain/repositories/cluster.repository.interface';
import { ClusterIdVO } from '../../../../domain/value-objects/primitives/cluster-id.vo';
import { VectorIdVO } from '../../../../domain/value-objects/primitives/vector-id.vo';
import { ClusterResultVO } from '../../../../domain/value-objects/composites/cluster-result.vo';
import { PrismaService } from '../prisma.service';

interface ClusterEntry {
  readonly clusterIndex: number;
  readonly memberIds: readonly string[];
  readonly centroid: readonly number[];
}

@Injectable()
export class ClusterPrismaRepository
  extends BasePrismaRepository<ClusterEntity, ClusterIdVO>
  implements ClusterRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaCluster): ClusterEntity {
    const clusters = (raw.result as unknown as ClusterEntry[]) ?? [];
    return ClusterEntity.reconstitute(
      ClusterIdVO.create(raw.id),
      {
        vectorIds: raw.vectorIds.map((id) => VectorIdVO.create(id)),
        algorithm: raw.algorithm,
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

  async findById(id: ClusterIdVO): Promise<ClusterEntity | null> {
    const raw = await this.prisma.aiCluster.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ClusterEntity[]> {
    const rows = await this.prisma.aiCluster.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ClusterEntity): Promise<ClusterEntity> {
    const data = {
      vectorIds: entity.vectorIds.map((v) => v.value),
      algorithm: entity.algorithm,
      clusterCount: entity.result.clusterCount(),
      totalMembers: entity.result.totalMembers(),
      result: entity.result.clusters as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiCluster.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ClusterIdVO): Promise<void> {
    await this.prisma.aiCluster.delete({ where: { id: id.value } });
  }

  async findByAlgorithm(algorithm: string): Promise<readonly ClusterEntity[]> {
    const rows = await this.prisma.aiCluster.findMany({ where: { algorithm } });
    return rows.map((r) => this.toDomain(r));
  }

  async findWithVector(vectorId: string): Promise<readonly ClusterEntity[]> {
    const rows = await this.prisma.aiCluster.findMany({
      where: { vectorIds: { has: vectorId } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(limit: number): Promise<readonly ClusterEntity[]> {
    const rows = await this.prisma.aiCluster.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
