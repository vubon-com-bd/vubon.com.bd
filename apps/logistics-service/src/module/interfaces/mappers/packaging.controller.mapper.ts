import type {
  CreatePackagingRequestDTO, UpdatePackagingRequestDTO,
  AdjustPackagingStockRequestDTO, RestockPackagingRequestDTO,
  ConsumePackagingRequestDTO, SelectPackagingRequestDTO,
} from '../../application/dtos/requests/packaging/packaging.dto.js';
import type { PackagingListOptionsDTO } from '../../application/services/interfaces/packaging.service.interface.js';
import type {
  CreatePackagingHttpDTO, UpdatePackagingHttpDTO, AdjustPackagingStockHttpDTO,
  RestockPackagingHttpDTO, ConsumePackagingHttpDTO, SelectPackagingHttpDTO, ListPackagingsHttpQueryDTO,
} from '../dtos/requests/packaging.request.dto.js';
import type { PackagingTypeValue, PackagingMaterialValue, PackagingStatusValue } from '@vubon/shared-types/logistics';

export class PackagingControllerMapper {
  static toCreateDto(dto: CreatePackagingHttpDTO): CreatePackagingRequestDTO {
    return {
      name: dto.name, code: dto.code,
      type: dto.type as PackagingTypeValue, material: dto.material as PackagingMaterialValue,
      lengthCm: dto.lengthCm, widthCm: dto.widthCm, heightCm: dto.heightCm,
      maxWeightKg: dto.maxWeightKg, cost: dto.cost, currency: dto.currency, imageUrl: dto.imageUrl,
      isFragile: dto.isFragile, isTemperatureControlled: dto.isTemperatureControlled, isRecyclable: dto.isRecyclable,
      stock: dto.stock, isDefault: dto.isDefault,
    };
  }
  static toUpdateDto(id: string, dto: UpdatePackagingHttpDTO): UpdatePackagingRequestDTO {
    return { packagingId: id, ...dto };
  }
  static toAdjustDto(id: string, dto: AdjustPackagingStockHttpDTO): AdjustPackagingStockRequestDTO {
    return { packagingId: id, delta: dto.delta, reason: dto.reason };
  }
  static toRestockDto(id: string, dto: RestockPackagingHttpDTO): RestockPackagingRequestDTO {
    return { packagingId: id, quantity: dto.quantity };
  }
  static toConsumeDto(id: string, dto: ConsumePackagingHttpDTO): ConsumePackagingRequestDTO {
    return { packagingId: id, quantity: dto.quantity };
  }
  static toSelectDto(dto: SelectPackagingHttpDTO): SelectPackagingRequestDTO {
    return { weightKg: dto.weightKg, dimensions: dto.dimensions };
  }
  static toListOptions(q: ListPackagingsHttpQueryDTO): PackagingListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as PackagingStatusValue) : undefined,
        type: q.type ? (q.type as PackagingTypeValue) : undefined,
        material: q.material ? (q.material as PackagingMaterialValue) : undefined,
        search: q.search,
      },
    };
  }
}
