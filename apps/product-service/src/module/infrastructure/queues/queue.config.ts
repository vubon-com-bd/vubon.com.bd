/**
 * BullMQ connection & default job options
 * @module product-service/infrastructure/queues
 */
import { getOptionalEnvInt } from '../config/_helpers.js';

export interface BullConnectionConfig {
  readonly host: string;
  readonly port: number;
  readonly password?: string;
  readonly db: number;
}

export function getBullConnection(): BullConnectionConfig {
  const host = (process.env.REDIS_HOST ?? '127.0.0.1') as string;
  const port = getOptionalEnvInt('REDIS_PORT', 6379);
  const password = process.env.REDIS_PASSWORD as string | undefined;
  const db = getOptionalEnvInt('REDIS_QUEUE_DB', 1);
  return { host, port, password, db };
}

export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 5000 },
  removeOnComplete: { count: 500, age: 24 * 3600 },
  removeOnFail: { count: 1000, age: 7 * 24 * 3600 },
} as const;
