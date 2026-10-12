import type { PackagingEntity } from '../../domain/entities/packaging.entity.js';
import type { PackagingResponseDTO, PackagingListResponseDTO } from '../dtos/responses/packaging/packaging-response.dto.js';
import type { PackagingTypeValue, PackagingMaterialValue, PackagingStatusValue } from '@vubon/shared-types/logistics';
export class PackagingMapper {
  static toResponse(e: PackagingEntity): PackagingResponseDTO {
    return {
      id: e.id, name: e.name, code: e.code,
      type: e.type.value as PackagingTypeValue,
      material: e.material.value as PackagingMaterialValue,
      status: e.status.value as PackagingStatusValue,
      lengthCm: e.dimensions.lengthCm,
      widthCm: e.dimensions.widthCm,
      heightCm: e.dimensions.heightCm,
      maxWeightKg: e.maxWeightKg.value,
      cost: e.cost?.amount, currency: e.cost?.currency,
      imageUrl: e.imageUrl as unknown as string | undefined,
      isFragile: e.isFragile,
      isTemperatureControlled: e.isTemperatureControlled,
      isRecyclable: e.isRecyclable,
      stock: e.stock, isDefault: e.isDefault,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly PackagingEntity[], total: number, page: number, limit: number): PackagingListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
