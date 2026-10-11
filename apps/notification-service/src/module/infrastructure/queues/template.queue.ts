/**
 * TemplateQueue — enqueue helpers for template jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface RenderTemplatePayload {
  readonly templateId: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly locale?: string;
  readonly cacheResult?: boolean;
}

export interface CacheWarmPayload {
  readonly templateIds: readonly string[];
}

@Injectable()
export class TemplateQueue {
  private readonly logger = new Logger(TemplateQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueRender(payload: RenderTemplatePayload): Promise<string> {
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.RENDER_TEMPLATE,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `tmpl:render:${payload.templateId}:${Date.now()}`,
      },
    );
    this.logger.debug(`enqueueRender template=${payload.templateId}`);
    return jobId;
  }

  async enqueueCacheWarm(payload: CacheWarmPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.CACHE_WARM_TEMPLATES,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.LOW,
        jobId: `tmpl:warm:${Date.now()}`,
      },
    );
  }
}
