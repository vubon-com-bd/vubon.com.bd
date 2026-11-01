#!/usr/bin/env node
/**
 * Generate InMemory Repositories — Order Service
 * @module order-service/scripts
 *
 * Generates InMemory implementations of all 12 order domain repositories.
 * The generated code implements domain interfaces using a Map-based store.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const MEMORY_DIR = join(
  ROOT,
  'src/module/infrastructure/persistence/memory/repositories',
);

// ═══════════════════════════════════════════════════════════════
// SPECS — 12 repositories
// ═══════════════════════════════════════════════════════════════
const SPECS = [
  // 1. ORDER
  {
    file: 'order.memory.repository.ts',
    entity: 'OrderEntity',
    className: 'Order',
    entityPath: '../../../../domain/entities/order.entity.js',
    interfaceName: 'OrderRepository',
    interfacePath: '../../../../domain/repositories/order.repository.interface.js',
    voImports: [
      { name: 'OrderIdVO', path: '../../../../domain/value-objects/primitives/order-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: OrderIdVO): Promise<OrderEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrderNumber(orderNumber: string): Promise<OrderEntity | null> {
        const all = await this.findAll();
        return all.find((e) => e.orderNumber.value === orderNumber) ?? null;
      }`,
      `async findByCustomer(customerId: string): Promise<readonly OrderEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.customerId.value === customerId);
      }`,
      `async findByStatus(status: string): Promise<readonly OrderEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findPaginated(options: any): Promise<any> {
        const all = await this.findAll();
        const f = options.filter ?? {};
        const filtered = all.filter((e) => {
          if (f.customerId && e.customerId.value !== f.customerId) return false;
          if (f.status && e.status.value !== f.status) return false;
          return true;
        });
        const start = (options.page - 1) * options.limit;
        return {
          items: filtered.slice(start, start + options.limit),
          total: filtered.length,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(filtered.length / options.limit),
        };
      }`,
      `async getStats(customerId?: string): Promise<any> {
        const all = await this.findAll();
        const filtered = customerId
          ? all.filter((e) => e.customerId.value === customerId)
          : all;
        let totalRevenue = 0;
        const byStatus: Record<string, number> = {};
        for (const e of filtered) {
          totalRevenue += e.total.amount;
          byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
        }
        return {
          total: filtered.length,
          totalRevenue,
          averageOrderValue: filtered.length ? totalRevenue / filtered.length : 0,
          currency: filtered[0]?.total.currency ?? 'BDT',
          byStatus,
        };
      }`,
      `async findStalePending(olderThanMinutes: number): Promise<readonly OrderEntity[]> {
        const all = await this.findAll();
        const cutoff = Date.now() - olderThanMinutes * 60 * 1000;
        return all.filter(
          (e) => e.status.isPending() && Date.parse(e.createdAt) < cutoff,
        );
      }`,
      `async findExpiredUnconfirmed(olderThanHours: number): Promise<readonly OrderEntity[]> {
        return this.findStalePending(olderThanHours * 60);
      }`,
      `async findAwaitingFulfillment(): Promise<readonly OrderEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.isConfirmed());
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 2. ORDER ITEM
  {
    file: 'order-item.memory.repository.ts',
    entity: 'OrderItemEntity',
    className: 'OrderItem',
    entityPath: '../../../../domain/entities/order-item.entity.js',
    interfaceName: 'OrderItemRepository',
    interfacePath: '../../../../domain/repositories/order-item.repository.interface.js',
    voImports: [
      { name: 'OrderItemIdVO', path: '../../../../domain/value-objects/primitives/order-item-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: OrderItemIdVO): Promise<OrderItemEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly OrderItemEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByProduct(productId: string): Promise<readonly OrderItemEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.productId.value === productId);
      }`,
      `async findByVendor(vendorId: string): Promise<readonly OrderItemEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vendorId?.value === vendorId);
      }`,
      `async findByStatus(status: string): Promise<readonly OrderItemEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findByOrderAndStatus(orderId: string, status: string): Promise<readonly OrderItemEntity[]> {
        const all = await this.findAll();
        return all.filter(
          (e) => e.orderId.value === orderId && e.status.value === status,
        );
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 3. CHECKOUT
  {
    file: 'checkout.memory.repository.ts',
    entity: 'CheckoutEntity',
    className: 'Checkout',
    entityPath: '../../../../domain/entities/checkout.entity.js',
    interfaceName: 'CheckoutRepository',
    interfacePath: '../../../../domain/repositories/checkout.repository.interface.js',
    voImports: [
      { name: 'CheckoutIdVO', path: '../../../../domain/value-objects/primitives/checkout-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: CheckoutIdVO): Promise<CheckoutEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByCustomer(customerId: string): Promise<readonly CheckoutEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.customerId.value === customerId);
      }`,
      `async findByStatus(status: string): Promise<readonly CheckoutEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findPaginated(options: any): Promise<any> {
        const all = await this.findAll();
        const start = (options.page - 1) * options.limit;
        return {
          items: all.slice(start, start + options.limit),
          total: all.length,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(all.length / options.limit),
        };
      }`,
      `async findExpired(olderThanMinutes: number): Promise<readonly CheckoutEntity[]> {
        const all = await this.findAll();
        const cutoff = Date.now() - olderThanMinutes * 60 * 1000;
        return all.filter(
          (e) => !e.status.isTerminal() && Date.parse(e.expiresAt) < cutoff,
        );
      }`,
      `async findAbandoned(olderThanMinutes: number): Promise<readonly CheckoutEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.isAbandoned());
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 4. CHECKOUT SESSION
  {
    file: 'checkout-session.memory.repository.ts',
    entity: 'CheckoutSessionEntity',
    className: 'CheckoutSession',
    entityPath: '../../../../domain/entities/checkout-session.entity.js',
    interfaceName: 'CheckoutSessionRepository',
    interfacePath: '../../../../domain/repositories/checkout-session.repository.interface.js',
    voImports: [],
    customMethods: [
      `async findByCheckout(checkoutId: string): Promise<readonly CheckoutSessionEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.checkoutId.value === checkoutId);
      }`,
      `async findLatestByCheckout(checkoutId: string): Promise<CheckoutSessionEntity | null> {
        const all = await this.findByCheckout(checkoutId);
        return all[0] ?? null;
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 5. DELIVERY
  {
    file: 'delivery.memory.repository.ts',
    entity: 'DeliveryEntity',
    className: 'Delivery',
    entityPath: '../../../../domain/entities/delivery.entity.js',
    interfaceName: 'DeliveryRepository',
    interfacePath: '../../../../domain/repositories/delivery.repository.interface.js',
    voImports: [
      { name: 'DeliveryIdVO', path: '../../../../domain/value-objects/primitives/delivery-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly DeliveryEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByStatus(status: string): Promise<readonly DeliveryEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findByCourier(courierId: string): Promise<readonly DeliveryEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.courierId === courierId);
      }`,
      `async findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | null> {
        const all = await this.findAll();
        return all.find((e) => e.trackingNumber?.value === trackingNumber) ?? null;
      }`,
      `async findPaginated(options: any): Promise<any> {
        const all = await this.findAll();
        const start = (options.page - 1) * options.limit;
        return {
          items: all.slice(start, start + options.limit),
          total: all.length,
          page: options.page,
          limit: options.limit,
          totalPages: Math.ceil(all.length / options.limit),
        };
      }`,
      `async findRetryable(): Promise<readonly DeliveryEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.isFailed() && e.attempts < 3);
      }`,
      `async findOverdueEstimated(now: string): Promise<readonly DeliveryEntity[]> {
        const all = await this.findAll();
        const nowMs = Date.parse(now);
        return all.filter(
          (e) => e.estimatedAt !== undefined && Date.parse(e.estimatedAt) < nowMs,
        );
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 6. DELIVERY METHOD
  {
    file: 'delivery-method.memory.repository.ts',
    entity: 'DeliveryMethodEntity',
    className: 'DeliveryMethod',
    entityPath: '../../../../domain/entities/delivery-method.entity.js',
    interfaceName: 'DeliveryMethodRepository',
    interfacePath: '../../../../domain/repositories/delivery-method.repository.interface.js',
    voImports: [
      { name: 'DeliveryMethodIdVO', path: '../../../../domain/value-objects/primitives/delivery-method-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: DeliveryMethodIdVO): Promise<DeliveryMethodEntity | null> {
        return this.findById(id.value);
      }`,
      `async findActive(): Promise<readonly DeliveryMethodEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.isActive);
      }`,
      `async findByType(type: string): Promise<readonly DeliveryMethodEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.type.value === type);
      }`,
      `async findFree(): Promise<readonly DeliveryMethodEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.isFree());
      }`,
      `async findFast(maxDays: number = 2): Promise<readonly DeliveryMethodEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.estimatedDays <= maxDays);
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 7. SHIPPING ADDRESS
  {
    file: 'shipping-address.memory.repository.ts',
    entity: 'ShippingAddressEntity',
    className: 'ShippingAddress',
    entityPath: '../../../../domain/entities/shipping-address.entity.js',
    interfaceName: 'ShippingAddressRepository',
    interfacePath: '../../../../domain/repositories/shipping-address.repository.interface.js',
    voImports: [
      { name: 'ShippingAddressIdVO', path: '../../../../domain/value-objects/primitives/shipping-address-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: ShippingAddressIdVO): Promise<ShippingAddressEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<ShippingAddressEntity | null> {
        const all = await this.findAll();
        return all.find((e) => e.id === orderId) ?? null;
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 8. BILLING ADDRESS
  {
    file: 'billing-address.memory.repository.ts',
    entity: 'BillingAddressEntity',
    className: 'BillingAddress',
    entityPath: '../../../../domain/entities/billing-address.entity.js',
    interfaceName: 'BillingAddressRepository',
    interfacePath: '../../../../domain/repositories/billing-address.repository.interface.js',
    voImports: [
      { name: 'BillingAddressIdVO', path: '../../../../domain/value-objects/primitives/billing-address-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: BillingAddressIdVO): Promise<BillingAddressEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<BillingAddressEntity | null> {
        const all = await this.findAll();
        return all.find((e) => e.id === orderId) ?? null;
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 9. ORDER CANCEL
  {
    file: 'order-cancel.memory.repository.ts',
    entity: 'OrderCancelEntity',
    className: 'OrderCancel',
    entityPath: '../../../../domain/entities/order-cancel.entity.js',
    interfaceName: 'OrderCancelRepository',
    interfacePath: '../../../../domain/repositories/order-cancel.repository.interface.js',
    voImports: [
      { name: 'CancelIdVO', path: '../../../../domain/value-objects/primitives/cancel-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: CancelIdVO): Promise<OrderCancelEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly OrderCancelEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByStatus(status: string): Promise<readonly OrderCancelEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findPendingOlderThan(minutes: number): Promise<readonly OrderCancelEntity[]> {
        const all = await this.findAll();
        const cutoff = Date.now() - minutes * 60 * 1000;
        return all.filter(
          (e) => e.status.isRequested() && Date.parse(e.vo.requestedAt) < cutoff,
        );
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 10. ORDER RETURN
  {
    file: 'order-return.memory.repository.ts',
    entity: 'OrderReturnEntity',
    className: 'OrderReturn',
    entityPath: '../../../../domain/entities/order-return.entity.js',
    interfaceName: 'OrderReturnRepository',
    interfacePath: '../../../../domain/repositories/order-return.repository.interface.js',
    voImports: [
      { name: 'ReturnIdVO', path: '../../../../domain/value-objects/primitives/return-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: ReturnIdVO): Promise<OrderReturnEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly OrderReturnEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByCustomer(customerId: string): Promise<readonly OrderReturnEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.customerId.value === customerId);
      }`,
      `async findByStatus(status: string): Promise<readonly OrderReturnEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findPickupScheduledBefore(cutoffAt: string): Promise<readonly OrderReturnEntity[]> {
        const all = await this.findAll();
        const cutoffMs = Date.parse(cutoffAt);
        return all.filter(
          (e) => e.status.isPickupScheduled() && Date.parse(e.vo.requestedAt) < cutoffMs,
        );
      }`,
      `async findAwaitingInspection(): Promise<readonly OrderReturnEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.isReceived());
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 11. ORDER FULFILLMENT
  {
    file: 'order-fulfillment.memory.repository.ts',
    entity: 'OrderFulfillmentEntity',
    className: 'OrderFulfillment',
    entityPath: '../../../../domain/entities/order-fulfillment.entity.js',
    interfaceName: 'OrderFulfillmentRepository',
    interfacePath: '../../../../domain/repositories/order-fulfillment.repository.interface.js',
    voImports: [
      { name: 'FulfillmentIdVO', path: '../../../../domain/value-objects/primitives/fulfillment-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: FulfillmentIdVO): Promise<OrderFulfillmentEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly OrderFulfillmentEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByVendor(vendorId: string): Promise<readonly OrderFulfillmentEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.vendorId?.value === vendorId);
      }`,
      `async findByStatus(status: string): Promise<readonly OrderFulfillmentEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
      `async findAwaitingFulfillment(): Promise<readonly OrderFulfillmentEntity[]> {
        const all = await this.findAll();
        return all.filter(
          (e) => e.status.isUnfulfilled() || e.status.isPending(),
        );
      }`,
      `async softDelete(id: string): Promise<void> {
        return this.softDeleteById(id);
      }`,
    ],
  },

  // 12. ORDER TRACKING
  {
    file: 'order-tracking.memory.repository.ts',
    entity: 'OrderTrackingEntity',
    className: 'OrderTracking',
    entityPath: '../../../../domain/entities/order-tracking.entity.js',
    interfaceName: 'OrderTrackingRepository',
    interfacePath: '../../../../domain/repositories/order-tracking.repository.interface.js',
    voImports: [
      { name: 'TrackingIdVO', path: '../../../../domain/value-objects/primitives/tracking-id.vo.js' },
    ],
    customMethods: [
      `async findByIdVO(id: TrackingIdVO): Promise<OrderTrackingEntity | null> {
        return this.findById(id.value);
      }`,
      `async findByOrder(orderId: string): Promise<readonly OrderTrackingEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.orderId.value === orderId);
      }`,
      `async findByTrackingNumber(trackingNumber: string): Promise<readonly OrderTrackingEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.vo.trackingNumber.value === trackingNumber);
      }`,
      `async findLatestByOrder(orderId: string): Promise<OrderTrackingEntity | null> {
        const list = await this.findByOrder(orderId);
        return list[0] ?? null;
      }`,
      `async findByStatus(status: string): Promise<readonly OrderTrackingEntity[]> {
        const all = await this.findAll();
        return all.filter((e) => e.status.value === status);
      }`,
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// TEMPLATE GENERATOR
// ═══════════════════════════════════════════════════════════════
function generateRepo(spec) {
  const voImports = spec.voImports.length
    ? '\n' + spec.voImports.map((v) => `import type { ${v.name} } from '${v.path}';`).join('\n')
    : '';
  const customMethods = spec.customMethods.join('\n\n  ');

  return `/**
 * ${spec.entity} In-Memory Repository
 * @module order-service/infrastructure/persistence/memory/repositories
 *
 * Implements: ${spec.interfaceName}
 * Generated by: scripts/generate-inmemory-repos.mjs
 * Used when: DB_MODE=memory (dev/test only)
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { ${spec.entity} } from '${spec.entityPath}';
import type { ${spec.interfaceName} } from '${spec.interfacePath}';${voImports}

@Injectable()
export class InMemory${spec.className}Repository
  extends InMemoryRepository<${spec.entity}, string>
  implements ${spec.interfaceName}
{
  protected idOf(entity: ${spec.entity}): string {
    return entity.id;
  }

  ${customMethods}
}
`;
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
function main() {
  if (!existsSync(MEMORY_DIR)) mkdirSync(MEMORY_DIR, { recursive: true });

  let generated = 0;
  for (const spec of SPECS) {
    try {
      writeFileSync(join(MEMORY_DIR, spec.file), generateRepo(spec), 'utf8');
      console.log(`✅ ${spec.file}`);
      generated++;
    } catch (err) {
      console.error(`❌ ${spec.file}: ${err.message}`);
    }
  }

  console.log(`\n📊 Generated ${generated}/${SPECS.length} memory repositories`);
}

main();
