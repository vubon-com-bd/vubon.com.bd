/**
 * SuspensionMapper
 * @module vendor-service/application/mappers
 */
import type { VendorSuspensionEntity } from '../../domain/entities/vendor-suspension.entity.js';
import type {
  SuspensionResponseDTO,
  SuspensionListResponseDTO,
} from '../dtos/responses/suspension-response.dto.js';

export class SuspensionMapper {
  static toResponse(entity: VendorSuspensionEntity): SuspensionResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      reason: entity.reason.value,
      description: entity.description,
      suspendedAt: entity.suspendedAt,
      suspendedBy: entity.suspendedBy,
      durationDays: entity.durationDays,
      liftedAt: entity.liftedAt,
      liftedBy: entity.liftedBy,
      liftReason: entity.liftReason,
      appealDeadline: entity.appealDeadline,
      expectedLiftDate: entity.expectedLiftDate,
      daysRemaining: entity.daysRemaining,
      canAppeal: entity.canAppeal(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly VendorSuspensionEntity[],
    total: number,
    page: number,
    limit: number,
  ): SuspensionListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / Math.max(1, limit)),
    };
  }
}
