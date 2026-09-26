import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiInsight as PrismaInsight } from '@prisma/client';
import { InsightResultEntity } from '../../../../domain/entities/insight-result.entity';
import type { InsightResultRepository } from '../../../../domain/repositories/insight-result.repository.interface';
import { InsightIdVO } from '../../../../domain/value-objects/primitives/insight-id.vo';
import { InsightConfidenceVO } from '../../../../domain/value-objects/primitives/insight-confidence.vo';
import { InsightResultVO } from '../../../../domain/value-objects/composites/insight-result.vo';
import { PrismaService } from '../prisma.service';

interface InsightFinding {
  readonly label: string;
  readonly value: number;
  readonly unit: string | null;
}

@Injectable()
export class InsightResultPrismaRepository
  extends BasePrismaRepository<InsightResultEntity, InsightIdVO>
  implements InsightResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaInsight): InsightResultEntity {
    const findings = (raw.findings as unknown as InsightFinding[]) ?? [];
    return InsightResultEntity.reconstitute(
      InsightIdVO.create(raw.id),
      {
        insightId: InsightIdVO.create(raw.id),
        result: InsightResultVO.create({
          findings: findings.map((f) => ({
            label: f.label,
            value: f.value,
            unit: f.unit,
          })),
          confidence: InsightConfidenceVO.create(raw.confidence),
          summary: raw.summary,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: InsightIdVO): Promise<InsightResultEntity | null> {
    const raw = await this.prisma.aiInsight.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InsightResultEntity[]> {
    const rows = await this.prisma.aiInsight.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: InsightResultEntity): Promise<InsightResultEntity> {
    const data = {
      summary: entity.result.summary,
      confidence: entity.result.confidence.value,
      findings: entity.result.findings.map((f) => ({
        label: f.label,
        value: f.value,
        unit: f.unit,
      })) as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiInsight.upsert({
      where: { id: entity.insightId.value },
      create: {
        id: entity.insightId.value,
        type: 'unknown',
        priority: 'medium',
        target: 'unknown',
        ...data,
      },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: InsightIdVO): Promise<void> {
    await this.prisma.aiInsight.delete({ where: { id: id.value } });
  }

  async findByInsightId(insightId: InsightIdVO): Promise<InsightResultEntity | null> {
    const raw = await this.prisma.aiInsight.findUnique({ where: { id: insightId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findHighConfidence(): Promise<readonly InsightResultEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { confidence: { gte: 0.8 } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
