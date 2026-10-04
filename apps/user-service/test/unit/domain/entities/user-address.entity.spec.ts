/**
 * UserAddressEntity Unit Test
 */
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

describe('UserAddressEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildAddress = () =>
    UserAddressEntity.create({
      addressId: AddressIdVO.create('addr-1'),
      userId: UserIdVO.create('user-1'),
      label: AddressLabelVO.create('home'),
      line: AddressLineVO.create('123 Main Street'),
      city: CityVO.create('Dhaka'),
      district: DistrictVO.create('dhaka'),
      division: DivisionVO.create('dhaka'),
      postalCode: PostalCodeVO.create('1200'),
      isDefault: false,
      now,
    });

  describe('create', () => {
    it('should create address with given data', () => {
      const addr = buildAddress();
      expect(addr.id).toBe('addr-1');
      expect(addr.line.value).toBe('123 Main Street');
      expect(addr.city.value).toBe('Dhaka');
      expect(addr.isDefault).toBe(false);
    });

    it('should respect isDefault flag', () => {
      const addr = UserAddressEntity.create({
        addressId: AddressIdVO.create('addr-2'),
        userId: UserIdVO.create('user-1'),
        label: AddressLabelVO.create('work'),
        line: AddressLineVO.create('456 Work Ave'),
        city: CityVO.create('Dhaka'),
        district: DistrictVO.create('dhaka'),
        division: DivisionVO.create('dhaka'),
        postalCode: PostalCodeVO.create('1200'),
        isDefault: true,
        now,
      });
      expect(addr.isDefault).toBe(true);
    });
  });

  describe('update', () => {
    it('should update line and city', () => {
      const addr = buildAddress();
      addr.update({
        line: AddressLineVO.create('999 New Street'),
        city: CityVO.create('Chittagong'),
      });
      expect(addr.line.value).toBe('999 New Street');
      expect(addr.city.value).toBe('Chittagong');
    });
  });

  describe('makeDefault / unmarkDefault', () => {
    it('should make default', () => {
      const addr = buildAddress();
      addr.makeDefault();
      expect(addr.isDefault).toBe(true);
    });

    it('should unmark default', () => {
      const addr = buildAddress();
      addr.makeDefault();
      addr.unmarkDefault();
      expect(addr.isDefault).toBe(false);
    });
  });

  describe('toAddressVO', () => {
    it('should return UserAddressVO', () => {
      const vo = buildAddress().toAddressVO();
      expect(vo.id.value).toBe('addr-1');
      expect(vo.userId.value).toBe('user-1');
    });
  });
});
