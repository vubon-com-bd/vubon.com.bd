/**
 * RedisHealthIndicator
 * @module product-service/modules/health/indicators
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';

@Injectable()
export class RedisHealthIndicator {
  private readonly logger = new Logger(RedisHealthIndicator.name);

  constructor(private readonly redis: RedisService) {}

  async check(): Promise<{
    status: 'up' | 'down';
    message?: string;
    responseTimeMs?: number;
  }> {
    const start = Date.now();
    try {
      const healthy = await this.redis.isHealthy();
      return {
        status: healthy ? 'up' : 'down',
        message: healthy ? undefined : 'PING did not return PONG',
        responseTimeMs: Date.now() - start,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Redis health check failed: ${message}`);
      return {
        status: 'down',
        message: message.slice(0, 200),
        responseTimeMs: Date.now() - start,
      };
    }
  }
}
