import { describe, it, expect } from '@jest/globals';
import { UserPermissionService } from '@application/services/impl/user-permission.service.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('UserPermissionService', () => {
  it('name', () => expect(new UserPermissionService().name).toBe('UserPermissionService'));
  it('listForUser() empty', async () => {
    expect(await new UserPermissionService().listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
  it('has() false', async () => {
    expect(await new UserPermissionService().has(TEST_IDS.USER_ID, 'x:y')).toBe(false);
  });
});
