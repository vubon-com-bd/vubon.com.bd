/**
 * QueueFactory — creates BullMQ Queue instances per name.
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Queue } from 'bullmq';
import { getBullConnection, DEFAULT_JOB_OPTIONS } from './queue.config.js';
import type { QueueName, JobType, QueueJobPayload } from './queue.constants.js';

@Injectable()
export class QueueFactory implements OnModuleDestroy {
  private readonly logger = new Logger(QueueFactory.name);
  private readonly queues = new Map<string, Queue>();

  getQueue(name: QueueName): Queue {
    const existing = this.queues.get(name);
    if (existing) return existing;
    const queue = new Queue(name, {
      connection: getBullConnection(),
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
    this.queues.set(name, queue);
    this.logger.debug(`Queue created: ${name}`);
    return queue;
  }

  async enqueue<T extends QueueJobPayload>(
    name: QueueName,
    jobType: JobType,
    payload: T,
    jobId?: string,
  ): Promise<string | undefined> {
    const queue = this.getQueue(name);
    const job = await queue.add(jobType, payload, jobId ? { jobId } : undefined);
    this.logger.debug(`Enqueued ${jobType} → ${name}:${job.id}`);
    return job.id;
  }

  async enqueueBulk<T extends QueueJobPayload>(
    name: QueueName,
    jobs: readonly { jobType: JobType; payload: T; jobId?: string }[],
  ): Promise<void> {
    const queue = this.getQueue(name);
    await queue.addBulk(
      jobs.map((j) => ({
        name: j.jobType,
        data: j.payload,
        opts: j.jobId ? { jobId: j.jobId } : undefined,
      })),
    );
  }

  async onModuleDestroy(): Promise<void> {
    for (const [name, q] of this.queues) {
      try {
        await q.close();
        this.logger.debug(`Queue closed: ${name}`);
      } catch (err) {
        this.logger.warn(`Queue close error (${name}): ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    this.queues.clear();
  }
}
