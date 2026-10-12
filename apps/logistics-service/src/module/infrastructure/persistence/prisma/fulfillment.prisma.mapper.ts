import { FulfillmentEntity } from '../../../domain/entities/fulfillment.entity.js';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { FulfillmentStatusVO } from '../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentTypeVO } from '../../../domain/value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '../../../domain/value-objects/primitives/fulfillment-priority.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';
import { SlaVO } from '../../../domain/value-objects/composites/sla.vo.js';
import type { UserId } from '@vubon/shared-types/common';

export interface PrismaFulfillmentRow {
  id: string; orderId: string; vendorId: string | null; warehouseId: string | null;
  status: string; type: string; priority: string; assignedTo: string | null;
  itemIds: string[];
  pickedAt: Date | null; packedAt: Date | null; shippedAt: Date | null; cancelledAt: Date | null;
  notes: string | null; slaDueAt: Date | null; slaBreachedAt: Date | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class FulfillmentPrismaMapper {
  static toDomain(raw: PrismaFulfillmentRow): FulfillmentEntity {
    const sla = raw.slaDueAt
      ? SlaVO.reconstitute({
          dueAt: new Date(raw.slaDueAt).toISOString(),
          startedAt: new Date(raw.createdAt).toISOString(),
          breachedAt: raw.slaBreachedAt ? new Date(raw.slaBreachedAt).toISOString() : undefined,
        })
      : undefined;

    return FulfillmentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
        warehouseId: raw.warehouseId ? WarehouseIdVO.reconstitute(raw.warehouseId) : undefined,
        status: FulfillmentStatusVO.reconstitute(raw.status),
        type: FulfillmentTypeVO.reconstitute(raw.type),
        priority: FulfillmentPriorityVO.reconstitute(raw.priority),
        itemIds: raw.itemIds,
        assignedTo: raw.assignedTo ? (raw.assignedTo as UserId) : undefined,
        pickedAt: toIso(raw.pickedAt),
        packedAt: toIso(raw.packedAt),
        shippedAt: toIso(raw.shippedAt),
        cancelledAt: toIso(raw.cancelledAt),
        notes: raw.notes ? NotesVO.reconstitute(raw.notes) : undefined,
        sla,
      },
    });
  }

  static toPersistence(entity: FulfillmentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      vendorId: entity.vendorId?.value ?? null,
      warehouseId: entity.warehouseId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      priority: entity.priority.value,
      assignedTo: entity.assignedTo ?? null,
      itemIds: [...entity.itemIds],
      pickedAt: entity.pickedAt ? new Date(entity.pickedAt) : null,
      packedAt: entity.packedAt ? new Date(entity.packedAt) : null,
      shippedAt: entity.shippedAt ? new Date(entity.shippedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      notes: entity.notes?.value ?? null,
      slaDueAt: entity.sla?.dueAt ? new Date(entity.sla.dueAt) : null,
      slaBreachedAt: entity.sla?.breachedAt ? new Date(entity.sla.breachedAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
