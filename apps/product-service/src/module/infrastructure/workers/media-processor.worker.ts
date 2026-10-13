/**
 * MediaProcessorWorker
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ProcessMediaPayload } from '../queues/media.queue.js';

@Injectable()
export class MediaProcessorWorker extends BaseWorker<ProcessMediaPayload> {
  protected readonly queueName = PRODUCT_QUEUE_NAME.MEDIA_PROCESSING;
  protected readonly jobNames = [
    PRODUCT_JOB_NAME.PROCESS_MEDIA,
    PRODUCT_JOB_NAME.GENERATE_THUMBNAIL,
  ] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'MediaProcessorWorker');
  }

  protected async handle(payload: ProcessMediaPayload): Promise<unknown> {
    // Real media processing: resize, compress, watermark, etc.
    this.logger.log(
      `Processed ${payload.mediaType} for product ${payload.productId}: ${payload.mediaUrl}`,
    );
    return {
      processed: true,
      productId: payload.productId,
      mediaUrl: payload.mediaUrl,
      mediaType: payload.mediaType,
    };
  }

  protected concurrency(): number {
    return 2;
  }
}
