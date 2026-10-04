/**
 * UserSyncWorker Unit Test
 */
import { jest } from '@jest/globals';

import { UserSyncWorker } from '@infrastructure/workers/user-sync.worker';

describe('UserSyncWorker', () => {
  let worker: UserSyncWorker;
  let logger: { log: jest.Mock; error: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };
    worker = new UserSyncWorker(logger as never);
  });

  it('should process sync job successfully', async () => {
    await worker.process({
      id: 'job-1',
      data: { userId: 'user-1', correlationId: 'corr-1' },
    });
    expect(logger.log).toHaveBeenCalledTimes(2);
  });

  it('should log without correlationId', async () => {
    await worker.process({ id: 'job-2', data: { userId: 'user-2' } });
    expect(logger.log).toHaveBeenCalled();
  });
});
