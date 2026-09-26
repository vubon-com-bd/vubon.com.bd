/**
 * Health Service
 * @module shared-kernel/infrastructure/observability
 *
 * Framework-agnostic health check aggregator.
 * Terminus integration happens in host application।
 */
import { Injectable } from '@nestjs/common';

export interface HealthIndicatorResult {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class HealthService {
  private readonly indicators: Array<{
    readonly name: string;
    readonly check: () => Promise<boolean>;
  }> = [];

  registerIndicator(name: string, check: () => Promise<boolean>): void {
    this.indicators.push({ name, check });
  }

  async checkAll(): Promise<{
    readonly healthy: boolean;
    readonly indicators: readonly HealthIndicatorResult[];
  }> {
    const results: HealthIndicatorResult[] = await Promise.all(
      this.indicators.map(async (indicator) => {
        try {
          const healthy = await indicator.check();
          return { name: indicator.name, healthy };
        } catch (error) {
          return {
            name: indicator.name,
            healthy: false,
            message: error instanceof Error ? error.message : 'unknown',
          };
        }
      })
    );

    return {
      healthy: results.every((r) => r.healthy),
      indicators: results,
    };
  }
}
