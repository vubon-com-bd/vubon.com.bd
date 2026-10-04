/**
 * QueueFactory — creates BullMQ queues and workers
 * @module cart-service/infrastructure/queues
 */
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { REDIS_QUEUE_CONFIG } from '@vubon/shared-config/infrastructure';

@Injectable()
export class QueueFactory implements OnModuleDestroy {
  private readonly logger = new Logger(QueueFactory.name);
  private readonly queues = new Map<string, Queue>();

  private connection(): { host: string; port: number } {
    const url = new URL(REDIS_QUEUE_CONFIG.keyPrefix ? 'redis://localhost:6379' : 'redis://localhost:6379');
    return {
      host: url.hostname || 'localhost',
      port: url.port ? Number(url.port) : 6379,
    };
  }

  get(name: string): Queue {
    let queue = this.queues.get(name);
    if (!queue) {
      queue = new Queue(name, { connection: this.connection() });
      this.queues.set(name, queue);
      this.logger.log(`Queue created: ${name}`);
    }
    return queue;
  }

  async onModuleDestroy(): Promise<void> {
    for (const queue of this.queues.values()) {
      await queue.close().catch(() => {});
    }
  }
}
