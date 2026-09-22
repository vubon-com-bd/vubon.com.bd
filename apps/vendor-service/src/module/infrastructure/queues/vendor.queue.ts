import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

const QUEUE_NAME = 'vendor';

@Injectable()
export class VendorQueue {
  readonly queueName = QUEUE_NAME;
  constructor(private readonly queueService: QueueService) {}

  async enqueueApproval(payload: { vendorId: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'vendor-approval', payload);
  }

  async enqueueSuspension(payload: { vendorId: string; reason: string }): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'vendor-suspension', payload);
  }
}
