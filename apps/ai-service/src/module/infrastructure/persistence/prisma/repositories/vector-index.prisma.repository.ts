import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiVectorIndex as PrismaIndex } from '@prisma/client';
import { VectorIndexEntity } from '../../../../domain/entities/vector-index.entity';
import type { VectorIndexRepository } from '../../../../domain/repositories/vector-index.repository.interface';
import { VectorIdVO } from '../../../../domain/value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../../../../domain/value-objects/primitives/vector-name.vo';
import { VectorIndexTypeVO } from '../../../../domain/value-objects/primitives/vector-index-type.vo';
import { VectorStatusVO } from '../../../../domain/value-objects/primitives/vector-status.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VectorIndexPrismaRepository
  extends BasePrismaRepository<VectorIndexEntity, VectorIdVO>
  implements VectorIndexRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaIndex): VectorIndexEntity {
    return VectorIndexEntity.reconstitute(
      VectorIdVO.create(raw.id),
      {
        name: VectorNameVO.create(raw.name),
        type: VectorIndexTypeVO.create(raw.type),
        dimension: raw.dimension,
        provider: raw.provider,
        status: VectorStatusVO.create(raw.status),
        entryCount: raw.entryCount,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VectorIdVO): Promise<VectorIndexEntity | null> {
    const raw = await this.prisma.aiVectorIndex.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VectorIndexEntity[]> {
    const rows = await this.prisma.aiVectorIndex.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VectorIndexEntity): Promise<VectorIndexEntity> {
    const data = {
      name: entity.name.value,
      type: entity.type.value,
      dimension: entity.dimension,
      provider: entity.provider,
      status: entity.status.value,
      entryCount: entity.entryCount,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiVectorIndex.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VectorIdVO): Promise<void> {
    await this.prisma.aiVectorIndex.update({ where: { id: id.value }, data: { deletedAt: new Date() } });
  }

  async findByName(name: VectorNameVO): Promise<VectorIndexEntity | null> {
    const raw = await this.prisma.aiVectorIndex.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllReady(): Promise<readonly VectorIndexEntity[]> {
    const rows = await this.prisma.aiVectorIndex.findMany({
      where: { status: 'ready', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByProvider(provider: string): Promise<readonly VectorIndexEntity[]> {
    const rows = await this.prisma.aiVectorIndex.findMany({
      where: { provider, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findStale(): Promise<readonly VectorIndexEntity[]> {
    const rows = await this.prisma.aiVectorIndex.findMany({
      where: { status: 'stale', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
