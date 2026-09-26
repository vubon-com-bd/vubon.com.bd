import { Injectable } from '@nestjs/common';
import { FunnelAnalysis as PrismaFunnelAnalysis, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FunnelAnalysisEntity } from '../../../../domain/entities/funnel-analysis.entity';
import { FunnelIdVO } from '../../../../domain/value-objects/primitives/funnel-id.vo';
import type { FunnelAnalysisRepository } from '../../../../domain/repositories/funnel-analysis.repository.interface';

@Injectable()
export class FunnelAnalysisPrismaRepository
  extends BasePrismaRepository<FunnelAnalysisEntity, string>
  implements FunnelAnalysisRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFunnelAnalysis): FunnelAnalysisEntity {
    const counts = (raw.stepCounts as readonly number[]) ?? [];
    return FunnelAnalysisEntity.reconstitute(
      raw.id,
      {
        funnelId: FunnelIdVO.create(raw.funnelId),
        stepCounts: [...counts],
        analyzedAt: raw.analyzedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<FunnelAnalysisEntity | null> {
    const raw = await this.prisma.funnelAnalysis.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FunnelAnalysisEntity[]> {
    const rows = await this.prisma.funnelAnalysis.findMany({
      orderBy: { analyzedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FunnelAnalysisEntity): Promise<FunnelAnalysisEntity> {
    const data = {
      funnelId: entity.funnelId.value,
      stepCounts: [...entity.stepCounts] as Prisma.InputJsonValue,
      overallConversion: entity.conversionRate,
      biggestDropOffIndex: null,
      analyzedAt: entity.analyzedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.funnelAnalysis.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.funnelAnalysis.delete({ where: { id } });
  }

  async findByFunnelId(funnelId: FunnelIdVO): Promise<readonly FunnelAnalysisEntity[]> {
    const rows = await this.prisma.funnelAnalysis.findMany({
      where: { funnelId: funnelId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByFunnelId(funnelId: FunnelIdVO): Promise<FunnelAnalysisEntity | null> {
    const raw = await this.prisma.funnelAnalysis.findFirst({
      where: { funnelId: funnelId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
