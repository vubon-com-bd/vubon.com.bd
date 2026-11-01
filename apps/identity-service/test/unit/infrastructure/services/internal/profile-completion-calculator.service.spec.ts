/**
 * ProfileCompletionCalculatorService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ProfileCompletionCalculatorService } from '@infrastructure/services/internal/profile-completion-calculator.service.js';

describe('ProfileCompletionCalculatorService', () => {
  let service: ProfileCompletionCalculatorService;

  beforeEach(() => {
    service = new ProfileCompletionCalculatorService();
  });

  it('calculate returns score for empty profile', () => {
    const result = service.calculate({} as never);
    expect(result).toBeDefined();
  });

  it('calculate returns score for complete profile', () => {
    const result = service.calculate({
      firstName: 'Test',
      lastName: 'User',
      avatarUrl: 'https://x.com/a.jpg',
      phone: '+8801700000000',
      bio: 'Hello',
      dateOfBirth: '1990-01-01',
    } as never);
    expect(result).toBeDefined();
  });

  it('isComplete returns boolean', () => {
    const result = service.isComplete({
      firstName: 'A',
      lastName: 'B',
    } as never);
    expect(typeof result).toBe('boolean');
  });

  it('isComplete false for missing fields', () => {
    expect(service.isComplete({} as never)).toBe(false);
  });
});
