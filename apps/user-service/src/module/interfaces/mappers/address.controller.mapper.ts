import { Injectable } from '@nestjs/common';
import type { AddressResponseDTO } from '../../application/dtos/responses/address-response.dto';
import type { AddressResponseDto } from '../dtos/responses/address.response.dto';

@Injectable()
export class AddressControllerMapper {
  toResponse(appDto: AddressResponseDTO): AddressResponseDto {
    const a = appDto.address;
    return {
      id: a.id,
      userId: a.userId,
      type: a.type,
      label: a.label ?? undefined,
      line1: a.line1,
      line2: a.line2 ?? undefined,
      city: a.city,
      state: a.state ?? undefined,
      country: a.country,
      postalCode: a.postalCode ?? undefined,
      isDefault: a.isDefault,
      isDefaultShipping: a.isDefaultShipping,
      isDefaultBilling: a.isDefaultBilling,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  }
}
