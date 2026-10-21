/**
 * RetryService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RetryService } from '@infrastructure/services/internal/retry.service';

describe('RetryService', () => {
  let service: RetryService;

  beforeEach(() => {
    service = new RetryService();
  });

  it('returns immediately on first success', async () => {
    const fn = jest.fn().mockResolvedValue('ok');
    const result = await service.execute('test', fn);
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and eventually succeeds', async () => {
    const fn = jest
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockResolvedValueOnce('ok');
    const result = await service.execute('test', fn, {
      attempts: 3,
      delayMs: 1,
    });
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('throws after max attempts', async () => {
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(new Error('always'));
    await expect(
      service.execute('test', fn, { attempts: 2, delayMs: 1 }),
    ).rejects.toThrow('always');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('respects shouldRetry callback', async () => {
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(new Error('no-retry'));
    const shouldRetry = jest.fn().mockReturnValue(false);
    await expect(
      service.execute('test', fn, { attempts: 3, shouldRetry }),
    ).rejects.toThrow('no-retry');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
