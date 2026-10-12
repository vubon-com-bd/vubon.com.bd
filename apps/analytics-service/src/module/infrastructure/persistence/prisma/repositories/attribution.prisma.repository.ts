/**
 * Attribution Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { AttributionEntity } from '../../../../domain/entities/attribution.entity.js';
import { AttributionVO } from '../../../../domain/value-objects/composites/attribution.vo.js';
import { TrafficSourceVO } from '../../../../domain/value-objects/composites/traffic-source.vo.js';
import { EventSourceVO } from '../../../../domain/value-objects/primitives/event-source.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { AttributionRepository as IAttributionRepository } from '../../../../domain/repositories/attribution.repository.interface.js';

type PrismaAttributionRow = {
  id: string;
  conversionId: string;
  model: string;
  conversionValue: { toString(): string } | number;
  touchpointCount: number;
  touchpoints: unknown;
  creditByChannel: unknown;
  computedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

function toNumber(v: { toString(): string } | number): number {
  return typeof v === 'number' ? v : Number(v.toString());
}

@Injectable()
export class AttributionPrismaRepository
  extends AnalyticsBasePrismaRepository<AttributionEntity, PrismaAttributionRow, string>
  implements IAttributionRepository
{
  protected readonly delegateName = 'analyticsAttribution';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaAttributionRow): AttributionEntity {
    const tps = Array.isArray(raw.touchpoints)
      ? (raw.touchpoints as Array<{ channel: string; weight: number; timestamp: number }>)
      : [];

    const touchpoints = tps.map((tp) => ({
      source: TrafficSourceVO.create({
        source: EventSourceVO.create('direct'),
      }),
      weight: tp.weight,
      timestamp: tp.timestamp,
    }));

    return AttributionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        attribution: AttributionVO.create({
          model: raw.model as never,
          conversionId: raw.conversionId,
          conversionValue: toNumber(raw.conversionValue),
          touchpoints,
        }),
        computedAt: raw.computedAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: AttributionEntity): Record<string, unknown> {
    const attr = domain.attribution;
    return {
      id: domain.id,
      conversionId: attr.conversionId,
      model: attr.model,
      conversionValue: attr.conversionValue,
      touchpointCount: attr.touchpointCount(),
      touchpoints: attr.touchpoints.map((tp) => ({
        channel: tp.source.channel(),
        weight: tp.weight,
        timestamp: tp.timestamp,
      })),
      creditByChannel: attr.creditByChannel(),
      computedAt: new Date(domain.computedAt),
    };
  }

  protected idOf(domain: AttributionEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByConversionId(conversionId: string): Promise<AttributionEntity | null> {
    const raw = await this.model.findUnique({
      where: { conversionId },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByModel(model: string): Promise<readonly AttributionEntity[]> {
    const rows = await this.model.findMany({
      where: { model },
      orderBy: { computedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByModelInRange(
    model: string,
    range: TimeRangeVO
  ): Promise<readonly AttributionEntity[]> {
    const rows = await this.model.findMany({
      where: {
        model,
        computedAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { computedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findHighValue(minValue: number, limit: number): Promise<readonly AttributionEntity[]> {
    const rows = await this.model.findMany({
      where: { conversionValue: { gte: minValue } },
      orderBy: { conversionValue: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { computedAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
