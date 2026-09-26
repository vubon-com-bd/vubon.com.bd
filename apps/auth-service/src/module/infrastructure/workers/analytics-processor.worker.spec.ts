/**
 * AnalyticsProcessorWorker — Deep Unit Tests
 */
import { AnalyticsProcessorWorker } from './analytics-processor.worker';

const mockJob = (name = 'analytics', data: Record<string, unknown> = {}) => ({
  id: 'job-1',
  name,
  data,
});

describe('AnalyticsProcessorWorker (deep)', () => {
  let worker: AnalyticsProcessorWorker;

  beforeEach(() => {
    worker = new AnalyticsProcessorWorker();
  });

  it('should have name', () => {
    expect(worker.name).toBe('AnalyticsProcessorWorker');
  });

  it('handle() returns success with jobId', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ jobId: string; success: boolean }>;
    }).handle.bind(worker);

    const result = await handleFn(mockJob('analytics'));
    expect(result.success).toBe(true);
    expect(result.jobId).toBe('job-1');
  });

  it('handle() handles various event names', async () => {
    const handleFn = (worker as unknown as {
      handle: (job: unknown) => Promise<{ success: boolean }>;
    }).handle.bind(worker);

    for (const name of ['login', 'register', 'logout']) {
      const result = await handleFn(mockJob(name));
      expect(result.success).toBe(true);
    }
  });
});
