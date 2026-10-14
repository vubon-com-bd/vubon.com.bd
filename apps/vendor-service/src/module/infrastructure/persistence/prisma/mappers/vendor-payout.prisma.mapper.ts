/**
 * VendorPayoutPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorPayoutEntity } from '../../../../domain/entities/vendor-payout.entity.js';
import { VendorPayoutVO, type PayoutMethodValue } from '../../../../domain/value-objects/composites/vendor-payout.vo.js';
import { PayoutIdVO } from '../../../../domain/value-objects/primitives/payout-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { BankAccountIdVO } from '../../../../domain/value-objects/primitives/bank-account-id.vo.js';
import { PayoutAmountVO } from '../../../../domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutStatusVO } from '../../../../domain/value-objects/primitives/payout-status.vo.js';

export interface VendorPayoutPrismaRow {
  id: string;
  vendorId: string;
  payoutNumber: string;
  status: string;
  method: string;
  cycle: string;
  amount: unknown;
  fee: unknown;
  netAmount: unknown;
  currency: string;
  periodStart: Date;
  periodEnd: Date;
  bankAccountId: string | null;
  transactionId: string | null;
  reference: string | null;
  notes: string | null;
  requestedAt: Date;
  approvedAt: Date | null;
  approvedBy: string | null;
  paidAt: Date | null;
  failedAt: Date | null;
  failureReason: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorPayoutPrismaMapper {
  static toDomain(raw: VendorPayoutPrismaRow): VendorPayoutEntity {
    const vo = VendorPayoutVO.reconstitute({
      id: PayoutIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      bankAccountId: BankAccountIdVO.reconstitute(raw.bankAccountId ?? raw.id),
      amount: PayoutAmountVO.reconstitute(toNum(raw.amount)),
      fee: toNum(raw.fee),
      netAmount: toNum(raw.netAmount),
      currency: raw.currency,
      method: raw.method as PayoutMethodValue,
      status: PayoutStatusVO.reconstitute(raw.status),
      requestedAt: new Date(raw.requestedAt).toISOString(),
      processedAt: toIso(raw.approvedAt),
      paidAt: toIso(raw.paidAt),
      completedBy: raw.approvedBy ?? undefined,
      transactionId: raw.transactionId ?? undefined,
      rejectionReason: raw.status === 'rejected' ? raw.failureReason ?? undefined : undefined,
      failureReason: raw.status === 'failed' ? raw.failureReason ?? undefined : undefined,
      notes: raw.notes ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorPayoutEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorPayoutEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      payoutNumber: `PO-${entity.id.slice(0, 8).toUpperCase()}`,
      status: vo.status.value,
      method: vo.method,
      cycle: 'weekly',
      amount: vo.amount.amount,
      fee: vo.fee,
      netAmount: vo.netAmount,
      currency: vo.currency,
      periodStart: new Date(vo.requestedAt),
      periodEnd: new Date(vo.requestedAt),
      bankAccountId: vo.bankAccountId.value,
      transactionId: vo.transactionId ?? null,
      reference: null,
      notes: vo.notes ?? null,
      requestedAt: new Date(vo.requestedAt),
      approvedAt: vo.processedAt ? new Date(vo.processedAt) : null,
      approvedBy: vo.completedBy ?? null,
      paidAt: vo.paidAt ? new Date(vo.paidAt) : null,
      failedAt: vo.status.isFailed() ? new Date(entity.updatedAt) : null,
      failureReason: vo.failureReason ?? vo.rejectionReason ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
