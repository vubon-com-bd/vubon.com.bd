import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class MediaQueue {
  readonly queueName = QUEUE_NAME.NOTIFICATION;

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(mediaId: string): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'media-process', { mediaId }, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
