/**
 * VendorPayoutPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorPayout as PrismaVendorPayout } from '@prisma/client';
import { VendorPayoutEntity } from '../../../../domain/entities/vendor-payout.entity.js';
import { PayoutStatusVO } from '../../../../domain/value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../../../../domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo.js';
import { CommissionAmountVO } from '../../../../domain/value-objects/primitives/commission-amount.vo.js';

export class VendorPayoutPrismaMapper {
  static toDomain(row: PrismaVendorPayout): VendorPayoutEntity {
    return VendorPayoutEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        payoutNumber: row.payoutNumber,
        status: PayoutStatusVO.create(row.status),
        method: PayoutMethodVO.create(row.method),
        cycle: PayoutCycleVO.create(row.cycle),
        amount: PayoutAmountVO.create(Number(row.amount), row.currency),
        fee: CommissionAmountVO.create(Number(row.fee), row.currency),
        netAmount: PayoutAmountVO.create(Number(row.netAmount), row.currency),
        periodStart: row.periodStart.toISOString(),
        periodEnd: row.periodEnd.toISOString(),
        bankAccountId: row.bankAccountId ?? undefined,
        transactionId: row.transactionId ?? undefined,
        reference: row.reference ?? undefined,
        notes: row.notes ?? undefined,
        requestedAt: row.requestedAt.toISOString(),
        approvedAt: row.approvedAt?.toISOString(),
        approvedBy: row.approvedBy ?? undefined,
        paidAt: row.paidAt?.toISOString(),
        failedAt: row.failedAt?.toISOString(),
        failureReason: row.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorPayoutEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      payoutNumber: entity.payoutNumber,
      status: entity.status.value,
      method: entity.method.value,
      cycle: entity.cycle.value,
      amount: entity.amount.amount,
      fee: entity.fee.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.amount.currency,
      periodStart: new Date(entity.periodStart),
      periodEnd: new Date(entity.periodEnd),
      bankAccountId: entity.bankAccountId,
      transactionId: entity.transactionId,
      reference: entity.reference,
      notes: entity.notes,
      requestedAt: new Date(entity.requestedAt),
      approvedAt: entity.approvedAt ? new Date(entity.approvedAt) : null,
      paidAt: entity.paidAt ? new Date(entity.paidAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      failureReason: entity.failureReason,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
