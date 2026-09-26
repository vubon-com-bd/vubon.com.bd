import { Injectable } from '@nestjs/common';
import { PrismaService as KernelPrismaService } from '@vubon/shared-kernel/infrastructure';

/**
 * Analytics-service Prisma Service.
 * Extends kernel PrismaService — adds analytics-specific helpers.
 */
@Injectable()
export class PrismaService extends KernelPrismaService {
  /**
   * Health check — verifies DB responds.
   */
  async healthCheck(): Promise<{ ok: boolean; latencyMs: number }> {
    const start = Date.now();
    try {
      await this.$queryRaw`SELECT 1`;
      return { ok: true, latencyMs: Date.now() - start };
    } catch {
      return { ok: false, latencyMs: Date.now() - start };
    }
  }

  /**
   * Truncate all analytics tables — used in tests.
   */
  async truncateAll(): Promise<void> {
    const tables = [
      'attributions',
      'traffic_sources',
      'page_views',
      'sessions',
      'funnel_analyses',
      'funnels',
      'cohort_analyses',
      'cohorts',
      'report_filters',
      'reports',
      'widgets',
      'dashboards',
      'kpi_results',
      'kpis',
      'dimension_values',
      'dimensions',
      'metric_aggregations',
      'metrics',
      'event_payloads',
      'events',
    ];
    for (const t of tables) {
      await this.$executeRawUnsafe(`TRUNCATE TABLE "${t}" CASCADE;`);
    }
  }
}
