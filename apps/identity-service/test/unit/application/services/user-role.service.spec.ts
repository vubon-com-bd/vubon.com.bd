import { describe, it, expect } from '@jest/globals';
import { UserRoleService } from '@application/services/impl/user-role.service.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('UserRoleService', () => {
  it('name', () => expect(new UserRoleService().name).toBe('UserRoleService'));
  it('listForUser() empty', async () => {
    expect(await new UserRoleService().listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
  it('has() false', async () => {
    expect(await new UserRoleService().has(TEST_IDS.USER_ID, 'admin')).toBe(false);
  });
});
