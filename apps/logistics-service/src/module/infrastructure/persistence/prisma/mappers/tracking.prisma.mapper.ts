/**
 * TrackingPrismaMapper
 */
import { TrackingEntity } from '@domain/entities/tracking.entity';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo';
import { TrackingStatusVO } from '@domain/value-objects/primitives/tracking-status.vo';
import { TrackingSourceVO } from '@domain/value-objects/primitives/tracking-source.vo';

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export interface LogisticsTrackingRow {
  id: string; trackingNumber: string;
  shipmentId: string | null; orderId: string | null; courierCode: string | null;
  status: string; source: string;
  currentEvent: string | null; currentLocation: string | null;
  estimatedDeliveryAt: Date | null; expiresAt: Date | null;
  eventCount: number; lastUpdatedAt: Date;
  completedAt: Date | null; failedAt: Date | null; expiredAt: Date | null;
  failureReason: string | null; metadata: unknown;
  publicAccess: boolean; version: number;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

export class TrackingPrismaMapper {
  static toDomain(raw: LogisticsTrackingRow): TrackingEntity {
    return TrackingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        trackingNumber: TrackingNumberVO.reconstitute(raw.trackingNumber),
        shipmentId: raw.shipmentId ?? undefined,
        orderId: raw.orderId ?? undefined,
        courierCode: raw.courierCode ?? undefined,
        status: TrackingStatusVO.reconstitute(raw.status),
        source: TrackingSourceVO.reconstitute(raw.source),
        currentEvent: raw.currentEvent ?? undefined,
        currentLocation: raw.currentLocation ?? undefined,
        estimatedDeliveryAt: toIso(raw.estimatedDeliveryAt),
        expiresAt: toIso(raw.expiresAt),
        eventCount: raw.eventCount,
        lastUpdatedAt: new Date(raw.lastUpdatedAt).toISOString(),
        completedAt: toIso(raw.completedAt),
        failedAt: toIso(raw.failedAt),
        expiredAt: toIso(raw.expiredAt),
        failureReason: raw.failureReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }

  static toPersistence(entity: TrackingEntity): Record<string, unknown> {
    return {
      id: entity.id,
      trackingNumber: entity.trackingNumber.value,
      shipmentId: entity.shipmentId ?? null,
      orderId: entity.orderId ?? null,
      courierCode: entity.courierCode ?? null,
      status: entity.status.value,
      source: entity.source.value,
      currentEvent: entity.currentEvent ?? null,
      currentLocation: entity.currentLocation ?? null,
      estimatedDeliveryAt: entity.estimatedDeliveryAt ? new Date(entity.estimatedDeliveryAt) : null,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      eventCount: entity.eventCount,
      lastUpdatedAt: new Date(entity.lastUpdatedAt),
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      expiredAt: entity.expiredAt ? new Date(entity.expiredAt) : null,
      failureReason: entity.failureReason ?? null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
