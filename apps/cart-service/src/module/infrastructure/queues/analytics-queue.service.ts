/**
 * AnalyticsQueueService
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { ANALYTICS_QUEUE, JOB_TYPES } from './queue.constants.js';

export const ANALYTICS_QUEUE_SERVICE = Symbol('ANALYTICS_QUEUE_SERVICE');

@Injectable()
export class AnalyticsQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async track(event: string, payload: Readonly<Record<string, unknown>>): Promise<string> {
    const job = await this.factory.get(ANALYTICS_QUEUE).add(
      JOB_TYPES.ANALYTICS_TRACK,
      { event, payload },
      { attempts: 2 },
    );
    return job.id ?? '';
  }
}
