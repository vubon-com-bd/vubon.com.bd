import { Injectable } from '@nestjs/common';
import type { VendorResponseDto } from '../dtos/responses/vendor.response.dto';

@Injectable()
export class VendorControllerMapper {
  toResponse(input: {
    id: string;
    ownerId: string;
    name: string;
    slug: string;
    status: string;
    type: string;
    tier: string;
    createdAt: string;
    updatedAt: string;
  }): VendorResponseDto {
    return {
      id: input.id,
      ownerId: input.ownerId,
      name: input.name,
      slug: input.slug,
      status: input.status,
      type: input.type,
      tier: input.tier,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
}
