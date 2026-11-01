import type { AddressResponseDTO } from '../dtos/responses/address-response.dto.js';

export class UserAddressMapper {
  static toDTO(entity: unknown): AddressResponseDTO {
    return entity as AddressResponseDTO;
  }
}
