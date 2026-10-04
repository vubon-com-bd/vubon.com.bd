import { GetAddressHandler } from '@application/queries/address/get-address.handler';
import { GetAddressQuery } from '@application/queries/address/get-address.query';
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

describe('GetAddressHandler', () => {
  let handler: GetAddressHandler;
  let addrRepo: ReturnType<typeof createUserAddressRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    addrRepo = createUserAddressRepositoryMock();
    handler = new GetAddressHandler(addrRepo);
  });

  it('should return address DTO', async () => {
    const addr = UserAddressEntity.create({
      addressId: AddressIdVO.create('addr-1'),
      userId: UserIdVO.create('user-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create('dhaka'),
      division: DivisionVO.create('dhaka'),
      postalCode: PostalCodeVO.create('1200'),
      isDefault: false,
      now,
    });
    addrRepo.findById.mockResolvedValue(addr);

    const result = await handler.execute(new GetAddressQuery('user-1', 'addr-1'));
    expect(result.id).toBe('addr-1');
  });

  it('should throw when not found', async () => {
    addrRepo.findById.mockResolvedValue(null);
    await expect(handler.execute(new GetAddressQuery('user-1', 'missing'))).rejects.toThrow();
  });
});
