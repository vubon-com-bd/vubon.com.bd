/**
 * DeliveryPrismaMapper
 */
import { DeliveryEntity } from '@domain/entities/delivery.entity';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo';
import { DeliveryWindowVO } from '@domain/value-objects/primitives/delivery-window.vo';

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export interface LogisticsDeliveryRow {
  id: string; shipmentId: string; orderId: string; userId: string | null;
  status: string; type: string;
  driverId: string | null; vehicleId: string | null; routeId: string | null;
  recipientName: string | null; recipientPhone: string | null;
  deliveryLine1: string; deliveryLine2: string | null; deliveryCity: string;
  deliveryState: string | null; deliveryDistrict: string | null;
  deliveryDivision: string | null; deliveryPostalCode: string | null;
  deliveryCountry: string; deliveryLandmark: string | null;
  latitude: number | null; longitude: number | null;
  scheduledAt: Date | null; pickedUpAt: Date | null;
  inTransitAt: Date | null; outForDeliveryAt: Date | null;
  arrivedAt: Date | null; deliveredAt: Date | null; failedAt: Date | null;
  cancelledAt: Date | null; refusedAt: Date | null; rescheduledAt: Date | null;
  attemptCount: number; failureReason: string | null;
  cancelReason: string | null; refusedReason: string | null;
  notes: string | null; metadata: unknown; window: unknown;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const composeAddress = (row: LogisticsDeliveryRow): string =>
  [row.deliveryLine1, row.deliveryLine2, row.deliveryCity, row.deliveryState,
   row.deliveryDistrict, row.deliveryDivision, row.deliveryPostalCode, row.deliveryCountry]
    .filter(Boolean).join(', ');

const parseAddress = (address: string, defaultCountry = 'BD') => {
  const parts = address.split(',').map(s => s.trim()).filter(Boolean);
  return {
    line1: parts[0] ?? address, line2: parts[1] ?? null, city: parts[2] ?? 'Unknown',
    state: parts[3] ?? null, district: parts[4] ?? null,
    division: parts[5] ?? null, postal: null, country: defaultCountry,
  };
};

export class DeliveryPrismaMapper {
  static toDomain(raw: LogisticsDeliveryRow): DeliveryEntity {
    return DeliveryEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        shipmentId: raw.shipmentId,
        orderId: raw.orderId,
        userId: raw.userId ?? undefined,
        status: DeliveryStatusVO.reconstitute(raw.status),
        type: DeliveryTypeVO.reconstitute(raw.type),
        window: raw.window ? DeliveryWindowVO.reconstitute(raw.window as { startAt: string; endAt: string }) : undefined,
        driverId: raw.driverId ?? undefined,
        vehicleId: raw.vehicleId ?? undefined,
        routeId: raw.routeId ?? undefined,
        recipientName: raw.recipientName ?? undefined,
        recipientPhone: raw.recipientPhone ?? undefined,
        deliveryAddress: composeAddress(raw),
        scheduledAt: toIso(raw.scheduledAt),
        pickedUpAt: toIso(raw.pickedUpAt),
        inTransitAt: toIso(raw.inTransitAt),
        outForDeliveryAt: toIso(raw.outForDeliveryAt),
        arrivedAt: toIso(raw.arrivedAt),
        deliveredAt: toIso(raw.deliveredAt),
        failedAt: toIso(raw.failedAt),
        cancelledAt: toIso(raw.cancelledAt),
        refusedAt: toIso(raw.refusedAt),
        rescheduledAt: toIso(raw.rescheduledAt),
        attemptCount: raw.attemptCount,
        failureReason: raw.failureReason ?? undefined,
        cancelReason: raw.cancelReason ?? undefined,
        refusedReason: raw.refusedReason ?? undefined,
        notes: raw.notes ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }

  static toPersistence(entity: DeliveryEntity): Record<string, unknown> {
    const addr = parseAddress(entity.deliveryAddress);
    return {
      id: entity.id,
      shipmentId: entity.shipmentId,
      orderId: entity.orderId,
      userId: entity.userId ?? null,
      status: entity.status.value,
      type: entity.type.value,
      driverId: entity.driverId ?? null,
      vehicleId: entity.vehicleId ?? null,
      routeId: entity.routeId ?? null,
      recipientName: entity.recipientName ?? null,
      recipientPhone: entity.recipientPhone ?? null,
      deliveryLine1: addr.line1,
      deliveryLine2: addr.line2,
      deliveryCity: addr.city,
      deliveryState: addr.state,
      deliveryDistrict: addr.district,
      deliveryDivision: addr.division,
      deliveryPostalCode: addr.postal,
      deliveryCountry: addr.country,
      scheduledAt: entity.scheduledAt ? new Date(entity.scheduledAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      inTransitAt: entity.inTransitAt ? new Date(entity.inTransitAt) : null,
      outForDeliveryAt: entity.outForDeliveryAt ? new Date(entity.outForDeliveryAt) : null,
      arrivedAt: entity.arrivedAt ? new Date(entity.arrivedAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      refusedAt: entity.refusedAt ? new Date(entity.refusedAt) : null,
      rescheduledAt: entity.rescheduledAt ? new Date(entity.rescheduledAt) : null,
      attemptCount: entity.attemptCount,
      failureReason: entity.failureReason ?? null,
      cancelReason: entity.cancelReason ?? null,
      refusedReason: entity.refusedReason ?? null,
      notes: entity.notes ?? null,
      metadata: entity.metadata ?? null,
      window: entity.window ? { startAt: entity.window.startAt, endAt: entity.window.endAt } : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
