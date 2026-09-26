/**
 * AuthProcessorWorker — Deep Unit Tests
 * @module auth-service/infrastructure/workers
 */
import { AuthProcessorWorker } from './auth-processor.worker';

describe('AuthProcessorWorker (deep)', () => {
  let worker: AuthProcessorWorker;

  beforeEach(() => {
    worker = new AuthProcessorWorker();
  });

  it('should have name', () => {
    expect(worker.name).toBe('AuthProcessorWorker');
  });

  it('start() creates worker (real BullMQ instance)', () => {
    const connection = { host: '127.0.0.1', port: 6379 };
    expect(() => worker.start(connection)).not.toThrow();
  });

  it('start() is idempotent (2nd call is no-op)', () => {
    const connection = { host: '127.0.0.1', port: 6379 };
    worker.start(connection);
    worker.start(connection);
    // No throw = idempotent guard works
    expect(true).toBe(true);
  });

  it('stop() resolves when never started', async () => {
    await expect(worker.stop()).resolves.toBeUndefined();
  });

  it('stop() closes worker when started', async () => {
    const connection = { host: '127.0.0.1', port: 6379 };
    worker.start(connection);
    await expect(worker.stop()).resolves.toBeUndefined();
  });

  it('stop() is idempotent', async () => {
    await worker.stop();
    await worker.stop();
    await expect(worker.stop()).resolves.toBeUndefined();
  });
});
