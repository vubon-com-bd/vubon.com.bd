/**
 * Funnel Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { FunnelEntity } from '../../../../domain/entities/funnel.entity.js';
import { FunnelIdVO } from '../../../../domain/value-objects/primitives/funnel-id.vo.js';
import { FunnelStepVO } from '../../../../domain/value-objects/primitives/funnel-step.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { FunnelRepository as IFunnelRepository } from '../../../../domain/repositories/funnel.repository.interface.js';

type PrismaFunnelRow = {
  id: string;
  name: string;
  stepCount: number;
  isActive: boolean;
  stage: string | null;
  rangeStart: Date;
  rangeEnd: Date;
  lastAnalyzedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class FunnelPrismaRepository
  extends AnalyticsBasePrismaRepository<FunnelEntity, PrismaFunnelRow, string>
  implements IFunnelRepository
{
  protected readonly delegateName = 'analyticsFunnel';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaFunnelRow): FunnelEntity {
    // Reconstruct step VOs from stepCount (generic names since Prisma stores count only)
    const steps: FunnelStepVO[] = [];
    for (let i = 1; i <= raw.stepCount; i++) {
      steps.push(FunnelStepVO.create(`Step ${i}`, i));
    }

    return FunnelEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: raw.name,
        steps,
        range: TimeRangeVO.create({
          startAt: EventTimestampVO.fromDate(raw.rangeStart),
          endAt: EventTimestampVO.fromDate(raw.rangeEnd),
        }),
        isActive: raw.isActive,
        lastAnalyzedAt: raw.lastAnalyzedAt?.toISOString(),
      },
    });
  }

  protected toPersistence(domain: FunnelEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name,
      stepCount: domain.stepCount(),
      isActive: domain.isActive,
      stage: domain.stage?.value ?? null,
      rangeStart: new Date(domain.range.startAt.value.epochMs),
      rangeEnd: new Date(domain.range.endAt.value.epochMs),
      lastAnalyzedAt: domain.lastAnalyzedAt ? new Date(domain.lastAnalyzedAt) : null,
      version: domain.version,
    };
  }

  protected idOf(domain: FunnelEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByFunnelId(id: FunnelIdVO): Promise<FunnelEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllActive(): Promise<readonly FunnelEntity[]> {
    const rows = await this.model.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByName(name: string): Promise<readonly FunnelEntity[]> {
    const rows = await this.model.findMany({
      where: { name, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
