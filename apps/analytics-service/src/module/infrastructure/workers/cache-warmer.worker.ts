/**
 * Cache Warmer Worker — periodically warms hot analytics caches
 */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CacheWarmerWorker {
  private readonly logger = new Logger(CacheWarmerWorker.name);

  async warmRecentMetrics(): Promise<{ readonly warmed: number }> {
    this.logger.debug('Warming recent metric caches');
    return { warmed: 0 };
  }
}
