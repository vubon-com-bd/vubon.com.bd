import { Injectable } from '@nestjs/common';
import { TrafficSource as PrismaTrafficSource } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TrafficSourceEntity } from '../../../../domain/entities/traffic-source.entity';
import { UtmSourceVO } from '../../../../domain/value-objects/primitives/utm-source.vo';
import { UtmMediumVO } from '../../../../domain/value-objects/primitives/utm-medium.vo';
import { UtmCampaignVO } from '../../../../domain/value-objects/primitives/utm-campaign.vo';
import { ReferrerVO } from '../../../../domain/value-objects/primitives/referrer.vo';
import type { TrafficSourceRepository } from '../../../../domain/repositories/traffic-source.repository.interface';

@Injectable()
export class TrafficSourcePrismaRepository
  extends BasePrismaRepository<TrafficSourceEntity, string>
  implements TrafficSourceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTrafficSource): TrafficSourceEntity {
    return TrafficSourceEntity.reconstitute(
      raw.id,
      {
        source: raw.source ? UtmSourceVO.create(raw.source) : null,
        medium: raw.medium ? UtmMediumVO.create(raw.medium) : null,
        campaign: raw.campaign ? UtmCampaignVO.create(raw.campaign) : null,
        referrer: ReferrerVO.create(raw.referrer),
        sessions: raw.sessions,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: string): Promise<TrafficSourceEntity | null> {
    const raw = await this.prisma.trafficSource.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.prisma.trafficSource.findMany({
      where: { deletedAt: null },
      orderBy: { sessions: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TrafficSourceEntity): Promise<TrafficSourceEntity> {
    const data = {
      source: entity.source?.value ?? null,
      medium: entity.medium?.value ?? null,
      campaign: entity.campaign?.value ?? null,
      referrer: entity.referrer.value,
      sessions: entity.sessions,
      isDirect: entity.isDirect,
      isPaid: entity.isPaid,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.trafficSource.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.trafficSource.delete({ where: { id } });
  }

  async findBySource(source: string): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.prisma.trafficSource.findMany({
      where: { source, deletedAt: null },
      orderBy: { sessions: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findTopBySessions(limit: number): Promise<readonly TrafficSourceEntity[]> {
    const rows = await this.prisma.trafficSource.findMany({
      where: { deletedAt: null },
      orderBy: { sessions: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
