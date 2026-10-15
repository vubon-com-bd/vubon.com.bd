/**
 * External Event Types — from other services
 * @module cart-service/application/events/external
 *
 * ⚠️ These events are published by OTHER services (product, identity, vendor, order)
 *    and consumed by Cart Service.
 */

// ─── Base structure ─────────────────────────
export interface ExternalEvent<TPayload = unknown> {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TPayload;
  readonly occurredAt: string;
  readonly version: number;
  readonly metadata?: {
    readonly correlationId?: string;
    readonly causationId?: string;
    readonly userId?: string;
    readonly source?: string;
  };
}

// ═══ Product Service Events ═══

export interface ProductUpdatedPayload {
  readonly productId: string;
  readonly name?: string;
  readonly isAvailable?: boolean;
  readonly updatedAt: string;
}

export interface ProductDeletedPayload {
  readonly productId: string;
  readonly deletedAt: string;
}

export interface ProductPriceChangedPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly changedAt: string;
}

export interface InventoryLowStockPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly available: number;
  readonly threshold: number;
  readonly detectedAt: string;
}

export interface InventoryOutOfStockPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly detectedAt: string;
}

export type ProductUpdatedEvent = ExternalEvent<ProductUpdatedPayload> & {
  readonly type: 'product.product.updated';
};

export type ProductDeletedEvent = ExternalEvent<ProductDeletedPayload> & {
  readonly type: 'product.product.deleted';
};

export type ProductPriceChangedEvent = ExternalEvent<ProductPriceChangedPayload> & {
  readonly type: 'product.pricing.changed';
};

export type InventoryLowStockEvent = ExternalEvent<InventoryLowStockPayload> & {
  readonly type: 'product.inventory.low_stock';
};

export type InventoryOutOfStockEvent = ExternalEvent<InventoryOutOfStockPayload> & {
  readonly type: 'product.inventory.out_of_stock';
};

// ═══ Identity Service Events ═══

export interface UserDeletedPayload {
  readonly userId: string;
  readonly deletedAt: string;
}

export type UserDeletedEvent = ExternalEvent<UserDeletedPayload> & {
  readonly type: 'identity.user.deleted';
};

// ═══ Vendor Service Events ═══

export interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly reason?: string;
  readonly suspendedAt: string;
}

export type VendorSuspendedEvent = ExternalEvent<VendorSuspendedPayload> & {
  readonly type: 'vendor.vendor.suspended';
};

// ═══ Order Service Events ═══

export interface OrderCompletedPayload {
  readonly orderId: string;
  readonly cartId?: string;
  readonly userId: string;
  readonly completedAt: string;
}

export type OrderCompletedEvent = ExternalEvent<OrderCompletedPayload> & {
  readonly type: 'order.order.completed';
};
