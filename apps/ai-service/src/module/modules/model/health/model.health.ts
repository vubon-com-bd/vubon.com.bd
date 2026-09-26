import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';

export interface HealthResult {
  readonly status: 'up' | 'down';
  readonly details?: Record<string, unknown>;
}

@Injectable()
export class ModelHealthIndicator {
  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'up' };
    } catch (error) {
      return {
        status: 'down',
        details: { error: error instanceof Error ? error.message : String(error) },
      };
    }
  }
}
