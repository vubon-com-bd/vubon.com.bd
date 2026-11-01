import { describe, it, expect } from '@jest/globals';
import { UserAddressMapper } from '@application/mappers/user-address.mapper.js';

describe('UserAddressMapper', () => {
  it('should return entity as DTO', () => {
    const entity = { id: 'addr-1', userId: 'u-1' };
    const result = UserAddressMapper.toDTO(entity);
    expect(result).toBe(entity);
  });
});
