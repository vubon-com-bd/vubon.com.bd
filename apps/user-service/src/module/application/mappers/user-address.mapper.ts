import { UserAddressEntity } from '../../domain/entities/user-address.entity';
import type { AddressResponseDTO } from '../dtos/responses/address-response.dto';

export class UserAddressMapper {
  static toResponse(address: UserAddressEntity): AddressResponseDTO {
    return {
      success: true,
      address: {
        id: address.id.value,
        userId: address.userId.value,
        type: 'home',
        label: address.label?.value,
        line1: address.line1.value,
        line2: address.line2?.value,
        city: address.city.value,
        state: address.division.value,
        country: 'BD',
        postalCode: address.postalCode?.value,
        isDefault: address.isDefault,
        isDefaultShipping: address.isDefault,
        isDefaultBilling: false,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
      },
    } as unknown as AddressResponseDTO;
  }

  static toListResponse(
    addresses: readonly UserAddressEntity[],
  ): readonly AddressResponseDTO[] {
    return addresses.map((a) => UserAddressMapper.toResponse(a));
  }
}
