import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo';
import { ReturnShipmentStatusVO } from '@domain/value-objects/primitives/return-shipment-status.vo';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsReturnShipmentRow {
  id: string; rmaNumber: string; orderId: string; originalShipmentId: string | null;
  userId: string; status: string; type: string; reason: string; description: string | null;
  images: string[]; itemIds: string[]; pickupLine1: string; pickupLine2: string | null;
  pickupCity: string; pickupState: string | null; pickupDistrict: string | null;
  pickupDivision: string | null; pickupPostalCode: string | null; pickupCountry: string;
  pickupScheduledAt: Date | null; pickedUpAt: Date | null; receivedAt: Date | null;
  inspectedAt: Date | null; inspectedBy: string | null; restockable: boolean;
  refundAmount: unknown; refundCurrency: string | null; restockFeeAmount: unknown;
  trackingNumber: string | null; notes: string | null; version: number;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  approvedAt: Date | null; rejectedAt: Date | null; inTransitAt: Date | null;
  completedAt: Date | null; cancelledAt: Date | null; lostAt: Date | null;
  approveBy: string | null; rejectReason: string | null; cancelReason: string | null; metadata: unknown;
}

const composeAddress = (r: LogisticsReturnShipmentRow): string =>
  [r.pickupLine1, r.pickupLine2, r.pickupCity, r.pickupState, r.pickupDistrict, r.pickupDivision, r.pickupPostalCode, r.pickupCountry].filter(Boolean).join(', ');

const parseAddress = (address: string, defaultCountry = 'BD') => {
  const parts = address.split(',').map(s => s.trim()).filter(Boolean);
  return {
    line1: parts[0] ?? address, line2: parts[1] ?? null, city: parts[2] ?? 'Unknown',
    state: parts[3] ?? null, district: parts[4] ?? null,
    division: parts[5] ?? null, postal: null, country: defaultCountry,
  };
};

export class ReturnShipmentPrismaMapper {
  static toDomain(raw: LogisticsReturnShipmentRow): ReturnShipmentEntity {
    return ReturnShipmentEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        rmaNumber: raw.rmaNumber,
        orderId: raw.orderId, originalShipmentId: raw.originalShipmentId ?? undefined,
        userId: raw.userId,
        status: ReturnShipmentStatusVO.reconstitute(raw.status),
        type: ReturnShipmentTypeVO.reconstitute(raw.type),
        reason: ReturnReasonVO.reconstitute(raw.reason),
        description: raw.description ?? undefined, images: raw.images, itemIds: raw.itemIds,
        pickupAddress: composeAddress(raw),
        pickupScheduledAt: toIso(raw.pickupScheduledAt), pickedUpAt: toIso(raw.pickedUpAt),
        receivedAt: toIso(raw.receivedAt), inspectedAt: toIso(raw.inspectedAt),
        inspectedBy: raw.inspectedBy ?? undefined,
        completedAt: toIso(raw.completedAt), cancelledAt: toIso(raw.cancelledAt),
        rejectedAt: toIso(raw.rejectedAt), lostAt: toIso(raw.lostAt),
        restockable: raw.restockable, refundAmount: toNum(raw.refundAmount),
        refundCurrency: raw.refundCurrency ?? undefined,
        restockFeeAmount: toNum(raw.restockFeeAmount), trackingNumber: raw.trackingNumber ?? undefined,
        approveBy: raw.approveBy ?? undefined, rejectReason: raw.rejectReason ?? undefined,
        cancelReason: raw.cancelReason ?? undefined, notes: raw.notes ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: ReturnShipmentEntity): Record<string, unknown> {
    const addr = parseAddress(entity.pickupAddress);
    return {
      id: entity.id, rmaNumber: entity.rmaNumber, orderId: entity.orderId,
      originalShipmentId: entity.originalShipmentId ?? null, userId: entity.userId,
      status: entity.status.value, type: entity.type.value, reason: entity.reason.value,
      description: entity.description ?? null, images: entity.images ?? [],
      itemIds: entity.itemIds,
      pickupLine1: addr.line1, pickupLine2: addr.line2, pickupCity: addr.city,
      pickupState: addr.state, pickupDistrict: addr.district,
      pickupDivision: addr.division, pickupPostalCode: addr.postal, pickupCountry: addr.country,
      pickupScheduledAt: entity.pickupScheduledAt ? new Date(entity.pickupScheduledAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      receivedAt: entity.receivedAt ? new Date(entity.receivedAt) : null,
      inspectedAt: entity.inspectedAt ? new Date(entity.inspectedAt) : null,
      inspectedBy: entity.inspectedBy ?? null, restockable: entity.restockable,
      refundAmount: entity.refundAmount ?? null, refundCurrency: entity.refundCurrency ?? null,
      restockFeeAmount: entity.restockFeeAmount ?? null,
      trackingNumber: entity.trackingNumber ?? null, notes: entity.notes ?? null,
      approvedAt: entity.approveBy ? new Date() : null,
      rejectedAt: entity.rejectedAt ? new Date(entity.rejectedAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      lostAt: entity.lostAt ? new Date(entity.lostAt) : null,
      approveBy: entity.approveBy ?? null, rejectReason: entity.rejectReason ?? null,
      cancelReason: entity.cancelReason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
