import { Injectable } from '@nestjs/common';
import { Dimension as PrismaDimension } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DimensionEntity } from '../../../../domain/entities/dimension.entity';
import { DimensionIdVO } from '../../../../domain/value-objects/primitives/dimension-id.vo';
import { DimensionNameVO } from '../../../../domain/value-objects/primitives/dimension-name.vo';
import type { DimensionRepository } from '../../../../domain/repositories/dimension.repository.interface';

@Injectable()
export class DimensionPrismaRepository
  extends BasePrismaRepository<DimensionEntity, DimensionIdVO>
  implements DimensionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDimension): DimensionEntity {
    // cardinalityHistory: reconstruct from available context.
    // Prisma-এ separate history table না থাকায়, current cardinality
    // ১-element history হিসেবে দেওয়া হচ্ছে।
    return DimensionEntity.reconstitute(
      DimensionIdVO.create(raw.id),
      {
        name: DimensionNameVO.create(raw.name),
        cardinality: raw.cardinality,
        cardinalityHistory: [raw.cardinality],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: DimensionIdVO): Promise<DimensionEntity | null> {
    const raw = await this.prisma.dimension.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DimensionEntity[]> {
    const rows = await this.prisma.dimension.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DimensionEntity): Promise<DimensionEntity> {
    const data = {
      name: entity.name.value,
      cardinality: entity.cardinality,
      dataType: 'string',
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.dimension.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DimensionIdVO): Promise<void> {
    await this.prisma.dimension.delete({ where: { id: id.value } });
  }

  async findByName(name: DimensionNameVO): Promise<DimensionEntity | null> {
    const raw = await this.prisma.dimension.findUnique({
      where: { name: name.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
