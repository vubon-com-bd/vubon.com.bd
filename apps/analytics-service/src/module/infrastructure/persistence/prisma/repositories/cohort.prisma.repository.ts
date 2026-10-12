/**
 * Cohort Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { CohortEntity } from '../../../../domain/entities/cohort.entity.js';
import { CohortIdVO } from '../../../../domain/value-objects/primitives/cohort-id.vo.js';
import { CohortNameVO } from '../../../../domain/value-objects/primitives/cohort-name.vo.js';
import { CohortPeriodVO } from '../../../../domain/value-objects/primitives/cohort-period.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { CohortRepository as ICohortRepository } from '../../../../domain/repositories/cohort.repository.interface.js';

type PrismaCohortRow = {
  id: string;
  name: string;
  period: string;
  description: string | null;
  isActive: boolean;
  rangeStart: Date;
  rangeEnd: Date;
  lastAnalyzedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class CohortPrismaRepository
  extends AnalyticsBasePrismaRepository<CohortEntity, PrismaCohortRow, string>
  implements ICohortRepository
{
  protected readonly delegateName = 'analyticsCohort';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaCohortRow): CohortEntity {
    return CohortEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: CohortNameVO.create(raw.name),
        period: CohortPeriodVO.create(raw.period),
        range: TimeRangeVO.create({
          startAt: EventTimestampVO.fromDate(raw.rangeStart),
          endAt: EventTimestampVO.fromDate(raw.rangeEnd),
        }),
        description: raw.description ?? undefined,
        isActive: raw.isActive,
        lastAnalyzedAt: raw.lastAnalyzedAt?.toISOString(),
      },
    });
  }

  protected toPersistence(domain: CohortEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      period: domain.period.value,
      description: domain.description ?? null,
      isActive: domain.isActive,
      rangeStart: new Date(domain.range.startAt.value.epochMs),
      rangeEnd: new Date(domain.range.endAt.value.epochMs),
      lastAnalyzedAt: domain.lastAnalyzedAt ? new Date(domain.lastAnalyzedAt) : null,
      version: domain.version,
    };
  }

  protected idOf(domain: CohortEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByCohortId(id: CohortIdVO): Promise<CohortEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByName(name: CohortNameVO): Promise<CohortEntity | null> {
    const raw = await this.model.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllActive(): Promise<readonly CohortEntity[]> {
    const rows = await this.model.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async existsByName(name: CohortNameVO): Promise<boolean> {
    const count = await this.model.count({
      where: { name: name.value, deletedAt: null },
    });
    return count > 0;
  }
}
