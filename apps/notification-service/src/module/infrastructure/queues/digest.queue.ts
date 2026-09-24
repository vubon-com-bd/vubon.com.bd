import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const DIGEST_QUEUE = 'digest';

export interface ProcessDigestJobPayload {
  readonly digestId: string;
}

@Injectable()
export class DigestQueue {
  readonly queueName = DIGEST_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: ProcessDigestJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'process', payload);
  }
}
