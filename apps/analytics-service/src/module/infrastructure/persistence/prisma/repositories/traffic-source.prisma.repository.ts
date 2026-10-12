/**
 * Traffic Source Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { TrafficSourceEntity } from '../../../../domain/entities/traffic-source.entity.js';
import { TrafficSourceVO } from '../../../../domain/value-objects/composites/traffic-source.vo.js';
import { EventSourceVO } from '../../../../domain/value-objects/primitives/event-source.vo.js';
import { ReferrerVO } from '../../../../domain/value-objects/primitives/referrer.vo.js';
import { UtmSourceVO } from '../../../../domain/value-objects/primitives/utm-source.vo.js';
import { UtmMediumVO } from '../../../../domain/value-objects/primitives/utm-medium.vo.js';
import { UtmCampaignVO } from '../../../../domain/value-objects/primitives/utm-campaign.vo.js';
import type { TrafficSourceRepository as ITrafficSourceRepository } from '../../../../domain/repositories/traffic-source.repository.interface.js';

type PrismaTrafficRow = {
  id: string;
  channelKey: string;
  source: string;
  medium: string | null;
  campaign: string | null;
  referrer: string | null;
  occurrenceCount: number;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class TrafficSourcePrismaRepository
  extends AnalyticsBasePrismaRepository<TrafficSourceEntity, PrismaTrafficRow, string>
  implements ITrafficSourceRepository
{
  protected readonly delegateName = 'analyticsTrafficSource';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaTrafficRow): TrafficSourceEntity {
    return TrafficSourceEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        trafficSource: TrafficSourceVO.create({
          source: EventSourceVO.create(raw.source),
          utmSource: raw.medium ? UtmSourceVO.create(raw.medium) : undefined,
          utmMedium: raw.medium ? UtmMediumVO.create(raw.medium) : undefined,
          utmCampaign: raw.campaign ? UtmCampaignVO.create(raw.campaign) : undefined,
          referrer: raw.referrer ? ReferrerVO.create(raw.referrer) : undefined,
        }),
        channelKey: raw.channelKey,
        occurrenceCount: raw.occurrenceCount,
        lastSeenAt: raw.lastSeenAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: TrafficSourceEntity): Record<string, unknown> {
    return {
      id: domain.id,
      channelKey: domain.channelKey,
      source: domain.trafficSource.source.value,
      medium: domain.trafficSource.utmMedium?.value ?? null,
      campaign: domain.trafficSource.utmCampaign?.value ?? null,
      referrer: domain.trafficSource.referrer?.value ?? null,
      occurrenceCount: domain.occurrenceCount,
      lastSeenAt: new Date(domain.lastSeenAt),
    };
  }

  protected idOf(domain: TrafficSourceEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByChannelKey(channelKey: string): Promise<TrafficSourceEntity | null> {
    const raw = await this.model.findUnique({
      where: { channelKey },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllPaid(): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.model.findMany({
      where: { source: 'paid' },
      orderBy: { occurrenceCount: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findAllOrganic(): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.model.findMany({
      where: { source: { in: ['organic', 'referral', 'social'] } },
      orderBy: { occurrenceCount: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findWithCampaigns(): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.model.findMany({
      where: { campaign: { not: null } },
      orderBy: { occurrenceCount: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findTopByOccurrence(limit: number): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.model.findMany({
      orderBy: { occurrenceCount: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
