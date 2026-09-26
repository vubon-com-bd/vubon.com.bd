import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiForecast as PrismaForecast } from '@prisma/client';
import { ForecastResultEntity } from '../../../../domain/entities/forecast-result.entity';
import type { ForecastResultRepository } from '../../../../domain/repositories/forecast-result.repository.interface';
import { ForecastIdVO } from '../../../../domain/value-objects/primitives/forecast-id.vo';
import { ForecastResultVO } from '../../../../domain/value-objects/composites/forecast-result.vo';
import { PrismaService } from '../prisma.service';

interface ForecastPoint {
  readonly timestamp: string;
  readonly value: number;
  readonly confidenceLower: number;
  readonly confidenceUpper: number;
}

@Injectable()
export class ForecastResultPrismaRepository
  extends BasePrismaRepository<ForecastResultEntity, ForecastIdVO>
  implements ForecastResultRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaForecast): ForecastResultEntity {
    const points = (raw.points as unknown as ForecastPoint[]) ?? [];
    return ForecastResultEntity.reconstitute(
      ForecastIdVO.create(raw.id),
      {
        forecastId: ForecastIdVO.create(raw.id),
        result: ForecastResultVO.create({
          id: ForecastIdVO.create(raw.id),
          points: points.map((p) => ({
            timestamp: new Date(p.timestamp),
            value: p.value,
            confidenceLower: p.confidenceLower,
            confidenceUpper: p.confidenceUpper,
          })),
          model: raw.model,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ForecastIdVO): Promise<ForecastResultEntity | null> {
    const raw = await this.prisma.aiForecast.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ForecastResultEntity[]> {
    const rows = await this.prisma.aiForecast.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ForecastResultEntity): Promise<ForecastResultEntity> {
    const data = {
      points: entity.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })) as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiForecast.upsert({
      where: { id: entity.forecastId.value },
      create: {
        id: entity.forecastId.value,
        target: 'unknown',
        model: entity.result.model,
        horizonDays: entity.result.points.length,
        ...data,
      },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ForecastIdVO): Promise<void> {
    await this.prisma.aiForecast.delete({ where: { id: id.value } });
  }

  async findByForecastId(forecastId: ForecastIdVO): Promise<ForecastResultEntity | null> {
    const raw = await this.prisma.aiForecast.findUnique({ where: { id: forecastId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
