/**
 * PackagingControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreatePackagingHttpDTO,
  UpdatePackagingHttpDTO,
  UpdateSizeHttpDTO,
  AddStockHttpDTO,
  ConsumeStockHttpDTO,
  PackagingReasonHttpDTO,
  ListPackagingsHttpQueryDTO,
} from '../dtos/requests/packaging/packaging.request.dto.js';
import type { CreatePackagingRequestDTO } from '@application/dtos/requests/packaging/create-packaging.dto.js';
import type {
  PackagingResponseDTO,
  PackagingSummaryResponseDTO,
  PackagingListResponseDTO,
  PackagingStatsResponseDTO,
} from '@application/dtos/responses/packaging/index.js';
import type {
  PackagingHttpResponseDTO,
  PackagingSummaryHttpResponseDTO,
  PackagingListHttpResponseDTO,
  PackagingStatsHttpResponseDTO,
} from '../dtos/responses/packaging/packaging.response.dto.js';

export class PackagingControllerMapper {
  static toCreateAppDto(http: CreatePackagingHttpDTO): CreatePackagingRequestDTO {
    return {
      name: http.name,
      code: http.code,
      type: http.type as CreatePackagingRequestDTO['type'],
      material: http.material as CreatePackagingRequestDTO['material'],
      lengthCm: http.lengthCm,
      widthCm: http.widthCm,
      heightCm: http.heightCm,
      maxWeightKg: http.maxWeightKg,
      cost: http.cost,
      currency: http.currency,
      imageUrl: http.imageUrl,
      isFragile: http.isFragile,
      isTemperatureControlled: http.isTemperatureControlled,
      isRecyclable: http.isRecyclable,
      stock: http.stock,
      isDefault: http.isDefault,
    };
  }

  static toUpdateAppDto(packagingId: string, http: UpdatePackagingHttpDTO): Record<string, unknown> {
    return { packagingId, ...http };
  }

  static toSizeAppDto(packagingId: string, http: UpdateSizeHttpDTO): Record<string, unknown> {
    return { packagingId, ...http };
  }

  static toAddStockAppDto(packagingId: string, http: AddStockHttpDTO): Record<string, unknown> {
    return { packagingId, quantity: http.quantity };
  }

  static toConsumeStockAppDto(packagingId: string, http: ConsumeStockHttpDTO): Record<string, unknown> {
    return { packagingId, quantity: http.quantity };
  }

  static toReasonAppDto(packagingId: string, http: PackagingReasonHttpDTO): Record<string, unknown> {
    return { packagingId, reason: http.reason };
  }

  static toListOptions(http: ListPackagingsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        material: http.material,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: PackagingResponseDTO): PackagingHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
      material: typeof app.material === 'string' ? app.material : String(app.material),
    } as unknown as PackagingHttpResponseDTO;
  }

  static toSummaryHttp(app: PackagingSummaryResponseDTO): PackagingSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as PackagingSummaryHttpResponseDTO;
  }

  static toListHttp(app: PackagingListResponseDTO): PackagingListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: PackagingStatsResponseDTO): PackagingStatsHttpResponseDTO {
    return app as unknown as PackagingStatsHttpResponseDTO;
  }
}
