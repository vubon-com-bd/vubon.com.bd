import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiVector as PrismaVector } from '@prisma/client';
import { VectorEntity } from '../../../../domain/entities/vector.entity';
import type { VectorRepository } from '../../../../domain/repositories/vector.repository.interface';
import { VectorIdVO } from '../../../../domain/value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../../../../domain/value-objects/primitives/vector-name.vo';
import { VectorDimensionVO } from '../../../../domain/value-objects/primitives/vector-dimension.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VectorPrismaRepository
  extends BasePrismaRepository<VectorEntity, VectorIdVO>
  implements VectorRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaVector): VectorEntity {
    return VectorEntity.reconstitute(
      VectorIdVO.create(raw.id),
      {
        name: VectorNameVO.create(raw.name),
        dimension: VectorDimensionVO.create(raw.dimension),
        values: raw.values as number[],
        index: null,
        metadata: (raw.metadata as Record<string, string | number | boolean>) ?? {},
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VectorIdVO): Promise<VectorEntity | null> {
    const raw = await this.prisma.aiVector.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VectorEntity[]> {
    const rows = await this.prisma.aiVector.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VectorEntity): Promise<VectorEntity> {
    const data = {
      name: entity.name.value,
      dimension: entity.dimension.value,
      values: [...entity.values] as unknown as object,
      metadata: { ...entity.metadata } as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiVector.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VectorIdVO): Promise<void> {
    await this.prisma.aiVector.update({ where: { id: id.value }, data: { deletedAt: new Date() } });
  }

  async findByName(name: VectorNameVO): Promise<VectorEntity | null> {
    const raw = await this.prisma.aiVector.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findUnindexed(): Promise<readonly VectorEntity[]> {
    const rows = await this.prisma.aiVector.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async findIndexed(): Promise<readonly VectorEntity[]> {
    const rows = await this.prisma.aiVector.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByDimension(dimension: number): Promise<readonly VectorEntity[]> {
    const rows = await this.prisma.aiVector.findMany({ where: { dimension, deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }
}
