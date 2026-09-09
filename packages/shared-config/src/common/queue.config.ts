export const queueConfig = {
  default: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: {
      age: 3600,
      count: 1000,
    },
    removeOnFail: {
      age: 86400,
      count: 1000,
    },
  },
  queues: {
    email: { concurrency: 5, attempts: 3 },
    sms: { concurrency: 10, attempts: 3 },
    notification: { concurrency: 10, attempts: 3 },
    payment: { concurrency: 2, attempts: 5 },
    report: { concurrency: 1, attempts: 2 },
  },
};
