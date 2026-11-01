/**
 * MediaQueue — enqueue helpers for media processing
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from './queue.constants.js';

export interface ProcessMediaPayload {
  readonly productId: string;
  readonly mediaUrl: string;
  readonly mediaType: 'image' | 'video' | 'document';
}

export interface GenerateThumbnailPayload {
  readonly productId: string;
  readonly mediaUrl: string;
  readonly width: number;
  readonly height: number;
}

@Injectable()
export class MediaQueue {
  private readonly logger = new Logger(MediaQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessMediaPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.MEDIA_PROCESSING,
      PRODUCT_JOB_NAME.PROCESS_MEDIA,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `media:${payload.productId}:${payload.mediaUrl.slice(-20)}`,
      },
    );
  }

  async enqueueThumbnail(payload: GenerateThumbnailPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.MEDIA_PROCESSING,
      PRODUCT_JOB_NAME.GENERATE_THUMBNAIL,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `thumb:${payload.productId}:${payload.width}x${payload.height}`,
      },
    );
  }
}
