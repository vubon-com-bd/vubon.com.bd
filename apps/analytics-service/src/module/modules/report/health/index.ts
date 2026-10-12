/**
 * Report Health Indicator
 */
import { Injectable, Logger } from '@nestjs/common';
import { ReportPrismaRepository } from '../../../infrastructure/persistence/prisma/repositories/report.prisma.repository.js';

export interface ReportHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class ReportHealthIndicator {
  private readonly logger = new Logger(ReportHealthIndicator.name);

  constructor(private readonly reportRepo: ReportPrismaRepository) {}

  async check(): Promise<ReportHealthReport> {
    try {
      const scheduled = await this.reportRepo.findScheduled();
      return {
        name: 'report-repository',
        healthy: true,
        message: `${scheduled.length} scheduled reports`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Report health check failed: ${msg}`);
      return { name: 'report-repository', healthy: false, message: msg };
    }
  }
}
