/**
 * OrderHealth — health check for order aggregate
 * @module order-service/modules/order/health
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

export interface OrderHealthResult {
  readonly status: 'ok' | 'degraded';
  readonly checks: Readonly<Record<string, boolean>>;
}

@Injectable()
export class OrderHealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<OrderHealthResult> {
    const checks: Record<string, boolean> = {};
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      checks['prisma'] = true;
    } catch {
      checks['prisma'] = false;
    }
    const allOk = Object.values(checks).every((v) => v);
    return { status: allOk ? 'ok' : 'degraded', checks };
  }
}
