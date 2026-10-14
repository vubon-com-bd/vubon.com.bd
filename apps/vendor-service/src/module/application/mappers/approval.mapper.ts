/**
 * ApprovalMapper
 * @module vendor-service/application/mappers
 */
import type { VendorApprovalEntity } from '../../domain/entities/vendor-approval.entity.js';
import type { ApprovalResponseDTO } from '../dtos/responses/approval-response.dto.js';

export class ApprovalMapper {
  static toResponse(entity: VendorApprovalEntity): ApprovalResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      status: entity.status.value,
      reason: entity.reason?.value,
      notes: entity.notes,
      requestedAt: entity.requestedAt,
      decidedAt: entity.decidedAt,
      decidedBy: entity.decidedBy,
      score: entity.score,
      resubmissionCount: entity.resubmissionCount,
      appealDeadline: entity.appealDeadline,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
