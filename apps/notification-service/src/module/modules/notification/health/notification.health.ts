import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';

export interface HealthResult {
  readonly status: 'up' | 'down';
  readonly timestamp: string;
  readonly details?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationHealthIndicator {
  private readonly logger = new Logger(NotificationHealthIndicator.name);

  constructor(private readonly prisma: PrismaService) {}

  async isHealthy(key: string = 'notification'): Promise<HealthResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'up',
        timestamp: new Date().toISOString(),
        details: { key },
      };
    } catch (error) {
      this.logger.error(`Health check failed: ${String(error)}`);
      return {
        status: 'down',
        timestamp: new Date().toISOString(),
        details: { key, error: String(error) },
      };
    }
  }
}
