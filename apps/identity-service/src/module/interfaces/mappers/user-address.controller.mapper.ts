/**
 * UserAddressControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { AddAddressHttpDTO } from '../dtos/requests/user/add-address.request.dto.js';
import type { UpdateAddressHttpDTO } from '../dtos/requests/user/update-address.request.dto.js';
import type { UserAddressHttpResponseDTO } from '../dtos/responses/user-address/user-address.response.dto.js';
import type { UserAddressListHttpResponseDTO } from '../dtos/responses/user-address/user-address-list.response.dto.js';

export class UserAddressControllerMapper {
  static toAddAppDto(dto: AddAddressHttpDTO): unknown {
    return { ...dto };
  }

  static toUpdateAppDto(dto: UpdateAddressHttpDTO): unknown {
    return { ...dto };
  }

  static toHttpResponse(app: unknown): UserAddressHttpResponseDTO {
    return app as UserAddressHttpResponseDTO;
  }

  static toHttpList(items: readonly unknown[]): UserAddressListHttpResponseDTO {
    return {
      success: true,
      addresses: items as never,
      total: items.length,
    };
  }
}
