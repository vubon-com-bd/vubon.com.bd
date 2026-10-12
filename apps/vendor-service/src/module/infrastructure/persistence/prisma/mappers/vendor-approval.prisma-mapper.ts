/**
 * VendorApprovalPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorApproval as PrismaVendorApproval } from '@prisma/client';
import { VendorApprovalEntity } from '../../../../domain/entities/vendor-approval.entity.js';
import { ApprovalStatusVO } from '../../../../domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../domain/value-objects/primitives/approval-reason.vo.js';

export class VendorApprovalPrismaMapper {
  static toDomain(row: PrismaVendorApproval): VendorApprovalEntity {
    return VendorApprovalEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        status: ApprovalStatusVO.create(row.status),
        reason: row.reason ? ApprovalReasonVO.create(row.reason) : undefined,
        reviewerNote: row.reviewerNote ?? undefined,
        submittedAt: row.submittedAt.toISOString(),
        reviewedAt: row.reviewedAt?.toISOString(),
        reviewedBy: row.reviewedBy ?? undefined,
        resubmissionCount: row.resubmissionCount,
        appealDeadline: row.appealDeadline?.toISOString(),
        appealSubmittedAt: row.appealSubmittedAt?.toISOString(),
        slaDeadline: row.slaDeadline?.toISOString(),
      },
    });
  }

  static toPersistence(entity: VendorApprovalEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      status: entity.status.value,
      reason: entity.reason?.value,
      reviewerNote: entity.reviewerNote,
      submittedAt: new Date(entity.submittedAt),
      reviewedAt: entity.reviewedAt ? new Date(entity.reviewedAt) : null,
      reviewedBy: entity.reviewedBy,
      resubmissionCount: entity.resubmissionCount,
      appealDeadline: entity.appealDeadline ? new Date(entity.appealDeadline) : null,
      appealSubmittedAt: entity.appealSubmittedAt ? new Date(entity.appealSubmittedAt) : null,
      slaDeadline: entity.slaDeadline ? new Date(entity.slaDeadline) : null,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
