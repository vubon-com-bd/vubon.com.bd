import { describe, it, expect } from '@jest/globals';
import { UserProfileMapper } from '@application/mappers/user-profile.mapper.js';

describe('UserProfileMapper', () => {
  it('should map entity to DTO with default visibility/completion', () => {
    const entity = {
      userId: { value: 'u-1' },
      firstName: { value: 'John' },
      lastName: { value: 'Doe' },
      displayName: 'John Doe',
      bio: 'Developer',
      avatarUrl: 'https://x.com/a.jpg',
      coverUrl: 'https://x.com/c.jpg',
      gender: 'male',
      dateOfBirth: '1990-01-01',
      website: 'https://john.dev',
      language: 'en',
      locale: 'en-US',
      timezone: 'Asia/Dhaka',
      updatedAt: '2025-01-01T00:00:00.000Z',
    };
    const result = UserProfileMapper.toDTO(entity);
    expect(result.userId).toBe('u-1');
    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Doe');
    expect(result.gender).toBe('male');
    expect(result.visibility).toBe('public');
    expect(result.completionPercent).toBe(0);
    expect(result.updatedAt).toBe('2025-01-01T00:00:00.000Z');
  });

  it('should handle missing optional fields', () => {
    const entity = {
      userId: { value: 'u-2' },
      updatedAt: '2025-01-01T00:00:00.000Z',
    };
    const result = UserProfileMapper.toDTO(entity);
    expect(result.userId).toBe('u-2');
    expect(result.firstName).toBeUndefined();
    expect(result.lastName).toBeUndefined();
    expect(result.bio).toBeUndefined();
  });
});
