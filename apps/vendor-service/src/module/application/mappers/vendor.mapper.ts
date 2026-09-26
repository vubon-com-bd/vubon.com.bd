import { VendorEntity } from '../../domain/entities/vendor.entity';
import type { VendorResponseDto } from '../dtos/responses/vendor-response.dto';
import type { VendorPublicResponseDto } from '../dtos/responses/vendor-public-response.dto';

export class VendorMapper {
  static toDto(entity: VendorEntity): VendorResponseDto {
    return {
      id: entity.id.value,
      ownerId: entity.ownerId.value,
      name: entity.name.value,
      slug: entity.slug.value,
      status: entity.status.value,
      type: entity.type.value,
      tier: entity.tier.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicDto(entity: VendorEntity): VendorPublicResponseDto {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      tier: entity.tier.value,
    };
  }
}
