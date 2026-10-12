/**
 * TrackingPrismaMapper — row ↔ domain entity
 * @module logistics-service/infrastructure/persistence/prisma
 *
 * Child: LogisticsTrackingEvent[] via `events` relation
 */
import { TrackingEntity } from '../../../domain/entities/tracking.entity.js';
import { TrackingIdVO } from '../../../domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingStatusVO } from '../../../domain/value-objects/primitives/tracking-status.vo.js';
import { TrackingEventVO } from '../../../domain/value-objects/primitives/tracking-event.vo.js';
import { TrackingSourceVO } from '../../../domain/value-objects/primitives/tracking-source.vo.js';
import { TrackingEventEntryVO } from '../../../domain/value-objects/composites/tracking-event-entry.vo.js';

export interface PrismaTrackingEventRow {
  id: string; trackingId: string; shipmentId: string | null; orderId: string | null;
  event: string; status: string; source: string; message: string;
  location: string | null; latitude: number | null; longitude: number | null;
  occurredAt: Date; receivedAt: Date; metadata: unknown; createdAt: Date;
}

export interface PrismaTrackingRow {
  id: string; trackingNumber: string; shipmentId: string | null; orderId: string | null;
  courierCode: string | null; status: string; currentLocation: string | null;
  estimatedDeliveryAt: Date | null; publicAccess: boolean; lastUpdatedAt: Date;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

export interface PrismaTrackingRowWithEvents extends PrismaTrackingRow {
  events: PrismaTrackingEventRow[];
}

const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class TrackingPrismaMapper {
  static toDomain(raw: PrismaTrackingRowWithEvents): TrackingEntity {
    const events = raw.events
      .slice()
      .sort((a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime())
      .map((e) => TrackingEventEntryVO.reconstitute({
        id: e.id,
        shipmentId: e.shipmentId ?? undefined,
        orderId: e.orderId ?? undefined,
        event: TrackingEventVO.reconstitute(e.event),
        status: TrackingStatusVO.reconstitute(e.status),
        source: TrackingSourceVO.reconstitute(e.source),
        message: e.message,
        location: e.location ?? undefined,
        latitude: e.latitude ?? undefined,
        longitude: e.longitude ?? undefined,
        occurredAt: new Date(e.occurredAt).toISOString(),
        receivedAt: new Date(e.receivedAt).toISOString(),
        metadata: (e.metadata as Readonly<Record<string, unknown>> | null) ?? undefined,
      }));

    return TrackingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        trackingNumber: TrackingNumberVO.reconstitute(raw.trackingNumber),
        shipmentId: raw.shipmentId ? ShipmentIdVO.reconstitute(raw.shipmentId) : undefined,
        orderId: raw.orderId ? OrderIdVO.reconstitute(raw.orderId) : undefined,
        courierCode: raw.courierCode ?? undefined,
        status: TrackingStatusVO.reconstitute(raw.status),
        currentLocation: raw.currentLocation ?? undefined,
        estimatedDeliveryAt: toIso(raw.estimatedDeliveryAt),
        events,
        publicAccess: raw.publicAccess,
        lastUpdatedAt: new Date(raw.lastUpdatedAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: TrackingEntity): Record<string, unknown> {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      shipmentId: entity.shipmentId?.value ?? null,
      orderId: entity.orderId?.value ?? null,
      courierCode: entity.courierCode ?? null,
      status: entity.status.value,
      currentLocation: entity.currentLocation ?? null,
      estimatedDeliveryAt: entity.estimatedDeliveryAt ? new Date(entity.estimatedDeliveryAt) : null,
      publicAccess: entity.publicAccess,
      lastUpdatedAt: new Date(entity.lastUpdatedAt),
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
      events: {
        create: entity.events.map((e) => ({
          shipmentId: e.shipmentId ?? null,
          orderId: e.orderId ?? null,
          event: e.event.value,
          status: e.status.value,
          source: e.source.value,
          message: e.message,
          location: e.location ?? null,
          latitude: e.latitude ?? null,
          longitude: e.longitude ?? null,
          occurredAt: new Date(e.occurredAt),
          receivedAt: new Date(e.receivedAt),
          metadata: (e.metadata as never) ?? null,
        })),
      },
    };
  }
}
