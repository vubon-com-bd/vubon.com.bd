import { UserAddressVO } from '@domain/value-objects/composites/user-address.vo';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

describe('UserAddressVO', () => {
  const build = (isDefault = false) =>
    UserAddressVO.create({
      id: AddressIdVO.create('a-1'),
      userId: UserIdVO.create('u-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main Street'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create('dhaka'),
      division: DivisionVO.create('dhaka'),
      postalCode: PostalCodeVO.create('1200'),
      isDefault,
    });

  it('creates with fields', () => {
    const vo = build();
    expect(vo.id.value).toBe('a-1');
    expect(vo.isDefault).toBe(false);
  });

  it('toOneLine joins parts', () => {
    expect(build().toOneLine()).toContain('123 Main Street');
  });

  it('isInDhaka returns true', () => {
    expect(build().isInDhaka()).toBe(true);
  });

  it('throws when id missing', () => {
    expect(() =>
      UserAddressVO.create({ id: null as never, userId: {} as never, label: {} as never, line: {} as never, city: {} as never, district: {} as never, division: {} as never, postalCode: {} as never, isDefault: false })
    ).toThrow();
  });

  it('throws when userId missing', () => {
    expect(() =>
      UserAddressVO.create({ id: {} as never, userId: null as never, label: {} as never, line: {} as never, city: {} as never, district: {} as never, division: {} as never, postalCode: {} as never, isDefault: false })
    ).toThrow();
  });
});
