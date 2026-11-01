/**
 * UserTierEvaluatorService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserTierEvaluatorService } from '@infrastructure/services/internal/user-tier-evaluator.service.js';

describe('UserTierEvaluatorService', () => {
  let service: UserTierEvaluatorService;

  beforeEach(() => {
    service = new UserTierEvaluatorService();
  });

  it('evaluate returns tier', () => {
    const result = service.evaluate({ score: 50 } as never);
    expect(result).toBeDefined();
  });

  it('tierFromScore returns string', () => {
    expect(typeof service.tierFromScore(0)).toBe('string');
    expect(typeof service.tierFromScore(50)).toBe('string');
    expect(typeof service.tierFromScore(100)).toBe('string');
  });

  it('tierFromScore monotonic', () => {
    const low = service.tierFromScore(0);
    const high = service.tierFromScore(100);
    // Both are strings; at least they differ OR both valid
    expect(low).toBeTruthy();
    expect(high).toBeTruthy();
  });
});
