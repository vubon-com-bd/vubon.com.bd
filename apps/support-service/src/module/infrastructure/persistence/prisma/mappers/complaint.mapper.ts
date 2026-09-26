/**
 * ComplaintMapper
 * @module support-service/infrastructure/persistence/prisma/mappers
 */
import { Injectable } from '@nestjs/common';
import type { Complaint as PrismaComplaint } from '@prisma/client';
import { ComplaintEntity } from '../../../../domain/entities/complaint.entity';

@Injectable()
export class ComplaintMapper {
  toDomain(raw: PrismaComplaint): ComplaintEntity {
    return ComplaintEntity.rehydrate({
      id: raw.id,
      type: raw.type,
      severity: raw.severity,
      status: raw.status,
      userId: raw.userId,
      description: raw.description,
      orderId: raw.orderId ?? undefined,
      vendorId: raw.vendorId ?? undefined,
      resolverId: raw.resolverId ?? undefined,
      resolvedAt: raw.resolvedAt?.toISOString(),
      resolution: raw.resolution ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
    });
  }

  toPersistence(entity: ComplaintEntity): {
    readonly id: string;
    readonly type: string;
    readonly severity: string;
    readonly status: string;
    readonly userId: string;
    readonly description: string;
    readonly orderId: string | null;
    readonly vendorId: string | null;
    readonly productId: string | null;
    readonly resolverId: string | null;
    readonly resolvedAt: Date | null;
    readonly resolution: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } {
    const snap = entity.toSnapshot();
    return {
      id: snap.id,
      type: snap.type,
      severity: snap.severity,
      status: snap.status,
      userId: snap.userId,
      description: snap.description,
      orderId: snap.orderId ?? null,
      vendorId: snap.vendorId ?? null,
      productId: null,
      resolverId: snap.resolverId ?? null,
      resolvedAt: snap.resolvedAt ? new Date(snap.resolvedAt) : null,
      resolution: snap.resolution ?? null,
      createdAt: new Date(snap.createdAt),
      updatedAt: new Date(snap.updatedAt),
    };
  }
}
