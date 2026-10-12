/**
 * Dimension Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { DimensionEntity } from '../../../../domain/entities/dimension.entity.js';
import { DimensionIdVO } from '../../../../domain/value-objects/primitives/dimension-id.vo.js';
import { DimensionNameVO } from '../../../../domain/value-objects/primitives/dimension-name.vo.js';
import type { DimensionRepository as IDimensionRepository } from '../../../../domain/repositories/dimension.repository.interface.js';

type PrismaDimensionRow = {
  id: string;
  name: string;
  description: string | null;
  isCustom: boolean;
  isActive: boolean;
  usageCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class DimensionPrismaRepository
  extends AnalyticsBasePrismaRepository<DimensionEntity, PrismaDimensionRow, string>
  implements IDimensionRepository
{
  protected readonly delegateName = 'analyticsDimension';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaDimensionRow): DimensionEntity {
    return DimensionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: raw.isCustom ? DimensionNameVO.custom(raw.name) : DimensionNameVO.create(raw.name),
        description: raw.description ?? undefined,
        isCustom: raw.isCustom,
        isActive: raw.isActive,
        usageCount: raw.usageCount,
      },
    });
  }

  protected toPersistence(domain: DimensionEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      description: domain.description ?? null,
      isCustom: domain.isCustom,
      isActive: domain.isActive,
      usageCount: domain.usageCount,
      version: domain.version,
    };
  }

  protected idOf(domain: DimensionEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByName(name: DimensionNameVO): Promise<DimensionEntity | null> {
    const raw = await this.model.findUnique({ where: { name: name.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllActive(): Promise<readonly DimensionEntity[]> {
    const rows = await this.model.findMany({
      where: { isActive: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCustom(isCustom: boolean): Promise<readonly DimensionEntity[]> {
    const rows = await this.model.findMany({
      where: { isCustom, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async existsByName(name: DimensionNameVO): Promise<boolean> {
    const count = await this.model.count({ where: { name: name.value } });
    return count > 0;
  }
}
