import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

@Injectable()
export class RetrySchedulerService {
  constructor(private readonly queueService: QueueService) {}

  async schedule(
    queueName: string,
    payload: Record<string, unknown>,
    delayMs: number,
  ): Promise<string> {
    return this.queueService.enqueue(queueName, 'retry', payload, {
      delayMs,
    });
  }
}
