/**
 * Queue Service (NestJS injectable)
 * @module shared-kernel/infrastructure/messaging/queue
 *
 * Values আসে shared-config ও shared-constants থেকে।
 */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue, Worker, Job } from 'bullmq';
import { QUEUE_CONFIG } from '@vubon/shared-config/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

type JobProcessor<TPayload = unknown, TResult = unknown> = (payload: TPayload) => Promise<TResult>;

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly queues = new Map<string, Queue>();
  private readonly workers = new Map<string, Worker>();

  private getConnection(): { host: string; port: number } {
    try {
      const url = new URL(QUEUE_CONFIG.driver === 'bull' ? 'redis://localhost:6379' : '');
      return {
        host: url.hostname || 'localhost',
        port: url.port ? Number(url.port) : 6379,
      };
    } catch {
      return { host: 'localhost', port: 6379 };
    }
  }

  getQueue(name: string): Queue {
    let queue = this.queues.get(name);
    if (!queue) {
      queue = new Queue(name, { connection: this.getConnection() });
      this.queues.set(name, queue);
    }
    return queue;
  }

  async enqueue<TPayload extends object = Record<string, unknown>>(
    queueName: string,
    jobName: string,
    payload: TPayload,
    options?: {
      readonly priority?: number;
      readonly delayMs?: number;
      readonly jobId?: string;
    }
  ): Promise<string> {
    const queue = this.getQueue(queueName);
    const job = await queue.add(jobName, payload, {
      priority: options?.priority ?? QUEUE_PRIORITY.NORMAL,
      delay: options?.delayMs,
      jobId: options?.jobId,
      attempts: QUEUE_CONFIG.defaultAttempts,
      backoff: {
        type: QUEUE_CONFIG.defaultBackoffType as 'exponential' | 'fixed',
        delay: QUEUE_CONFIG.defaultBackoffMs,
      },
    });
    return job.id ?? '';
  }

  registerWorker<TPayload extends object = Record<string, unknown>, TResult = unknown>(
    queueName: string,
    processor: JobProcessor<TPayload, TResult>,
    concurrency: number = QUEUE_CONFIG.workerConcurrency
  ): void {
    if (this.workers.has(queueName)) return;

    const worker = new Worker(queueName, async (job: Job) => processor(job.data as TPayload), {
      connection: this.getConnection(),
      concurrency,
    });

    this.workers.set(queueName, worker);
  }

  async onModuleDestroy(): Promise<void> {
    for (const worker of this.workers.values()) {
      await worker.close();
    }
    for (const queue of this.queues.values()) {
      await queue.close();
    }
  }
}
