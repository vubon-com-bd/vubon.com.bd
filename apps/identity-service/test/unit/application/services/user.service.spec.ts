import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserService } from '@application/services/impl/user.service.js';
import { makeUserRepositoryMock, activeUser, TEST_IDS, TEST_EMAIL } from '@fixtures/index.js';

describe('UserService', () => {
  let service: UserService;
  let repo: ReturnType<typeof makeUserRepositoryMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    service = new UserService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserService'));

  it('findById() should return null when not found', async () => {
    repo.findById.mockResolvedValue(null);
    expect(await service.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findById() should return DTO', async () => {
    repo.findById.mockResolvedValue(activeUser() as never);
    const result = await service.findById(TEST_IDS.USER_ID);
    expect(result?.id).toBe(TEST_IDS.USER_ID);
  });

  it('findByEmail() should delegate', async () => {
    repo.findByEmailRaw.mockResolvedValue(activeUser() as never);
    const result = await service.findByEmail(TEST_EMAIL);
    expect(result?.email).toBe(TEST_EMAIL);
  });

  it('toPublic() should return public shape', () => {
    const user = activeUser();
    const dto = service.toPublic(user);
    expect(dto.id).toBe(user.id);
    expect(dto.email).toBe(user.email.value);
  });
});
