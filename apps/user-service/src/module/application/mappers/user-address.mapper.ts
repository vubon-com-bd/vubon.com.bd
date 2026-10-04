/**
 * UserAddressMapper
 */
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import type { AddressResponseDTO } from '../dtos/responses/address-response.dto.js';

export class UserAddressMapper {
  static toResponse(address: UserAddressEntity): AddressResponseDTO {
    return {
      id: address.id,
      userId: address.userId.value,
      type: address.label.value,
      line1: address.line.value,
      city: address.city.value,
      postalCode: address.postalCode.value,
      country: 'BD',
      isDefault: address.isDefault,
      isDefaultShipping: address.isDefault,
      isDefaultBilling: false,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    };
  }

  static toResponseList(
    addresses: readonly UserAddressEntity[]
  ): readonly AddressResponseDTO[] {
    return addresses.map((a) => UserAddressMapper.toResponse(a));
  }
}
