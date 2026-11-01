import { describe, it, expect } from '@jest/globals';
import { UserKycMapper } from '@application/mappers/user-kyc.mapper.js';

describe('UserKycMapper', () => {
  it('should return entity as DTO', () => {
    const entity = { id: 'k-1', userId: 'u-1', status: 'pending' };
    expect(UserKycMapper.toDTO(entity)).toBe(entity);
  });
});
