import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthRoleService } from '@application/services/impl/auth-role.service.js';
import { makeRoleRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthRoleService', () => {
  let service: AuthRoleService;
  let repo: ReturnType<typeof makeRoleRepositoryMock>;

  beforeEach(() => {
    repo = makeRoleRepositoryMock();
    service = new AuthRoleService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthRoleService'));

  it('listAll() should return empty', async () => {
    repo.findAll.mockResolvedValue([]);
    expect(await service.listAll()).toEqual([]);
  });

  it('findByName() should return null', async () => {
    repo.findByName.mockResolvedValue(null);
    expect(await service.findByName('admin')).toBeNull();
  });

  it('listForUser() should return empty', async () => {
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
});
