import { UserAddressVO } from '@domain/value-objects/composites/user-address.vo';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

describe('UserAddressVO — extended', () => {
  const build = (division: 'dhaka' | 'sylhet' = 'dhaka') =>
    UserAddressVO.create({
      id: AddressIdVO.create('a-1'),
      userId: UserIdVO.create('u-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create(division === 'dhaka' ? 'dhaka' : 'sylhet'),
      division: DivisionVO.create(division),
      postalCode: PostalCodeVO.create('1200'),
      isDefault: true,
    });

  it('toOneLine includes all parts', () => {
    const line = build().toOneLine();
    expect(line).toContain('123 Main');
    expect(line).toContain('Dhaka');
  });

  it('isInDhaka true', () => {
    expect(build('dhaka').isInDhaka()).toBe(true);
  });

  it('isInDhaka false', () => {
    expect(build('sylhet').isInDhaka()).toBe(false);
  });

  it('getters', () => {
    const vo = build();
    expect(vo.isDefault).toBe(true);
    expect(vo.line.value).toBe('123 Main');
    expect(vo.city.value).toBe('Dhaka');
    expect(vo.label.value).toBe('home');
  });
});
