import { Injectable } from '@nestjs/common';
import { DimensionValue as PrismaDimensionValue } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DimensionValueEntity } from '../../../../domain/entities/dimension-value.entity';
import { DimensionIdVO } from '../../../../domain/value-objects/primitives/dimension-id.vo';
import { DimensionValueVO } from '../../../../domain/value-objects/primitives/dimension-value.vo';
import type { DimensionValueRepository } from '../../../../domain/repositories/dimension-value.repository.interface';

@Injectable()
export class DimensionValuePrismaRepository
  extends BasePrismaRepository<DimensionValueEntity, string>
  implements DimensionValueRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDimensionValue): DimensionValueEntity {
    return DimensionValueEntity.reconstitute(
      raw.id,
      {
        dimensionId: DimensionIdVO.create(raw.dimensionId),
        value: DimensionValueVO.create(raw.value),
        frequency: raw.frequency,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<DimensionValueEntity | null> {
    const raw = await this.prisma.dimensionValue.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DimensionValueEntity[]> {
    const rows = await this.prisma.dimensionValue.findMany({
      where: { deletedAt: null },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DimensionValueEntity): Promise<DimensionValueEntity> {
    const data = {
      dimensionId: entity.dimensionId.value,
      value: entity.value.value,
      frequency: entity.frequency,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.dimensionValue.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.dimensionValue.delete({ where: { id } });
  }

  async findByDimensionId(
    dimensionId: DimensionIdVO,
  ): Promise<readonly DimensionValueEntity[]> {
    const rows = await this.prisma.dimensionValue.findMany({
      where: { dimensionId: dimensionId.value, deletedAt: null },
      orderBy: { frequency: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findTopByFrequency(
    dimensionId: DimensionIdVO,
    limit: number,
  ): Promise<readonly DimensionValueEntity[]> {
    const rows = await this.prisma.dimensionValue.findMany({
      where: { dimensionId: dimensionId.value, deletedAt: null },
      orderBy: { frequency: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
