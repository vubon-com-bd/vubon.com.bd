import type { PackagingEntity } from '@domain/entities/packaging.entity';
import type {
  PackagingResponseDTO,
  PackagingSummaryResponseDTO,
  PackagingListResponseDTO,
  PackagingStatsResponseDTO,
} from '@application/dtos/responses/packaging/index.js';

export class PackagingMapper {
  static toResponse(e: PackagingEntity): PackagingResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code,
      type: e.type.value,
      material: e.material.value,
      status: e.status.value,
      lengthCm: e.size.lengthCm,
      widthCm: e.size.widthCm,
      heightCm: e.size.heightCm,
      maxWeightKg: e.size.maxWeightKg,
      volumeM3: e.volumeM3,
      cost: e.cost,
      currency: e.currency,
      imageUrl: e.imageUrl,
      isFragile: e.isFragile,
      isTemperatureControlled: e.isTemperatureControlled,
      isRecyclable: e.isRecyclable,
      stock: e.stock,
      isDefault: e.isDefault,
      activatedAt: e.activatedAt,
      deactivatedAt: e.deactivatedAt,
      discontinuedAt: e.discontinuedAt,
      deactivateReason: e.deactivateReason,
      discontinueReason: e.discontinueReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: PackagingEntity): PackagingSummaryResponseDTO {
    return {
      id: e.id,
      name: e.name,
      code: e.code,
      type: e.type.value,
      status: e.status.value,
      dimensions: e.dimensions,
      maxWeightKg: e.size.maxWeightKg,
      stock: e.stock,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly PackagingEntity[],
    total: number,
    page: number,
    limit: number,
  ): PackagingListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  static toStatsResponse(stats: {
    total: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    totalStock: number;
    outOfStockCount: number;
    ecoFriendlyCount: number;
  }): PackagingStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
