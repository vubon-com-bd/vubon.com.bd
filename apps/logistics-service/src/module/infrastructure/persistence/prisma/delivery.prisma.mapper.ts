/**
 * DeliveryPrismaMapper — row ↔ domain entity
 * @module logistics-service/infrastructure/persistence/prisma
 *
 * Child: LogisticsDeliveryAttempt[] via `attempts` relation
 */
import { DeliveryEntity } from '../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../domain/value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo.js';
import { DeliveryStatusVO } from '../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryAttemptStatusVO } from '../../../domain/value-objects/primitives/delivery-attempt-status.vo.js';
import { AttemptNumberVO } from '../../../domain/value-objects/primitives/attempt-number.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { DeliveryAttemptVO } from '../../../domain/value-objects/composites/delivery-attempt.vo.js';
import { ProofOfDeliveryVO, type ProofType } from '../../../domain/value-objects/composites/proof-of-delivery.vo.js';
import { AddressVO } from '@vubon/shared-kernel/domain/primitives';
import type { Address, Phone } from '@vubon/shared-types/common';

export interface PrismaDeliveryAttemptRow {
  id: string; deliveryId: string; attemptNumber: number; status: string; reason: string | null;
  driverId: string | null; location: string | null; latitude: number | null; longitude: number | null;
  images: string[]; notes: string | null; attemptedAt: Date; createdAt: Date;
}

