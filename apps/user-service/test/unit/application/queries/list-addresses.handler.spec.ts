/**
 * ListAddressesHandler Unit Test
 */
import { ListAddressesHandler } from '@application/queries/address/list-addresses.handler';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query';
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

describe('ListAddressesHandler', () => {
  let handler: ListAddressesHandler;
  let addrRepo: ReturnType<typeof createUserAddressRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    addrRepo = createUserAddressRepositoryMock();
    handler = new ListAddressesHandler(addrRepo);
  });

  it('should return empty list when no addresses', async () => {
    addrRepo.findByUserId.mockResolvedValue([]);
    const result = await handler.execute(new ListAddressesQuery('user-1'));
    expect(result.items.length).toBe(0);
    expect(result.total).toBe(0);
  });

  it('should map addresses to DTOs', async () => {
    const addr = UserAddressEntity.create({
      addressId: AddressIdVO.create('addr-1'),
      userId: UserIdVO.create('user-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main St'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create('dhaka'),
      division: DivisionVO.create('dhaka'),
      postalCode: PostalCodeVO.create('1200'),
      isDefault: true,
      now,
    });
    addrRepo.findByUserId.mockResolvedValue([addr]);

    const result = await handler.execute(new ListAddressesQuery('user-1'));
    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe('addr-1');
  });
});
