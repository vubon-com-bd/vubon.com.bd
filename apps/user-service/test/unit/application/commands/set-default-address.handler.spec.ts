import { SetDefaultAddressHandler } from '@application/commands/address/set-default-address.handler';
import { SetDefaultAddressCommand } from '@application/commands/address/set-default-address.command';
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

describe('SetDefaultAddressHandler', () => {
  let handler: SetDefaultAddressHandler;
  let addrRepo: ReturnType<typeof createUserAddressRepositoryMock>;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    addrRepo = createUserAddressRepositoryMock();
    handler = new SetDefaultAddressHandler(addrRepo as never);
  });

  it('should set default address', async () => {
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

    const result = await handler.execute(new SetDefaultAddressCommand('user-1', 'addr-1'));
    expect(result.isDefault).toBe(true);
    expect(addrRepo.clearDefaultForUser).toHaveBeenCalled();
  });

  it('should throw when address not found', async () => {
    addrRepo.findById.mockResolvedValue(null);
    await expect(handler.execute(new SetDefaultAddressCommand('user-1', 'missing'))).rejects.toThrow();
  });
});
