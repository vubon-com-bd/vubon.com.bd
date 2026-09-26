import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiForecast as PrismaForecast } from '@prisma/client';
import { ForecastEntity } from '../../../../domain/entities/forecast.entity';
import type { ForecastRepository } from '../../../../domain/repositories/forecast.repository.interface';
import { ForecastIdVO } from '../../../../domain/value-objects/primitives/forecast-id.vo';
import { ForecastHorizonVO } from '../../../../domain/value-objects/primitives/forecast-horizon.vo';
import { ForecastResultVO } from '../../../../domain/value-objects/composites/forecast-result.vo';
import { PrismaService } from '../prisma.service';

interface ForecastPoint {
  readonly timestamp: string;
  readonly value: number;
  readonly confidenceLower: number;
  readonly confidenceUpper: number;
}

@Injectable()
export class ForecastPrismaRepository
  extends BasePrismaRepository<ForecastEntity, ForecastIdVO>
  implements ForecastRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaForecast): ForecastEntity {
    const points = (raw.points as unknown as ForecastPoint[]) ?? [];
    return ForecastEntity.reconstitute(
      ForecastIdVO.create(raw.id),
      {
        target: raw.target,
        horizon: ForecastHorizonVO.create(raw.horizonDays),
        model: raw.model,
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

  async findById(id: ForecastIdVO): Promise<ForecastEntity | null> {
    const raw = await this.prisma.aiForecast.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ForecastEntity[]> {
    const rows = await this.prisma.aiForecast.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ForecastEntity): Promise<ForecastEntity> {
    const data = {
      target: entity.target,
      model: entity.model,
      horizonDays: entity.horizon.value,
      points: entity.result.points.map((p) => ({
        timestamp: p.timestamp.toISOString(),
        value: p.value,
        confidenceLower: p.confidenceLower,
        confidenceUpper: p.confidenceUpper,
      })) as unknown as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiForecast.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ForecastIdVO): Promise<void> {
    await this.prisma.aiForecast.delete({ where: { id: id.value } });
  }

  async findByTarget(target: string): Promise<readonly ForecastEntity[]> {
    const rows = await this.prisma.aiForecast.findMany({
      where: { target },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByModel(model: string): Promise<readonly ForecastEntity[]> {
    const rows = await this.prisma.aiForecast.findMany({
      where: { model },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecentByTarget(target: string, limit: number): Promise<readonly ForecastEntity[]> {
    const rows = await this.prisma.aiForecast.findMany({
      where: { target },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
