/**
 * Metric Health Indicator
 */
import { Injectable, Logger } from '@nestjs/common';
import { MetricPrismaRepository } from '../../../infrastructure/persistence/prisma/repositories/metric.prisma.repository.js';

export interface MetricHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class MetricHealthIndicator {
  private readonly logger = new Logger(MetricHealthIndicator.name);

  constructor(private readonly metricRepo: MetricPrismaRepository) {}

  async check(): Promise<MetricHealthReport> {
    try {
      const all = await this.metricRepo.findAll();
      return {
        name: 'metric-repository',
        healthy: true,
        message: `${all.length} active metrics`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Metric health check failed: ${msg}`);
      return { name: 'metric-repository', healthy: false, message: msg };
    }
  }
}
