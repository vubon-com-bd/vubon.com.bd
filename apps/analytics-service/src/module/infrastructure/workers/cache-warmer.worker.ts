import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { CACHE_CONFIG } from '../config/cache.config';

@Injectable()
export class CacheWarmerWorker implements OnModuleInit {
  private readonly logger = new Logger(CacheWarmerWorker.name);

  constructor(private readonly queueService: QueueService) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ warmupKeys: string[] }>(
      'analytics:cache:warmup',
      async (payload) => {
        this.logger.debug(`Warming ${payload.warmupKeys.length} cache keys`);
      },
      CACHE_CONFIG.enableWarmup ? 1 : 0,
    );
  }
}
