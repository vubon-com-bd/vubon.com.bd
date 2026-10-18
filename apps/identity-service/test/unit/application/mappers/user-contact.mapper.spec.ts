import { describe, it, expect } from '@jest/globals';
import { UserContactMapper } from '@application/mappers/user-contact.mapper.js';

describe('UserContactMapper', () => {
  it('should return entity as DTO', () => {
    const entity = { id: 'c-1', userId: 'u-1', contactType: 'email' };
    expect(UserContactMapper.toDTO(entity)).toBe(entity);
  });
});
