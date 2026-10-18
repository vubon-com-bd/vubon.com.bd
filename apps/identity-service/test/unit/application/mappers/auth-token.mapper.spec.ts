import { describe, it, expect } from '@jest/globals';
import { AuthTokenMapper } from '@application/mappers/auth-token.mapper.js';
import { makeTokenEntity, TEST_IDS } from '@fixtures/index.js';

describe('AuthTokenMapper', () => {
  it('toDTO() maps token', () => {
    const token = makeTokenEntity();
    const dto = AuthTokenMapper.toDTO(token);
    expect(dto.id).toBe(token.id);
    expect(dto.type).toBe(token.type.value);
    expect(typeof dto.revoked).toBe('boolean');
    expect(typeof dto.used).toBe('boolean');
  });

  it('toDTOList() empty', () => {
    expect(AuthTokenMapper.toDTOList([])).toEqual([]);
  });
});
