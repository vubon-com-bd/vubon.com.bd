import { FulfillmentEntity } from '@domain/entities/fulfillment.entity';
import { FulfillmentStatusVO } from '@domain/value-objects/primitives/fulfillment-status.vo';
import { FulfillmentTypeVO } from '@domain/value-objects/primitives/fulfillment-type.vo';
import { FulfillmentPriorityVO } from '@domain/value-objects/primitives/fulfillment-priority.vo';

const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsFulfillmentRow {
  id: string; orderId: string; vendorId: string | null; warehouseId: string | null;
  status: string; type: string; priority: string; assignedTo: string | null;
  itemIds: string[]; pickedAt: Date | null; packedAt: Date | null; shippedAt: Date | null;
  cancelledAt: Date | null; notes: string | null; slaDueAt: Date | null; slaBreachedAt: Date | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  fulfilledAt: Date | null; onHoldAt: Date | null; failedAt: Date | null;
  failureReason: string | null; cancelReason: string | null; holdReason: string | null; metadata: unknown;
}

export class FulfillmentPrismaMapper {
  static toDomain(raw: LogisticsFulfillmentRow): FulfillmentEntity {
    return FulfillmentEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        orderId: raw.orderId, vendorId: raw.vendorId ?? undefined, warehouseId: raw.warehouseId ?? undefined,
        status: FulfillmentStatusVO.reconstitute(raw.status),
        type: FulfillmentTypeVO.reconstitute(raw.type),
        priority: FulfillmentPriorityVO.reconstitute(raw.priority),
        itemIds: raw.itemIds, assignedTo: raw.assignedTo ?? undefined,
        pickedAt: toIso(raw.pickedAt), packedAt: toIso(raw.packedAt), shippedAt: toIso(raw.shippedAt),
        fulfilledAt: toIso(raw.fulfilledAt), cancelledAt: toIso(raw.cancelledAt),
        failedAt: toIso(raw.failedAt), onHoldAt: toIso(raw.onHoldAt), slaDueAt: toIso(raw.slaDueAt),
        failureReason: raw.failureReason ?? undefined, cancelReason: raw.cancelReason ?? undefined,
        holdReason: raw.holdReason ?? undefined, notes: raw.notes ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: FulfillmentEntity): Record<string, unknown> {
    return {
      id: entity.id, orderId: entity.orderId, vendorId: entity.vendorId ?? null,
      warehouseId: entity.warehouseId ?? null, status: entity.status.value, type: entity.type.value,
      priority: entity.priority.value, itemIds: entity.itemIds, assignedTo: entity.assignedTo ?? null,
      pickedAt: entity.pickedAt ? new Date(entity.pickedAt) : null,
      packedAt: entity.packedAt ? new Date(entity.packedAt) : null,
      shippedAt: entity.shippedAt ? new Date(entity.shippedAt) : null,
      fulfilledAt: entity.fulfilledAt ? new Date(entity.fulfilledAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      onHoldAt: entity.onHoldAt ? new Date(entity.onHoldAt) : null,
      slaDueAt: entity.slaDueAt ? new Date(entity.slaDueAt) : null,
      failureReason: entity.failureReason ?? null, cancelReason: entity.cancelReason ?? null,
      holdReason: entity.holdReason ?? null, notes: entity.notes ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
