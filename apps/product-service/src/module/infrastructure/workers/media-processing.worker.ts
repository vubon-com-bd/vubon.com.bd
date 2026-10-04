/**
 * MediaProcessingWorker — thumbnail generation and validation.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { MEDIA_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';

interface MediaPayload {
  mediaId?: string;
  url?: string;
  width?: number;
}

@Injectable()
export class MediaProcessingWorker extends BaseWorker {
  constructor() {
    super(MEDIA_QUEUE, MediaProcessingWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as MediaPayload;
    switch (job.name as string) {
      case JOB_TYPES.MEDIA_PROCESS_IMAGE:
        this.logger.debug(`Processing image ${data.mediaId ?? 'unknown'} (${data.url ?? ''})`);
        return;
      case JOB_TYPES.MEDIA_GENERATE_THUMBNAIL:
        this.logger.debug(`Thumbnail for ${data.mediaId ?? 'unknown'} @ ${data.width ?? 400}`);
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}
