import { jest } from '@jest/globals';

import { ProfileCompletionWorker } from '@infrastructure/workers/profile-completion.worker';

describe('ProfileCompletionWorker', () => {
  let worker: ProfileCompletionWorker;
  let userRepo: { findById: jest.Mock };
  let profileRepo: { findByUserId: jest.Mock };
  let calculator: { calculate: jest.Mock };
  let logger: { log: jest.Mock; warn: jest.Mock };

  beforeEach(() => {
    userRepo = { findById: jest.fn().mockResolvedValue({ id: 'user-1' }) };
    profileRepo = { findByUserId: jest.fn().mockResolvedValue({ id: 'p-1' }) };
    calculator = {
      calculate: jest.fn().mockReturnValue({ percentage: 75, completed: [], missing: [] }),
    };
    logger = { log: jest.fn(), warn: jest.fn() };
    worker = new ProfileCompletionWorker(
      userRepo as never,
      profileRepo as never,
      calculator as never,
      logger as never
    );
  });

  it('should calculate completion when user + profile exist', async () => {
    await worker.process({ id: 'job-1', data: { userId: 'user-1' } });
    expect(calculator.calculate).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalled();
  });

  it('should warn when user not found', async () => {
    userRepo.findById.mockResolvedValue(null);
    await worker.process({ id: 'job-2', data: { userId: 'missing' } });
    expect(logger.warn).toHaveBeenCalled();
  });

  it('should warn when profile not found', async () => {
    profileRepo.findByUserId.mockResolvedValue(null);
    await worker.process({ id: 'job-3', data: { userId: 'user-1' } });
    expect(logger.warn).toHaveBeenCalled();
  });
});