export interface PrismaDeliveryRow {
  id: string; shipmentId: string; orderId: string; userId: string | null;
  status: string; type: string;
  driverId: string | null; vehicleId: string | null; routeId: string | null;
  recipientName: string | null; recipientPhone: string | null;
  deliveryLine1: string; deliveryLine2: string | null; deliveryCity: string;
  deliveryState: string | null; deliveryDistrict: string | null; deliveryDivision: string | null;
  deliveryPostalCode: string | null; deliveryCountry: string; deliveryLandmark: string | null;
  latitude: number | null; longitude: number | null;
  scheduledAt: Date | null; pickedUpAt: Date | null; arrivedAt: Date | null;
  deliveredAt: Date | null; failedAt: Date | null; cancelledAt: Date | null;
  proofType: string | null; proofSignatureUrl: string | null; proofPhotoUrl: string | null;
  proofOtp: string | null; proofIdNumber: string | null; proofRecipientName: string | null;
  proofCapturedAt: Date | null;
  notes: string | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

export interface PrismaDeliveryRowWithAttempts extends PrismaDeliveryRow {
  attempts: PrismaDeliveryAttemptRow[];
}

const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class DeliveryPrismaMapper {
  static toDomain(raw: PrismaDeliveryRowWithAttempts): DeliveryEntity {
    const address = AddressDetailsVO.reconstitute({
      address: AddressVO.of({
        line1: raw.deliveryLine1,
        line2: raw.deliveryLine2 ?? undefined,
        city: raw.deliveryCity,
        state: raw.deliveryState ?? undefined,
        postalCode: raw.deliveryPostalCode ?? undefined,
        country: raw.deliveryCountry,
      } as Address),
      latitude: raw.latitude ?? undefined,
      longitude: raw.longitude ?? undefined,
    });

    const attempts = raw.attempts
      .slice()
      .sort((a, b) => a.attemptNumber - b.attemptNumber)
      .map((a) => DeliveryAttemptVO.reconstitute({
        id: a.id,
        attemptNumber: AttemptNumberVO.reconstitute(a.attemptNumber),
        status: DeliveryAttemptStatusVO.reconstitute(a.status),
        reason: a.reason ?? undefined,
        driverId: a.driverId ?? undefined,
        attemptedAt: new Date(a.attemptedAt).toISOString(),
        location: a.location ?? undefined,
        latitude: a.latitude ?? undefined,
        longitude: a.longitude ?? undefined,
        images: a.images,
        notes: a.notes ?? undefined,
      }));

    const proof = raw.proofType && raw.proofCapturedAt
      ? ProofOfDeliveryVO.reconstitute({
          type: raw.proofType as ProofType,
          signatureUrl: raw.proofSignatureUrl ?? undefined,
          photoUrl: raw.proofPhotoUrl ?? undefined,
          otp: raw.proofOtp ?? undefined,
          idNumber: raw.proofIdNumber ?? undefined,
          recipientName: raw.proofRecipientName ?? undefined,
          capturedAt: new Date(raw.proofCapturedAt).toISOString(),
        })
      : undefined;

    return DeliveryEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        shipmentId: ShipmentIdVO.reconstitute(raw.shipmentId),
        orderId: OrderIdVO.reconstitute(raw.orderId),
        userId: raw.userId ? UserIdVO.reconstitute(raw.userId) : undefined,
        status: DeliveryStatusVO.reconstitute(raw.status),
        type: DeliveryTypeVO.reconstitute(raw.type),
        driverId: raw.driverId ? DriverIdVO.reconstitute(raw.driverId) : undefined,
        vehicleId: raw.vehicleId ? VehicleIdVO.reconstitute(raw.vehicleId) : undefined,
        routeId: raw.routeId ? RouteIdVO.reconstitute(raw.routeId) : undefined,
        recipientName: raw.recipientName ?? undefined,
        recipientPhone: raw.recipientPhone ? (raw.recipientPhone as Phone) : undefined,
        deliveryAddress: address,
        scheduledAt: toIso(raw.scheduledAt),
        pickedUpAt: toIso(raw.pickedUpAt),
        arrivedAt: toIso(raw.arrivedAt),
        deliveredAt: toIso(raw.deliveredAt),
        failedAt: toIso(raw.failedAt),
        cancelledAt: toIso(raw.cancelledAt),
        attempts,
        proofOfDelivery: proof,
        notes: raw.notes ? NotesVO.reconstitute(raw.notes) : undefined,
      },
    });
  }

  static toPersistence(entity: DeliveryEntity): Record<string, unknown> {
    const addr = entity.deliveryAddress.toAddress();
    const proof = entity.proofOfDelivery;
    return {
      id: entity.id,
      shipmentId: entity.shipmentId.value,
      orderId: entity.orderId.value,
      userId: entity.userId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      driverId: entity.driverId?.value ?? null,
      vehicleId: entity.vehicleId?.value ?? null,
      routeId: entity.routeId?.value ?? null,
      recipientName: entity.recipientName ?? null,
      recipientPhone: entity.recipientPhone ?? null,
      deliveryLine1: addr.line1,
      deliveryLine2: addr.line2 ?? null,
      deliveryCity: addr.city,
      deliveryState: addr.state ?? null,
      deliveryDistrict: (addr as { district?: string }).district ?? null,
      deliveryDivision: (addr as { division?: string }).division ?? null,
      deliveryPostalCode: addr.postalCode ?? null,
      deliveryCountry: addr.country,
      deliveryLandmark: (addr as { landmark?: string }).landmark ?? null,
      latitude: entity.deliveryAddress.latitude ?? null,
      longitude: entity.deliveryAddress.longitude ?? null,
      scheduledAt: entity.scheduledAt ? new Date(entity.scheduledAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      arrivedAt: entity.arrivedAt ? new Date(entity.arrivedAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      proofType: proof?.type ?? null,
      proofSignatureUrl: proof?.signatureUrl ?? null,
      proofPhotoUrl: proof?.photoUrl ?? null,
      proofOtp: proof?.otp ?? null,
      proofIdNumber: proof?.idNumber ?? null,
      proofRecipientName: proof?.recipientName ?? null,
      proofCapturedAt: proof?.capturedAt ? new Date(proof.capturedAt) : null,
      notes: entity.notes?.value ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
      attempts: {
        create: entity.attempts.map((a) => ({
          attemptNumber: a.attemptNumber.value,
          status: a.status.value,
          reason: a.reason ?? null,
          driverId: a.driverId ?? null,
          location: a.location ?? null,
          latitude: a.latitude ?? null,
          longitude: a.longitude ?? null,
          images: [...a.images],
          notes: a.notes ?? null,
          attemptedAt: new Date(a.attemptedAt),
        })),
      },
    };
  }
}
