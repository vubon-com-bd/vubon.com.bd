import { GetDefaultAddressHandler } from '@application/queries/address/get-default-address.handler';
import { GetDefaultAddressQuery } from '@application/queries/address/get-default-address.query';
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';
import { createUserAddressRepositoryMock } from '../../../helpers/user-repository.mock';

describe('GetDefaultAddressHandler', () => {
  let handler: GetDefaultAddressHandler;
  let addrRepo: ReturnType<typeof createUserAddressRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    addrRepo = createUserAddressRepositoryMock();
    handler = new GetDefaultAddressHandler(addrRepo);
  });

  it('should return default address', async () => {
    const addr = UserAddressEntity.create({
      addressId: AddressIdVO.create('addr-1'),
      userId: UserIdVO.create('user-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create('dhaka'),
      division: DivisionVO.create('dhaka'),
      postalCode: PostalCodeVO.create('1200'),
      isDefault: true,
      now,
    });
    addrRepo.findDefaultByUserId.mockResolvedValue(addr);

    const result = await handler.execute(new GetDefaultAddressQuery('user-1'));
    expect(result.isDefault).toBe(true);
  });

  it('should throw when no default', async () => {
    addrRepo.findDefaultByUserId.mockResolvedValue(null);
    await expect(handler.execute(new GetDefaultAddressQuery('user-1'))).rejects.toThrow();
  });
});
