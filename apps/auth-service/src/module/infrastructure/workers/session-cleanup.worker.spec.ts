/**
 * SessionCleanupWorker — Deep Unit Tests
 */
import { SessionCleanupWorker } from './session-cleanup.worker';

const mockRepo = () => ({
  deleteExpired: jest.fn().mockResolvedValue(0),
});

const mockJob = (id = 'job-1', data = {}) => ({
  id,
  data,
  name: 'session-cleanup',
});

describe('SessionCleanupWorker (deep)', () => {
  let worker: SessionCleanupWorker;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    worker = new SessionCleanupWorker(repo as never);
  });

  it('should have name', () => {
    expect(worker.name).toBe('SessionCleanupWorker');
  });

  it('handle() should call repo.deleteExpired', async () => {
    repo.deleteExpired.mockResolvedValue(7);

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean; data?: { deleted: number } }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob());

    expect(repo.deleteExpired).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data?.deleted).toBe(7);
  });

  it('handle() should include jobId in result', async () => {
    repo.deleteExpired.mockResolvedValue(0);

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ jobId: string }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('my-job-id'));
    expect(result.jobId).toBe('my-job-id');
  });

  it('stop() resolves when never started', async () => {
    await expect(worker.stop()).resolves.toBeUndefined();
  });
});
