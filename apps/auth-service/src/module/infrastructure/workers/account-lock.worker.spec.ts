/**
 * AccountLockWorker — Deep Unit Tests
 */
import { AccountLockWorker } from './account-lock.worker';

const mockLockService = () => ({
  autoUnlockExpired: jest.fn().mockResolvedValue(0),
});

const mockJob = (name = 'auto-unlock', id = 'job-1') => ({ id, name, data: {} });

describe('AccountLockWorker (deep)', () => {
  let worker: AccountLockWorker;
  let lockService: ReturnType<typeof mockLockService>;

  beforeEach(() => {
    lockService = mockLockService();
    worker = new AccountLockWorker(lockService as never);
  });

  it('should have name', () => {
    expect(worker.name).toBe('AccountLockWorker');
  });

  it('handle() with auto-unlock calls autoUnlockExpired', async () => {
    lockService.autoUnlockExpired.mockResolvedValue(3);

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean; data?: { unlocked: number } }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('auto-unlock'));
    expect(lockService.autoUnlockExpired).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data?.unlocked).toBe(3);
  });

  it('handle() with other job name is no-op', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('other-job'));
    expect(lockService.autoUnlockExpired).not.toHaveBeenCalled();
    expect(result.success).toBe(true);
  });
});
