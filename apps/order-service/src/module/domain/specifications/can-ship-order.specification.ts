/**
 * CanShipOrderSpecification
 * @module order-service/domain/specifications
 *
 * Checks if an order can be shipped.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';

export interface ShipOrderContext {
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly shippedAt?: string;
}

export interface CanShipOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: ShipOrderContext;
}

export class CanShipOrderSpecification extends Specification<CanShipOrderCandidate> {
  isSatisfiedBy(c: CanShipOrderCandidate): boolean {
    const { order, ctx } = c;

    if (!order.isPacked()) return false;
    if (order.items.length === 0) return false;
    if (ctx?.courierId !== undefined && ctx.courierId.trim().length === 0) return false;
    if (ctx?.warehouseId !== undefined && ctx.warehouseId.trim().length === 0) return false;
    return true;
  }

  explain(c: CanShipOrderCandidate): string | null {
    const { order, ctx } = c;

    if (!order.isPacked()) {
      return `Order must be packed before shipping (current: "${order.status.value}")`;
    }
    if (order.isTerminal()) {
      return `Order is in terminal status "${order.status.value}"`;
    }
    if (order.items.length === 0) {
      return 'Order has no items';
    }
    if (ctx?.courierId !== undefined && ctx.courierId.trim().length === 0) {
      return 'Courier ID cannot be empty';
    }
    if (ctx?.warehouseId !== undefined && ctx.warehouseId.trim().length === 0) {
      return 'Warehouse ID cannot be empty';
    }
    return null;
  }

  static strict(): CanShipOrderSpecification {
    return new CanShipOrderSpecification();
  }
}
