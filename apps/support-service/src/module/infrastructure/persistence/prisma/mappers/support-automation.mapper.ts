/**
 * SupportAutomationMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { SupportAutomation as PrismaSupportAutomation } from '@prisma/client';
import { SupportAutomationEntity } from '../../../../domain/entities/support-automation.entity';

@Injectable()
export class SupportAutomationMapper {
  toDomain(raw: PrismaSupportAutomation): SupportAutomationEntity {
    return SupportAutomationEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      status: raw.status,
      name: raw.name,
      schedule: raw.schedule ?? undefined,
      lastRunAt: raw.lastRunAt?.toISOString(),
      nextRunAt: raw.nextRunAt?.toISOString(),
      totalRuns: raw.totalRuns,
      failureCount: raw.failureCount,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: SupportAutomationEntity): {
    readonly id: string;
    readonly type: string;
    readonly status: string;
    readonly name: string;
    readonly schedule: string | null;
    readonly lastRunAt: Date | null;
    readonly nextRunAt: Date | null;
    readonly totalRuns: number;
    readonly failureCount: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      status: snap.status,
      name: snap.name,
      schedule: snap.schedule ?? null,
      lastRunAt: snap.lastRunAt ? new Date(snap.lastRunAt) : null,
      nextRunAt: snap.nextRunAt ? new Date(snap.nextRunAt) : null,
      totalRuns: snap.totalRuns,
      failureCount: snap.failureCount,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
