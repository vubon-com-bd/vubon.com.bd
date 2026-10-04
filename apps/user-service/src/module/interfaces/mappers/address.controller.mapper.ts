/**
 * AddressControllerMapper
 */
import type {
  AddAddressRequestDto,
  UpdateAddressRequestDto,
} from '../dtos/requests/address.request.dto.js';
import {
  AddressResponseDto,
  AddressListResponseDto,
} from '../dtos/responses/address.response.dto.js';
import type { AddAddressRequestDTO } from '@application/dtos/requests/address';
import type { UpdateAddressRequestDTO } from '@application/dtos/requests/address';
import type { AddressResponseDTO } from '@application/dtos/responses/address-response.dto';

export class AddressControllerMapper {
  static toAddAppDto(userId: string, dto: AddAddressRequestDto): AddAddressRequestDTO {
    return {
      userId,
      type: dto.type,
      line1: dto.line1,
      line2: dto.line2,
      city: dto.city,
      state: dto.district ?? dto.division,
      postalCode: dto.postalCode,
      country: dto.country ?? 'BD',
      isDefault: dto.isDefault,
      isDefaultShipping: dto.isDefaultShipping,
      isDefaultBilling: dto.isDefaultBilling,
    };
  }

  static toUpdateAppDto(
    userId: string,
    addressId: string,
    dto: UpdateAddressRequestDto
  ): UpdateAddressRequestDTO {
    return {
      userId,
      addressId,
      type: dto.type,
      line1: dto.line1,
      line2: dto.line2,
      city: dto.city,
      state: dto.district ?? dto.division,
      postalCode: dto.postalCode,
      isDefault: dto.isDefault,
    };
  }

  static toResponse(app: AddressResponseDTO): AddressResponseDto {
    const res = new AddressResponseDto();
    res.id = app.id;
    res.userId = app.userId;
    res.type = app.type;
    res.line1 = app.line1;
    res.line2 = app.line2;
    res.city = app.city;
    res.state = app.state;
    res.postalCode = app.postalCode;
    res.country = app.country;
    res.isDefault = app.isDefault;
    res.isDefaultShipping = app.isDefaultShipping;
    res.isDefaultBilling = app.isDefaultBilling;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }

  static toListResponse(apps: readonly AddressResponseDTO[]): AddressListResponseDto {
    const res = new AddressListResponseDto();
    res.items = apps.map((a) => AddressControllerMapper.toResponse(a));
    res.total = apps.length;
    return res;
  }
}
