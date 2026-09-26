import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiModelMetrics as PrismaMetrics } from '@prisma/client';
import { ModelMetricsEntity } from '../../../../domain/entities/model-metrics.entity';
import type { ModelMetricsRepository } from '../../../../domain/repositories/model-metrics.repository.interface';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { ModelMetricsVO } from '../../../../domain/value-objects/composites/model-metrics.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModelMetricsPrismaRepository
  extends BasePrismaRepository<ModelMetricsEntity, ModelIdVO>
  implements ModelMetricsRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaMetrics): ModelMetricsEntity {
    return ModelMetricsEntity.reconstitute(
      ModelIdVO.create(raw.modelId),
      {
        modelId: ModelIdVO.create(raw.modelId),
        metrics: ModelMetricsVO.create({
          accuracy: raw.accuracy,
          precision: raw.precision,
          recall: raw.recall,
          f1Score: raw.f1Score,
          latencyMs: raw.latencyMs,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ModelIdVO): Promise<ModelMetricsEntity | null> {
    const raw = await this.prisma.aiModelMetrics.findFirst({ where: { modelId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ModelMetricsEntity[]> {
    const rows = await this.prisma.aiModelMetrics.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ModelMetricsEntity): Promise<ModelMetricsEntity> {
    const raw = await this.prisma.aiModelMetrics.create({
      data: {
        modelId: entity.modelId.value,
        accuracy: entity.metrics.accuracy,
        precision: entity.metrics.precision,
        recall: entity.metrics.recall,
        f1Score: entity.metrics.f1Score,
        latencyMs: entity.metrics.latencyMs,
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: ModelIdVO): Promise<void> {
    await this.prisma.aiModelMetrics.deleteMany({ where: { modelId: id.value } });
  }

  async findByModelId(modelId: ModelIdVO): Promise<readonly ModelMetricsEntity[]> {
    const rows = await this.prisma.aiModelMetrics.findMany({
      where: { modelId: modelId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByModel(modelId: ModelIdVO): Promise<ModelMetricsEntity | null> {
    const raw = await this.prisma.aiModelMetrics.findFirst({
      where: { modelId: modelId.value },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findProductionReady(): Promise<readonly ModelMetricsEntity[]> {
    const rows = await this.prisma.aiModelMetrics.findMany({
      where: { accuracy: { gte: 0.8 }, latencyMs: { lte: 500 } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
