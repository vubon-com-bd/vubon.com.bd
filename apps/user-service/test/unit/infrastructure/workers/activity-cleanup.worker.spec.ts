import { jest } from '@jest/globals';

import { ActivityCleanupWorker } from '@infrastructure/workers/activity-cleanup.worker';

describe('ActivityCleanupWorker', () => {
  let worker: ActivityCleanupWorker;
  let recorder: { cleanupOlderThan: jest.Mock };
  let logger: { log: jest.Mock };

  beforeEach(() => {
    recorder = { cleanupOlderThan: jest.fn().mockResolvedValue(42) };
    logger = { log: jest.fn() };
    worker = new ActivityCleanupWorker(recorder as never, logger as never);
  });

  it('should cleanup old activities and log count', async () => {
    await worker.process({
      id: 'job-1',
      data: { requestedAt: '2026-01-01T00:00:00.000Z' },
    });
    expect(recorder.cleanupOlderThan).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('42'));
  });
});
