/**
 * SocialSyncWorker — Deep Unit Tests
 */
import { SocialSyncWorker } from './social-sync.worker';

const mockJob = (name = 'social-sync', data: Record<string, unknown> = {}) => ({
  id: 'job-1',
  name,
  data,
});

describe('SocialSyncWorker (deep)', () => {
  let worker: SocialSyncWorker;

  beforeEach(() => {
    worker = new SocialSyncWorker();
  });

  it('should have name', () => {
    expect(worker.name).toBe('SocialSyncWorker');
  });

  it('handle() with social-sync name returns success', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('social-sync', { userId: 'user-1' }));
    expect(result.success).toBe(true);
  });

  it('handle() with other name is no-op', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    await expect(handleFn(mockJob('other'))).resolves.toBeDefined();
  });
});
