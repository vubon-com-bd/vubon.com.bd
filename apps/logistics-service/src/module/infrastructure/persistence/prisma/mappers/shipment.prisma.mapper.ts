/**
 * ShipmentPrismaMapper — Row ↔ Domain Entity
 * @module logistics-service/infrastructure/persistence/prisma/mappers
 */
import { ShipmentEntity } from '@domain/entities/shipment.entity';
import { ShipmentNumberVO } from '@domain/value-objects/primitives/shipment-number.vo';
import { ShipmentStatusVO } from '@domain/value-objects/primitives/shipment-status.vo';
import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo';
import { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo';

// ⚠️ Prisma Decimal → number (handles Prisma.Decimal, string, number)
const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && v !== null && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

// ⚠️ Prisma Date → ISO string
const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

// ⚠️ Compose address components → single string
const composeAddress = (line1: string, line2: string | null, city: string, state: string | null, district: string | null, division: string | null, postal: string | null, country: string): string => {
  return [line1, line2, city, state, district, division, postal, country].filter(Boolean).join(', ');
};

// ⚠️ Parse address string → Prisma components (best-effort)
const parseAddressToComponents = (address: string, defaultCountry = 'BD'): {
  line1: string; line2: string | null; city: string; state: string | null;
  district: string | null; division: string | null; postal: string | null; country: string;
} => {
  const parts = address.split(',').map((s) => s.trim()).filter(Boolean);
  return {
    line1: parts[0] ?? address,
    line2: parts[1] ?? null,
    city: parts[2] ?? 'Unknown',
    state: parts[3] ?? null,
    district: parts[4] ?? null,
    division: parts[5] ?? null,
    postal: null,
    country: defaultCountry,
  };
};

export interface LogisticsShipmentRow {
  id: string;
  trackingNumber: string;
  shipmentNumber: string;
  orderId: string;
  userId: string | null;
  vendorId: string | null;
  warehouseId: string | null;
  courierId: string | null;
  courierTrackingNumber: string | null;
  type: string;
  priority: string;
  status: string;
  shippingLine1: string;
  shippingLine2: string | null;
  shippingCity: string;
  shippingState: string | null;
  shippingDistrict: string | null;
  shippingDivision: string | null;
  shippingPostalCode: string | null;
  shippingCountry: string;
  shippingLandmark: string | null;
  shippingLatitude: number | null;
  shippingLongitude: number | null;
  pickupLine1: string | null;
  pickupLine2: string | null;
  pickupCity: string | null;
  pickupState: string | null;
  pickupDistrict: string | null;
  pickupDivision: string | null;
  pickupPostalCode: string | null;
  pickupCountry: string | null;
  pickupLandmark: string | null;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  actualWeightKg: unknown;
  volumetricWeightKg: unknown;
  lengthCm: unknown;
  widthCm: unknown;
  heightCm: unknown;
  itemCount: number;
  isCOD: boolean;
  codAmount: unknown;
  isInsured: boolean;
  declaredValue: unknown;
  shippingCost: unknown;
  currency: string;
  labelUrl: string | null;
  estimatedDeliveryAt: Date | null;
  pickedUpAt: Date | null;
  deliveredAt: Date | null;
  returnedAt: Date | null;
  cancelledAt: Date | null;
  failureReason: string | null;
  notes: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  idempotencyKey: string | null;
  confirmedAt: Date | null;
  processingStartedAt: Date | null;
  packedAt: Date | null;
  inTransitAt: Date | null;
  outForDeliveryAt: Date | null;
  failedAt: Date | null;
  onHoldAt: Date | null;
  delayedAt: Date | null;
  cancelledBy: string | null;
  cancelReason: string | null;
  holdReason: string | null;
  delayReason: string | null;
  metadata: unknown;
  deletedAt: Date | null;
}

export class ShipmentPrismaMapper {
  static toDomain(raw: LogisticsShipmentRow): ShipmentEntity {
    const shippingAddress = composeAddress(
      raw.shippingLine1, raw.shippingLine2, raw.shippingCity,
      raw.shippingState, raw.shippingDistrict, raw.shippingDivision,
      raw.shippingPostalCode, raw.shippingCountry,
    );

    const pickupAddress = raw.pickupLine1
      ? composeAddress(
          raw.pickupLine1, raw.pickupLine2, raw.pickupCity ?? '',
          raw.pickupState, raw.pickupDistrict, raw.pickupDivision,
          raw.pickupPostalCode, raw.pickupCountry ?? 'BD',
        )
      : undefined;

    return ShipmentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        shipmentNumber: ShipmentNumberVO.reconstitute(raw.shipmentNumber),
        trackingNumber: raw.trackingNumber,
        status: ShipmentStatusVO.reconstitute(raw.status),
        type: ShipmentTypeVO.reconstitute(raw.type),
        priority: ShipmentPriorityVO.reconstitute(raw.priority),
        orderId: raw.orderId,
        userId: raw.userId ?? undefined,
        vendorId: raw.vendorId ?? undefined,
        warehouseId: raw.warehouseId ?? undefined,
        courierId: raw.courierId ?? undefined,
        courierTrackingNumber: raw.courierTrackingNumber ?? undefined,
        shippingAddress,
        pickupAddress,
        itemCount: raw.itemCount,
        totalWeightKg: toNum(raw.actualWeightKg),
        totalVolumeM3: toNum(raw.volumetricWeightKg),
        declaredValue: toNum(raw.declaredValue),
        currency: raw.currency,
        shippingCost: toNum(raw.shippingCost),
        codAmount: toNum(raw.codAmount),
        isCOD: raw.isCOD,
        isInsured: raw.isInsured,
        labelUrl: raw.labelUrl ?? undefined,
        estimatedDeliveryAt: toIso(raw.estimatedDeliveryAt),
        confirmedAt: toIso(raw.confirmedAt),
        processingStartedAt: toIso(raw.processingStartedAt),
        packedAt: toIso(raw.packedAt),
        pickedUpAt: toIso(raw.pickedUpAt),
        inTransitAt: toIso(raw.inTransitAt),
        outForDeliveryAt: toIso(raw.outForDeliveryAt),
        deliveredAt: toIso(raw.deliveredAt),
        failedAt: toIso(raw.failedAt),
        returnedAt: toIso(raw.returnedAt),
        cancelledAt: toIso(raw.cancelledAt),
        onHoldAt: toIso(raw.onHoldAt),
        delayedAt: toIso(raw.delayedAt),
        cancelledBy: raw.cancelledBy ?? undefined,
        failureReason: raw.failureReason ?? undefined,
        cancelReason: raw.cancelReason ?? undefined,
        holdReason: raw.holdReason ?? undefined,
        delayReason: raw.delayReason ?? undefined,
        notes: raw.notes ?? undefined,
        idempotencyKey: raw.idempotencyKey
          ? IdempotencyKeyVO.reconstitute(raw.idempotencyKey)
          : undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }

  static toPersistence(entity: ShipmentEntity): Record<string, unknown> {
    const shipping = parseAddressToComponents(entity.shippingAddress);
    const pickup = entity.pickupAddress
      ? parseAddressToComponents(entity.pickupAddress)
      : null;

    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber,
      shipmentNumber: entity.shipmentNumber.value,
      orderId: entity.orderId ?? null,
      userId: entity.userId ?? null,
      vendorId: entity.vendorId ?? null,
      warehouseId: entity.warehouseId ?? null,
      courierId: entity.courierId ?? null,
      courierTrackingNumber: entity.courierTrackingNumber ?? null,
      type: entity.type.value,
      priority: entity.priority.value,
      status: entity.status.value,
      shippingLine1: shipping.line1,
      shippingLine2: shipping.line2,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingDistrict: shipping.district,
      shippingDivision: shipping.division,
      shippingPostalCode: shipping.postal,
      shippingCountry: shipping.country,
      pickupLine1: pickup?.line1 ?? null,
      pickupLine2: pickup?.line2 ?? null,
      pickupCity: pickup?.city ?? null,
      pickupState: pickup?.state ?? null,
      pickupDistrict: pickup?.district ?? null,
      pickupDivision: pickup?.division ?? null,
      pickupPostalCode: pickup?.postal ?? null,
      pickupCountry: pickup?.country ?? null,
      actualWeightKg: entity.totalWeightKg ?? 0,
      volumetricWeightKg: entity.totalVolumeM3 ?? null,
      itemCount: entity.itemCount,
      isCOD: entity.isCOD,
      codAmount: entity.codAmount ?? null,
      isInsured: entity.isInsured,
      declaredValue: entity.declaredValue ?? null,
      shippingCost: entity.shippingCost ?? null,
      currency: entity.currency ?? 'BDT',
      labelUrl: entity.labelUrl ?? null,
      estimatedDeliveryAt: entity.estimatedDeliveryAt ? new Date(entity.estimatedDeliveryAt) : null,
      confirmedAt: entity.confirmedAt ? new Date(entity.confirmedAt) : null,
      processingStartedAt: entity.processingStartedAt ? new Date(entity.processingStartedAt) : null,
      packedAt: entity.packedAt ? new Date(entity.packedAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      inTransitAt: entity.inTransitAt ? new Date(entity.inTransitAt) : null,
      outForDeliveryAt: entity.outForDeliveryAt ? new Date(entity.outForDeliveryAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      returnedAt: entity.returnedAt ? new Date(entity.returnedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      onHoldAt: entity.onHoldAt ? new Date(entity.onHoldAt) : null,
      delayedAt: entity.delayedAt ? new Date(entity.delayedAt) : null,
      cancelledBy: entity.cancelledBy ?? null,
      failureReason: entity.failureReason ?? null,
      cancelReason: entity.cancelReason ?? null,
      holdReason: entity.holdReason ?? null,
      delayReason: entity.delayReason ?? null,
      notes: entity.notes ?? null,
      idempotencyKey: entity.idempotencyKey?.value ?? null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
