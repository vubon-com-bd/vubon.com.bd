/**
 * SearchHealthIndicator
 * @module product-service/modules/health/indicators
 *
 * Checks Meilisearch connectivity. Gracefully degrades if search
 * is optional in the current environment.
 */
import { Injectable, Logger } from '@nestjs/common';
import { SearchClient } from '../../../infrastructure/persistence/search/search.client.js';
import { searchConfig } from '../../../infrastructure/config/search.config.js';

@Injectable()
export class SearchHealthIndicator {
  private readonly logger = new Logger(SearchHealthIndicator.name);

  constructor(private readonly client: SearchClient) {}

  async check(): Promise<{
    status: 'up' | 'down' | 'degraded';
    message?: string;
    responseTimeMs?: number;
    details?: Readonly<Record<string, unknown>>;
  }> {
    const start = Date.now();
    try {
      const healthy = await this.client.health();
      return {
        status: healthy ? 'up' : 'degraded',
        message: healthy ? undefined : 'Search engine not reachable',
        responseTimeMs: Date.now() - start,
        details: {
          provider: searchConfig.PROVIDER,
          host: searchConfig.HOST,
          index: searchConfig.PRODUCT_INDEX,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Search health check failed: ${message}`);
      return {
        status: 'degraded',
        message: message.slice(0, 200),
        responseTimeMs: Date.now() - start,
      };
    }
  }
}
