import { Queue, Job, Worker, QueueOptions } from 'bullmq';

export interface QueueJobData<T = unknown> {
  data: T;
  attempt: number;
  timestamp: string;
}

export abstract class BaseQueue<T = unknown> {
  protected queue: Queue;
  protected worker: Worker | null = null;

  constructor(
    protected readonly queueName: string,
    protected readonly connectionOptions: QueueOptions['connection'] = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    }
  ) {
    this.queue = new Queue(queueName, {
      connection: connectionOptions,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    });
  }

  abstract process(job: Job<QueueJobData<T>>): Promise<void>;

  async add(data: T, options?: { delay?: number; priority?: number }): Promise<void> {
    const jobData: QueueJobData<T> = {
      data,
      attempt: 0,
      timestamp: new Date().toISOString(),
    };

    await this.queue.add(this.queueName, jobData, {
      delay: options?.delay || 0,
      priority: options?.priority,
    });
  }

  async addBulk(
    items: { data: T; options?: { delay?: number; priority?: number } }[]
  ): Promise<void> {
    const jobs = items.map(({ data, options }) => {
      const jobData: QueueJobData<T> = {
        data,
        attempt: 0,
        timestamp: new Date().toISOString(),
      };
      return {
        name: this.queueName,
        data: jobData,
        opts: {
          delay: options?.delay || 0,
          priority: options?.priority,
        },
      };
    });

    await this.queue.addBulk(jobs);
  }

  async startWorker(concurrency: number = 1): Promise<void> {
    this.worker = new Worker(
      this.queueName,
      async (job: Job<QueueJobData<T>>) => {
        const attempt = job.data.attempt || 0;
        job.data.attempt = attempt + 1;
        await this.process(job);
      },
      {
        connection: this.connectionOptions,
        concurrency,
      }
    );

    this.worker.on('completed', (job: Job) => {
      console.error(`Job ${job.id} completed successfully`);
    });

    this.worker.on('failed', (job: Job | undefined, error: Error) => {
      console.error(`Job ${job?.id} failed:`, error.message);
    });

    this.worker.on('error', (error: Error) => {
      console.error('Worker error:', error);
    });
  }

  async stopWorker(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
      this.worker = null;
    }
  }

  async getJob(jobId: string): Promise<Job<QueueJobData<T>> | null> {
    const job = await this.queue.getJob(jobId);
    return job as Job<QueueJobData<T>> | null;
  }

  async getJobs(
    statuses: ('completed' | 'failed' | 'waiting' | 'active' | 'delayed')[] = [
      'waiting',
      'active',
      'delayed',
    ]
  ): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getJobs(statuses);
    return jobs as Job<QueueJobData<T>>[];
  }

  async getCompleted(): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getCompleted();
    return jobs as Job<QueueJobData<T>>[];
  }

  async getFailed(): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getFailed();
    return jobs as Job<QueueJobData<T>>[];
  }

  async getWaiting(): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getWaiting();
    return jobs as Job<QueueJobData<T>>[];
  }

  async getActive(): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getActive();
    return jobs as Job<QueueJobData<T>>[];
  }

  async getDelayed(): Promise<Job<QueueJobData<T>>[]> {
    const jobs = await this.queue.getDelayed();
    return jobs as Job<QueueJobData<T>>[];
  }

  async getJobCount(): Promise<Record<string, number>> {
    return await this.queue.getJobCounts();
  }

  async pause(): Promise<void> {
    await this.queue.pause();
  }

  async resume(): Promise<void> {
    await this.queue.resume();
  }

  async clean(grace: number = 1000): Promise<void> {
    await this.queue.clean(grace, 1000);
  }

  async delete(): Promise<void> {
    await this.stopWorker();
    await this.queue.obliterate({ force: true });
    await this.queue.close();
  }

  getQueue(): Queue {
    return this.queue;
  }

  getQueueName(): string {
    return this.queueName;
  }
}
