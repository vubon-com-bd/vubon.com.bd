/**
 * Dimension Value Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { DimensionValueEntity } from '../../../../domain/entities/dimension-value.entity.js';
import { DimensionIdVO } from '../../../../domain/value-objects/primitives/dimension-id.vo.js';
import { DimensionValueVO } from '../../../../domain/value-objects/primitives/dimension-value.vo.js';
import type { DimensionValueRepository as IDimensionValueRepository } from '../../../../domain/repositories/dimension-value.repository.interface.js';

type PrismaDimValueRow = {
  id: string;
  dimensionId: string;
  value: string;
  occurrenceCount: number;
  firstSeenAt: Date;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class DimensionValuePrismaRepository
  extends AnalyticsBasePrismaRepository<DimensionValueEntity, PrismaDimValueRow, string>
  implements IDimensionValueRepository
{
  protected readonly delegateName = 'analyticsDimensionValue';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaDimValueRow): DimensionValueEntity {
    return DimensionValueEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        dimensionId: DimensionIdVO.create(raw.dimensionId),
        value: DimensionValueVO.create(raw.value),
        occurrenceCount: raw.occurrenceCount,
        firstSeenAt: raw.firstSeenAt.toISOString(),
        lastSeenAt: raw.lastSeenAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: DimensionValueEntity): Record<string, unknown> {
    return {
      id: domain.id,
      dimensionId: domain.dimensionId.value,
      value: domain.value.value,
      occurrenceCount: domain.occurrenceCount,
      firstSeenAt: new Date(domain.firstSeenAt),
      lastSeenAt: new Date(domain.lastSeenAt),
    };
  }

  protected idOf(domain: DimensionValueEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByDimensionAndValue(
    dimensionId: DimensionIdVO,
    value: DimensionValueVO
  ): Promise<DimensionValueEntity | null> {
    const raw = await this.model.findUnique({
      where: {
        dimensionId_value: {
          dimensionId: dimensionId.value,
          value: value.value,
        },
      },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findTopByDimension(
    dimensionId: DimensionIdVO,
    limit: number
  ): Promise<readonly DimensionValueEntity[]> {
    const rows = await this.model.findMany({
      where: { dimensionId: dimensionId.value },
      orderBy: { occurrenceCount: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByDimension(dimensionId: DimensionIdVO): Promise<readonly DimensionValueEntity[]> {
    const rows = await this.model.findMany({
      where: { dimensionId: dimensionId.value },
      orderBy: { occurrenceCount: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async upsertMany(values: readonly DimensionValueEntity[]): Promise<number> {
    let count = 0;
    for (const v of values) {
      const data = this.toPersistence(v);
      await this.model.upsert({
        where: {
          dimensionId_value: {
            dimensionId: v.dimensionId.value,
            value: v.value.value,
          },
        },
        create: data as never,
        update: data as never,
      });
      count++;
    }
    return count;
  }

  async deleteByDimension(dimensionId: DimensionIdVO): Promise<number> {
    const result = await this.model.deleteMany({
      where: { dimensionId: dimensionId.value },
    });
    return result.count;
  }
}
