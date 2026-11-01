import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserAddressService } from '@application/services/impl/user-address.service.js';
import { makeUserAddressRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('UserAddressService', () => {
  let service: UserAddressService;
  let repo: ReturnType<typeof makeUserAddressRepositoryMock>;

  beforeEach(() => {
    repo = makeUserAddressRepositoryMock();
    service = new UserAddressService(repo as never);
  });

  it('name', () => expect(service.name).toBe('UserAddressService'));
  it('listForUser() empty', async () => {
    repo.findByUserIdRaw.mockResolvedValue([]);
    expect(await service.listForUser(TEST_IDS.USER_ID)).toEqual([]);
  });
  it('findById() null', async () => {
    repo.findById.mockResolvedValue(null);
    expect(await service.findById(TEST_IDS.ADDRESS_ID)).toBeNull();
  });
  it('remove() delegates', async () => {
    repo.delete.mockResolvedValue(undefined);
    await service.remove(TEST_IDS.ADDRESS_ID);
    expect(repo.delete).toHaveBeenCalledWith(TEST_IDS.ADDRESS_ID);
  });
});
