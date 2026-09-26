/**
 * TokenCleanupWorker — Deep Unit Tests
 */
import { TokenCleanupWorker } from './token-cleanup.worker';

const mockRepo = () => ({
  deleteExpired: jest.fn().mockResolvedValue(0),
});

const mockJob = (id = 'job-1') => ({ id, data: {}, name: 'token-cleanup' });

describe('TokenCleanupWorker (deep)', () => {
  let worker: TokenCleanupWorker;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    worker = new TokenCleanupWorker(repo as never);
  });

  it('should have name', () => {
    expect(worker.name).toBe('TokenCleanupWorker');
  });

  it('handle() calls deleteExpired and returns success', async () => {
    repo.deleteExpired.mockResolvedValue(15);

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean; data?: { deleted: number } }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob());
    expect(repo.deleteExpired).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.data?.deleted).toBe(15);
  });

  it('handle() includes jobId', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ jobId: string }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('tok-job-42'));
    expect(result.jobId).toBe('tok-job-42');
  });
});
