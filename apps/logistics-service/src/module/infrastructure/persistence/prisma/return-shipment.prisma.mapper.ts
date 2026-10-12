import { ReturnShipmentEntity } from '../../../domain/entities/return-shipment.entity.js';
import { ReturnShipmentIdVO } from '../../../domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '../../../domain/value-objects/primitives/rma-number.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { ReturnShipmentStatusVO } from '../../../domain/value-objects/primitives/return-shipment-status.vo.js';
import { ReturnShipmentTypeVO } from '../../../domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '../../../domain/value-objects/primitives/return-reason.vo.js';
import { RefundAmountVO } from '../../../domain/value-objects/primitives/refund-amount.vo.js';
import { DescriptionTextVO } from '../../../domain/value-objects/primitives/description-text.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { AddressVO } from '@vubon/shared-kernel/domain/primitives';
import type { Address } from '@vubon/shared-types/common';

export interface PrismaReturnShipmentRow {
  id: string; rmaNumber: string; orderId: string; originalShipmentId: string | null;
  userId: string; status: string; type: string; reason: string; description: string | null;
  images: string[]; itemIds: string[];
  pickupLine1: string; pickupLine2: string | null; pickupCity: string;
  pickupState: string | null; pickupDistrict: string | null; pickupDivision: string | null;
  pickupPostalCode: string | null; pickupCountry: string;
  pickupScheduledAt: Date | null; pickedUpAt: Date | null; receivedAt: Date | null;
  inspectedAt: Date | null; inspectedBy: string | null; restockable: boolean;
  refundAmount: unknown; refundCurrency: string | null; restockFeeAmount: unknown;
  trackingNumber: string | null; notes: string | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};
const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class ReturnShipmentPrismaMapper {
  static toDomain(raw: PrismaReturnShipmentRow): ReturnShipmentEntity {
    const address = AddressDetailsVO.reconstitute({
      address: AddressVO.of({
        line1: raw.pickupLine1, line2: raw.pickupLine2 ?? undefined,
        city: raw.pickupCity, state: raw.pickupState ?? undefined,
        postalCode: raw.pickupPostalCode ?? undefined, country: raw.pickupCountry,
      } as Address),
    });

    return ReturnShipmentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        rmaNumber: RmaNumberVO.reconstitute(raw.rmaNumber),
        orderId: OrderIdVO.reconstitute(raw.orderId),
        originalShipmentId: raw.originalShipmentId ? ShipmentIdVO.reconstitute(raw.originalShipmentId) : undefined,
        userId: UserIdVO.reconstitute(raw.userId),
        status: ReturnShipmentStatusVO.reconstitute(raw.status),
        type: ReturnShipmentTypeVO.reconstitute(raw.type),
        reason: ReturnReasonVO.reconstitute(raw.reason),
        description: raw.description ? DescriptionTextVO.reconstitute(raw.description) : undefined,
        images: raw.images, itemIds: raw.itemIds,
        pickupAddress: address,
        pickupScheduledAt: toIso(raw.pickupScheduledAt),
        pickedUpAt: toIso(raw.pickedUpAt),
        receivedAt: toIso(raw.receivedAt),
        inspectedAt: toIso(raw.inspectedAt),
        inspectedBy: raw.inspectedBy ? UserIdVO.reconstitute(raw.inspectedBy) : undefined,
        restockable: raw.restockable,
        refundAmount: raw.refundAmount !== null && raw.refundCurrency
          ? RefundAmountVO.reconstitute(toNum(raw.refundAmount), raw.refundCurrency)
          : undefined,
        restockFeeAmount: raw.restockFeeAmount !== null ? toNum(raw.restockFeeAmount) : undefined,
        trackingNumber: raw.trackingNumber ?? undefined,
        notes: raw.notes ? NotesVO.reconstitute(raw.notes) : undefined,
      },
    });
  }

  static toPersistence(entity: ReturnShipmentEntity): Record<string, unknown> {
    const addr = entity.pickupAddress.toAddress();
    return {
      id: entity.id,
      rmaNumber: entity.rmaNumber.value,
      orderId: entity.orderId.value,
      originalShipmentId: entity.originalShipmentId?.value ?? null,
      userId: entity.userId.value,
      status: entity.status.value,
      type: entity.type.value,
      reason: entity.reason.value,
      description: entity.description?.value ?? null,
      images: [...entity.images], itemIds: [...entity.itemIds],
      pickupLine1: addr.line1, pickupLine2: addr.line2 ?? null,
      pickupCity: addr.city, pickupState: addr.state ?? null,
      pickupDistrict: (addr as { district?: string }).district ?? null,
      pickupDivision: (addr as { division?: string }).division ?? null,
      pickupPostalCode: addr.postalCode ?? null,
      pickupCountry: addr.country,
      pickupScheduledAt: entity.pickupScheduledAt ? new Date(entity.pickupScheduledAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      receivedAt: entity.receivedAt ? new Date(entity.receivedAt) : null,
      inspectedAt: entity.inspectedAt ? new Date(entity.inspectedAt) : null,
      inspectedBy: entity.inspectedBy?.value ?? null,
      restockable: entity.restockable,
      refundAmount: entity.refundAmount?.amount ?? null,
      refundCurrency: entity.refundAmount?.currency ?? null,
      restockFeeAmount: entity.restockFeeAmount ?? null,
      trackingNumber: entity.trackingNumber ?? null,
      notes: entity.notes?.value ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
