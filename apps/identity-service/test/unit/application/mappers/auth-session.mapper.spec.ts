import { describe, it, expect } from '@jest/globals';
import { AuthSessionMapper } from '@application/mappers/auth-session.mapper.js';
import { activeSession, TEST_IDS } from '@fixtures/index.js';

describe('AuthSessionMapper', () => {
  it('toDTO() should map fields', () => {
    const session = activeSession();
    const dto = AuthSessionMapper.toDTO(session);
    expect(dto.id).toBe(session.id);
    expect(dto.userId).toBe(TEST_IDS.USER_ID);
    expect(dto.status).toBe(session.status.value);
    expect(dto.isCurrent).toBe(false);
  });

  it('toDTO() should include expiresAt ISO', () => {
    const dto = AuthSessionMapper.toDTO(activeSession());
    expect(dto.expiresAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('toDTOList() maps array', () => {
    const list = AuthSessionMapper.toDTOList([activeSession(), activeSession()]);
    expect(list.length).toBe(2);
  });
});
