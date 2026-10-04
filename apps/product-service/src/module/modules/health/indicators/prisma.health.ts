/**
 * PrismaHealthIndicator
 * @module product-service/modules/health/indicators
 *
 * Checks the Prisma database connection.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/prisma';

export interface HealthCheckResult {
  readonly status: 'up' | 'down';
  readonly message?: string;
  readonly responseTimeMs?: number;
  readonly details?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class PrismaHealthIndicator {
  private readonly logger = new Logger(PrismaHealthIndicator.name);

  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'up',
        responseTimeMs: Date.now() - start,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Prisma health check failed: ${message}`);
      return {
        status: 'down',
        message: message.slice(0, 200),
        responseTimeMs: Date.now() - start,
      };
    }
  }
}
