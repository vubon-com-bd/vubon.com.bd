export interface QueueConfig {
  redis: {
    host: string;
    port: number;
    password: string;
    db: number;
  };
  defaultJobOptions: {
    attempts: number;
    backoff: {
      type: 'exponential' | 'fixed';
      delay: number;
    };
    removeOnComplete: boolean;
    removeOnFail: boolean;
  };
  concurrency: number;
  limiter: {
    max: number;
    duration: number;
  };
}

export const getQueueConfig = (): QueueConfig => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || '',
    db: parseInt(process.env.REDIS_DB || '1'),
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
  concurrency: 5,
  limiter: {
    max: 100,
    duration: 60000,
  },
});
