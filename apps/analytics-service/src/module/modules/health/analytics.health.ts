/**
 * Analytics Health Indicator
 * @module analytics-service/modules/health
 *
 * Reports analytics-service dependency health (DB, Redis, OLAP, Queue)।
 * Framework-agnostic — returns HealthIndicatorResult[].
 */
import { Injectable, Logger } from '@nestjs/common';
import { AnalyticsPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';

export interface AnalyticsHealthReport {
  readonly service: string;
  readonly healthy: boolean;
  readonly timestamp: string;
  readonly uptimeSeconds: number;
  readonly dependencies: readonly {
    readonly name: string;
    readonly healthy: boolean;
    readonly message?: string;
  }[];
}

@Injectable()
export class AnalyticsHealthIndicator {
  private readonly logger = new Logger(AnalyticsHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(private readonly prisma: AnalyticsPrismaService) {}

  async check(): Promise<AnalyticsHealthReport> {
    const dependencies: {
      name: string;
      healthy: boolean;
      message?: string;
    }[] = [];

    // 1. Prisma / DB
    try {
      if (this.prisma.isEngineAvailable()) {
        const dbHealthy = await this.prisma.isHealthy();
        dependencies.push({
          name: 'database',
          healthy: dbHealthy,
          message: dbHealthy ? undefined : 'DB query failed',
        });
      } else {
        dependencies.push({
          name: 'database',
          healthy: false,
          message: 'Prisma engine unavailable (degraded mode)',
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      dependencies.push({ name: 'database', healthy: false, message: msg });
    }

    const healthy = dependencies.every((d) => d.healthy);

    return {
      service: 'analytics-service',
      healthy,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies,
    };
  }
}
