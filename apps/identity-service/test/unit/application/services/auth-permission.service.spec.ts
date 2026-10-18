import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthPermissionService } from '@application/services/impl/auth-permission.service.js';
import { makePermissionRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthPermissionService', () => {
  let service: AuthPermissionService;
  let repo: ReturnType<typeof makePermissionRepositoryMock>;

  beforeEach(() => {
    repo = makePermissionRepositoryMock();
    service = new AuthPermissionService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthPermissionService'));

  it('listAll() should return empty', async () => {
    repo.findAll.mockResolvedValue([]);
    expect(await service.listAll()).toEqual([]);
  });

  it('findByCategory() should delegate', async () => {
    repo.findByCategory.mockResolvedValue([]);
    expect(await service.findByCategory('auth')).toEqual([]);
  });

  it('listForUser() should return empty (stub)', async () => {
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });

  it('hasPermission() should return false (stub)', async () => {
    expect(await service.hasPermission(TEST_IDS.USER_ID, 'auth:login')).toBe(false);
  });
});
