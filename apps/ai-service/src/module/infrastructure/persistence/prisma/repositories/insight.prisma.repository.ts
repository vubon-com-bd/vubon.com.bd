import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiInsight as PrismaInsight } from '@prisma/client';
import { InsightEntity } from '../../../../domain/entities/insight.entity';
import type { InsightRepository } from '../../../../domain/repositories/insight.repository.interface';
import { InsightIdVO } from '../../../../domain/value-objects/primitives/insight-id.vo';
import { InsightStatusVO } from '../../../../domain/value-objects/primitives/insight-status.vo';
import { InsightConfidenceVO } from '../../../../domain/value-objects/primitives/insight-confidence.vo';
import { InsightResultVO } from '../../../../domain/value-objects/composites/insight-result.vo';
import { PrismaService } from '../prisma.service';

interface InsightFinding {
  readonly label: string;
  readonly value: number;
  readonly unit: string | null;
}

@Injectable()
export class InsightPrismaRepository
  extends BasePrismaRepository<InsightEntity, InsightIdVO>
  implements InsightRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaInsight): InsightEntity {
    const findings = (raw.findings as unknown as InsightFinding[]) ?? [];
    return InsightEntity.reconstitute(
      InsightIdVO.create(raw.id),
      {
        type: raw.type,
        priority: raw.priority,
        status: InsightStatusVO.create(raw.status),
        result: InsightResultVO.create({
          findings: findings.map((f) => ({
            label: f.label,
            value: f.value,
            unit: f.unit,
          })),
          confidence: InsightConfidenceVO.create(raw.confidence),
          summary: raw.summary,
        }),
        target: raw.target,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: InsightIdVO): Promise<InsightEntity | null> {
    const raw = await this.prisma.aiInsight.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: InsightEntity): Promise<InsightEntity> {
    const data = {
      type: entity.type,
      priority: entity.priority,
      status: entity.status.value,
      target: entity.target,
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
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: InsightIdVO): Promise<void> {
    await this.prisma.aiInsight.delete({ where: { id: id.value } });
  }

  async findByType(type: string): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByPriority(priority: string): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { priority },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByTarget(target: string): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { target },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findHighConfidence(): Promise<readonly InsightEntity[]> {
    const rows = await this.prisma.aiInsight.findMany({
      where: { confidence: { gte: 0.8 }, status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
