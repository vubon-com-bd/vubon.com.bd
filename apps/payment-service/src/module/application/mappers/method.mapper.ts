/**
 * MethodMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import type {
  MethodResponseDTO,
  MethodSummaryResponseDTO,
  MethodListResponseDTO,
} from '@application/dtos/responses/method-response.dto';

export class MethodMapper {
  static toResponse(e: PaymentMethodEntity): MethodResponseDTO {
    return {
      id: e.id,
      method: e.type.method,
      type: e.type.type,
      gateway: e.provider?.provider,
      label: e.label,
      isActive: e.isActive,
      isDefault: false,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toSummary(e: PaymentMethodEntity): MethodSummaryResponseDTO {
    return {
      id: e.id,
      method: e.type.method,
      type: e.type.type,
      label: e.label,
      isActive: e.isActive,
      isDefault: false,
    };
  }

  static toListResponse(
    entities: readonly PaymentMethodEntity[],
    total: number,
    page: number,
    limit: number,
  ): MethodListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
