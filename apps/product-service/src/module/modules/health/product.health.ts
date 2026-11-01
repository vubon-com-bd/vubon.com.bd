/**
 * ProductHealthIndicator — aggregated service health
 * @module product-service/modules/health
 */
import { Injectable, Logger } from '@nestjs/common';
import { ProductPrismaService } from '../../infrastructure/persistence/prisma/prisma.service.js';

export interface ProductHealthReport {
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
export class ProductHealthIndicator {
  private readonly logger = new Logger(ProductHealthIndicator.name);
  private readonly startedAt = Date.now();

  constructor(private readonly prisma: ProductPrismaService) {}

  async check(): Promise<ProductHealthReport> {
    const deps: { name: string; healthy: boolean; message?: string }[] = [];

    try {
      if (this.prisma.isEngineAvailable()) {
        const ok = await this.prisma.isHealthy();
        deps.push({
          name: 'database',
          healthy: ok,
          message: ok ? undefined : 'DB query failed',
        });
      } else {
        deps.push({
          name: 'database',
          healthy: false,
          message: 'Prisma engine unavailable (degraded mode)',
        });
      }
    } catch (err) {
      deps.push({
        name: 'database',
        healthy: false,
        message: err instanceof Error ? err.message : 'unknown',
      });
    }

    return {
      service: 'product-service',
      healthy: deps.every((d) => d.healthy),
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      dependencies: deps,
    };
  }
}
