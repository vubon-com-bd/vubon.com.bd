import { describe, it, expect } from '@jest/globals';
import { AuthMfaMapper } from '@application/mappers/auth-mfa.mapper.js';
import { makeMfaEntity } from '@fixtures/index.js';

describe('AuthMfaMapper', () => {
  it('toDTO() should return success + method', () => {
    const mfa = makeMfaEntity();
    const dto = AuthMfaMapper.toDTO(mfa);
    expect(dto.success).toBe(true);
    expect(dto.primaryMethod).toBe(mfa.method.value);
  });

  it('toDTO() enabled reflects isEnabledAndVerified', () => {
    const mfa = makeMfaEntity();
    const dto = AuthMfaMapper.toDTO(mfa);
    expect(dto.enabled).toBe(mfa.isEnabledAndVerified());
  });
});
