import { Injectable } from '@nestjs/common';
import { KpiResult as PrismaKpiResult } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { KpiResultEntity } from '../../../../domain/entities/kpi-result.entity';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo';
import type { KpiResultRepository } from '../../../../domain/repositories/kpi-result.repository.interface';

@Injectable()
export class KpiResultPrismaRepository
  extends BasePrismaRepository<KpiResultEntity, string>
  implements KpiResultRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaKpiResult): KpiResultEntity {
    return KpiResultEntity.reconstitute(
      raw.id,
      {
        kpiId: KpiIdVO.create(raw.kpiId),
        actual: raw.actual,
        target: raw.target,
        achievementPercent: raw.achievementPercent,
        status: raw.status,
        evaluatedAt: raw.evaluatedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<KpiResultEntity | null> {
    const raw = await this.prisma.kpiResult.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KpiResultEntity[]> {
    const rows = await this.prisma.kpiResult.findMany({
      orderBy: { evaluatedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: KpiResultEntity): Promise<KpiResultEntity> {
    const data = {
      kpiId: entity.kpiId.value,
      actual: entity.actual,
      target: entity.target,
      achievementPercent: entity.achievementPercent,
      status: entity.status,
      evaluatedAt: entity.evaluatedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.kpiResult.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.kpiResult.delete({ where: { id } });
  }

  async findByKpiId(kpiId: KpiIdVO): Promise<readonly KpiResultEntity[]> {
    const rows = await this.prisma.kpiResult.findMany({
      where: { kpiId: kpiId.value },
      orderBy: { evaluatedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByKpiId(kpiId: KpiIdVO): Promise<KpiResultEntity | null> {
    const raw = await this.prisma.kpiResult.findFirst({
      where: { kpiId: kpiId.value },
      orderBy: { evaluatedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
