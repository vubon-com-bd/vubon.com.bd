import { describe, it, expect } from '@jest/globals';
import { UserMapper } from '@application/mappers/user.mapper.js';
import { activeUser, TEST_IDS, TEST_EMAIL } from '@fixtures/index.js';

describe('UserMapper', () => {
  it('toDTO() should map entity fields', () => {
    const user = activeUser();
    const dto = UserMapper.toDTO(user);
    expect(dto.id).toBe(user.id);
    expect(dto.email).toBe(user.email.value);
    expect(dto.status).toBe(user.status.value);
    expect(dto.type).toBe(user.type.value);
    expect(dto.roles).toEqual(user.roles.map((r) => r.value));
  });

  it('toDTO() should include verification flags', () => {
    const user = activeUser();
    const dto = UserMapper.toDTO(user);
    expect(dto.emailVerified).toBe(user.emailVerified);
    expect(dto.phoneVerified).toBe(user.phoneVerified);
    expect(dto.isMfaEnabled).toBe(user.isMfaEnabled);
  });

  it('toDTOList() should map array', () => {
    const users = [activeUser(), activeUser()];
    const list = UserMapper.toDTOList(users);
    expect(list.length).toBe(2);
    expect(list[0].email).toBe(TEST_EMAIL);
  });

  it('toDTOList() should handle empty', () => {
    expect(UserMapper.toDTOList([])).toEqual([]);
  });

  it('toDTO() should preserve userId', () => {
    const dto = UserMapper.toDTO(activeUser());
    expect(dto.id).toBe(TEST_IDS.USER_ID);
  });
});
