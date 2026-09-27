/**
 * AccountLockWorker — Deep Unit Tests
 */
import { jest } from '@jest/globals';

import { AccountLockWorker } from './account-lock.worker.js';

const mockLockService = () => ({
  autoUnlockExpired: jest.fn<() => Promise<number>>().mockResolvedValue(0),
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
      handle: (job: { id: string; name: string; data: object }) => Promise<unknown>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob());
    expect(lockService.autoUnlockExpired).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
