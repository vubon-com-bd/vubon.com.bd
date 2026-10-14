/**
 * VendorApprovalPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorApprovalEntity } from '../../../../domain/entities/vendor-approval.entity.js';
import { VendorApprovalVO } from '../../../../domain/value-objects/composites/vendor-approval.vo.js';
import { ApprovalIdVO } from '../../../../domain/value-objects/primitives/approval-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ApprovalStatusVO } from '../../../../domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../domain/value-objects/primitives/approval-reason.vo.js';

export interface VendorApprovalPrismaRow {
  id: string;
  vendorId: string;
  status: string;
  reason: string | null;
  reviewerNote: string | null;
  submittedAt: Date;
  reviewedAt: Date | null;
  reviewedBy: string | null;
  resubmissionCount: number;
  appealDeadline: Date | null;
  appealSubmittedAt: Date | null;
  slaDeadline: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorApprovalPrismaMapper {
  static toDomain(raw: VendorApprovalPrismaRow): VendorApprovalEntity {
    const vo = VendorApprovalVO.reconstitute({
      id: ApprovalIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      status: ApprovalStatusVO.reconstitute(raw.status),
      reason: raw.reason ? ApprovalReasonVO.reconstitute(raw.reason) : undefined,
      notes: raw.reviewerNote ?? undefined,
      requestedAt: new Date(raw.submittedAt).toISOString(),
      decidedAt: toIso(raw.reviewedAt),
      decidedBy: raw.reviewedBy ?? undefined,
      score: undefined,
      resubmissionCount: raw.resubmissionCount,
      appealDeadline: toIso(raw.appealDeadline),
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorApprovalEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorApprovalEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      status: vo.status.value,
      reason: vo.reason?.value ?? null,
      reviewerNote: vo.notes ?? null,
      submittedAt: new Date(vo.requestedAt),
      reviewedAt: vo.decidedAt ? new Date(vo.decidedAt) : null,
      reviewedBy: vo.decidedBy ?? null,
      resubmissionCount: vo.resubmissionCount,
      appealDeadline: vo.appealDeadline ? new Date(vo.appealDeadline) : null,

      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
