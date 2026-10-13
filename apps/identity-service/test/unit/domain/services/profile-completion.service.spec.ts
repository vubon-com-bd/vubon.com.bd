/**
 * ProfileCompletionService — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { ProfileCompletionService } from '../../../../src/module/domain/services/profile-completion.service.js';

describe('ProfileCompletionService', () => {
  describe('calculate()', () => {
    it('returns 0% for empty input', () => {
      const result = ProfileCompletionService.calculate({});
      expect(result.percent).toBe(0);
      expect(result.isComplete).toBe(false);
      expect(result.missingFields.length).toBeGreaterThan(0);
    });

    it('returns 100% for full input', () => {
      const result = ProfileCompletionService.calculate({
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        bio: 'Test bio',
        dateOfBirth: '1990-01-01',
        gender: 'male',
      });
      expect(result.percent).toBe(100);
      expect(result.isComplete).toBe(true);
    });

    it('returns partial percentage', () => {
      const result = ProfileCompletionService.calculate({
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
      });
      expect(result.percent).toBeGreaterThan(0);
      expect(result.percent).toBeLessThan(100);
    });

    it('ignores empty strings', () => {
      const result = ProfileCompletionService.calculate({
        firstName: '',
        lastName: '',
      });
      expect(result.percent).toBe(0);
    });
  });

  describe('isComplete()', () => {
    it('true when >= 80%', () => {
      const complete = ProfileCompletionService.isComplete({
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        bio: 'Bio',
        gender: 'male',
      });
      expect(complete).toBe(true);
    });

    it('false when < 80%', () => {
      expect(ProfileCompletionService.isComplete({})).toBe(false);
    });
  });
});
