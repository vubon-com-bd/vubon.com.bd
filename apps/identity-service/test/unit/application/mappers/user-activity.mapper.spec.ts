import { describe, it, expect } from '@jest/globals';
import { UserActivityMapper } from '@application/mappers/user-activity.mapper.js';

describe('UserActivityMapper', () => {
  it('should return entity as DTO (identity cast)', () => {
    const entity = {
      id: 'a-1', userId: 'u-1', type: 'login', category: 'auth',
      occurredAt: '2025-01-01T00:00:00.000Z',
    };
    const result = UserActivityMapper.toDTO(entity);
    expect(result).toBe(entity);
  });
});
