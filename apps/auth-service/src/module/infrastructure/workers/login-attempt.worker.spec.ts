/**
 * LoginAttemptWorker — Deep Unit Tests
 */
import { LoginAttemptWorker } from './login-attempt.worker';

const mockService = () => ({
  getRecentForUser: jest.fn().mockResolvedValue([]),
});

const mockJob = (data: Record<string, unknown> = {}, id = 'job-1') => ({
  id,
  data,
  name: 'login-attempt-aggregate',
});

describe('LoginAttemptWorker (deep)', () => {
  let worker: LoginAttemptWorker;
  let attempts: ReturnType<typeof mockService>;

  beforeEach(() => {
    attempts = mockService();
    worker = new LoginAttemptWorker(attempts as never);
  });

  it('should have name', () => {
    expect(worker.name).toBe('LoginAttemptWorker');
  });

  it('handle() with userId calls getRecentForUser', async () => {
    attempts.getRecentForUser.mockResolvedValue(new Array(5).fill({}));

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean; data?: { count: number } }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob({ userId: 'user-1', limit: 50 }));
    expect(attempts.getRecentForUser).toHaveBeenCalledWith('user-1', 50);
    expect(result.data?.count).toBe(5);
  });

  it('handle() uses default limit 50 when missing', async () => {
    attempts.getRecentForUser.mockResolvedValue([]);

    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    await handleFn(mockJob({ userId: 'user-1' }));
    expect(attempts.getRecentForUser).toHaveBeenCalledWith('user-1', 50);
  });

  it('handle() without userId is no-op', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    await handleFn(mockJob({}));
    expect(attempts.getRecentForUser).not.toHaveBeenCalled();
  });
});
