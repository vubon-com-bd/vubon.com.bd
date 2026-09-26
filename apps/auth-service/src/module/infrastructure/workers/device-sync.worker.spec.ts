/**
 * DeviceSyncWorker — Deep Unit Tests
 */
import { DeviceSyncWorker } from './device-sync.worker';

const mockJob = (name = 'device-sync', data: Record<string, unknown> = {}) => ({
  id: 'job-1',
  name,
  data,
});

describe('DeviceSyncWorker (deep)', () => {
  let worker: DeviceSyncWorker;

  beforeEach(() => {
    worker = new DeviceSyncWorker();
  });

  it('should have name', () => {
    expect(worker.name).toBe('DeviceSyncWorker');
  });

  it('handle() with device-sync name returns success', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('device-sync', { userId: 'user-1' }));
    expect(result.success).toBe(true);
  });

  it('handle() with other name is no-op', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('other', {}));
    expect(result.success).toBe(true);
  });
});
