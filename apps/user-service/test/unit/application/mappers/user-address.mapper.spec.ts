/**
 * UserAddressMapper Unit Test
 */
import { UserAddressMapper } from '@application/mappers/user-address.mapper';
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

describe('UserAddressMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildAddress = () =>
    UserAddressEntity.create({
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

  describe('toResponse', () => {
    it('should map to AddressResponseDTO', () => {
      const dto = UserAddressMapper.toResponse(buildAddress());
      expect(dto.id).toBe('addr-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.type).toBe('home');
      expect(dto.line1).toBe('123 Main St');
      expect(dto.city).toBe('Dhaka');
      expect(dto.postalCode).toBe('1200');
      expect(dto.country).toBe('BD');
      expect(dto.isDefault).toBe(true);
    });
  });

  describe('toResponseList', () => {
    it('should map a list', () => {
      const dtos = UserAddressMapper.toResponseList([buildAddress()]);
      expect(dtos.length).toBe(1);
    });
  });
});
