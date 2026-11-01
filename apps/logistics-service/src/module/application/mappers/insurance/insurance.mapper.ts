import type { InsuranceEntity } from '@domain/entities/insurance.entity';
import type {
  InsuranceResponseDTO,
  InsuranceSummaryResponseDTO,
  InsuranceListResponseDTO,
  InsuranceStatsResponseDTO,
} from '@application/dtos/responses/insurance/index.js';

export class InsuranceMapper {
  static toResponse(e: InsuranceEntity): InsuranceResponseDTO {
    return {
      id: e.id,
      policyNumber: e.policyNumber,
      shipmentId: e.shipmentId,
      orderId: e.orderId,
      userId: e.userId,
      status: e.status.value,
      type: e.type.value,
      coverages: e.coverages.value,
      declaredValue: e.declaredValue,
      premium: e.premium,
      currency: e.currency,
      startsAt: e.startsAt,
      expiresAt: e.expiresAt,
      isClaimed: e.isClaimed,
      provider: e.provider,
      notes: e.notes,
      claims: e.claims.map((c) => ({
        id: c.id,
        claimNumber: c.claimNumber,
        status: c.status,
        reason: c.reason,
        description: c.description,
        images: c.images,
        amount: c.amount,
        approvedAmount: c.approvedAmount,
        submittedAt: c.submittedAt,
        reviewedAt: c.reviewedAt,
        approvedAt: c.approvedAt,
        rejectedAt: c.rejectedAt,
        rejectionReason: c.rejectionReason,
        paidAt: c.paidAt,
      })),
      activatedAt: e.activatedAt,
      expiredAt: e.expiredAt,
      cancelledAt: e.cancelledAt,
      cancelReason: e.cancelReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: InsuranceEntity): InsuranceSummaryResponseDTO {
    return {
      id: e.id,
      policyNumber: e.policyNumber,
      status: e.status.value,
      type: e.type.value,
      declaredValue: e.declaredValue,
      premium: e.premium,
      currency: e.currency,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly InsuranceEntity[],
    total: number,
    page: number,
    limit: number,
  ): InsuranceListResponseDTO {
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
    totalInsured: number;
    totalPremium: number;
    currency: string;
    claimCount: number;
    claimRate: number;
  }): InsuranceStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
