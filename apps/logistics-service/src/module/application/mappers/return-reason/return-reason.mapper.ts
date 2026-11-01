import type { ReturnReasonEntity } from '@domain/entities/return-reason.entity';
import type {
  ReturnReasonResponseDTO,
  ReturnReasonSummaryResponseDTO,
  ReturnReasonListResponseDTO,
  ReturnReasonStatsResponseDTO,
} from '@application/dtos/responses/return-reason/index.js';

export class ReturnReasonMapper {
  static toResponse(e: ReturnReasonEntity): ReturnReasonResponseDTO {
    return {
      id: e.id,
      code: e.code,
      type: e.type.value,
      label: { en: e.label.en, bn: e.label.bn },
      description: e.description,
      requiresPhoto: e.requiresPhoto,
      autoApprove: e.autoApprove,
      isActive: e.isActive,
      priority: e.priority,
      deactivatedAt: e.deactivatedAt,
      deactivateReason: e.deactivateReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: ReturnReasonEntity): ReturnReasonSummaryResponseDTO {
    return {
      id: e.id,
      code: e.code,
      label: { en: e.label.en, bn: e.label.bn },
      isActive: e.isActive,
      priority: e.priority,
    };
  }
  static toListResponse(
    entities: readonly ReturnReasonEntity[],
    total: number,
    page: number,
    limit: number,
  ): ReturnReasonListResponseDTO {
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
    activeCount: number;
    byCategory: Readonly<Record<string, number>>;
  }): ReturnReasonStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
