/**
 * KPI Health Indicator
 */
import { Injectable, Logger } from '@nestjs/common';
import { KpiPrismaRepository } from '../../../infrastructure/persistence/prisma/repositories/kpi.prisma.repository.js';

export interface KpiHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class KpiHealthIndicator {
  private readonly logger = new Logger(KpiHealthIndicator.name);

  constructor(private readonly kpiRepo: KpiPrismaRepository) {}

  async check(): Promise<KpiHealthReport> {
    try {
      const active = await this.kpiRepo.findAllActive();
      return {
        name: 'kpi-repository',
        healthy: true,
        message: `${active.length} active KPIs`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`KPI health check failed: ${msg}`);
      return { name: 'kpi-repository', healthy: false, message: msg };
    }
  }
}
