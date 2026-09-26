/**
 * TicketQueue — enqueue ticket-related jobs
 * @module support-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_PRIORITY, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';
import { SUPPORT_QUEUE, SUPPORT_QUEUE_JOB } from './support-queue.constants';

export interface TicketJobPayload {
  readonly ticketId: string;
  readonly [key: string]: unknown;
}

@Injectable()
export class TicketQueue {
  constructor(
    @InjectQueue(SUPPORT_QUEUE.TICKET) private readonly queue: Queue,
  ) {}

  async enqueueAssign(payload: TicketJobPayload): Promise<void> {
    await this.queue.add(SUPPORT_QUEUE_JOB.TICKET_ASSIGN, payload, {
      priority: QUEUE_PRIORITY.HIGH,
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      backoff: { type: 'exponential', delay: QUEUE_LIMIT.BACKOFF_DELAY },
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
      removeOnFail: QUEUE_LIMIT.REMOVE_ON_FAIL,
    });
  }

  async enqueueNotify(payload: TicketJobPayload): Promise<void> {
    await this.queue.add(SUPPORT_QUEUE_JOB.TICKET_NOTIFY, payload, {
      priority: QUEUE_PRIORITY.NORMAL,
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      backoff: { type: 'exponential', delay: QUEUE_LIMIT.BACKOFF_DELAY },
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
    });
  }

  async enqueueAutoClose(payload: TicketJobPayload, delayMs: number): Promise<void> {
    await this.queue.add(SUPPORT_QUEUE_JOB.TICKET_AUTO_CLOSE, payload, {
      delay: delayMs,
      priority: QUEUE_PRIORITY.LOW,
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
    });
  }
}
