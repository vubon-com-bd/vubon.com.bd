#!/usr/bin/env node
/**
 * Generate InMemory Repositories — Cart Service (v2 - clean)
 * @module cart-service/scripts
 *
 * ⚠️ Uses `Promise<any>` return types intentionally — InMemory repos are
 *    dev/test-only fallback. Runtime structures match domain interfaces.
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

const DOMAIN = '../../../../domain';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const paginatedMethod = `async findPaginated(options: any): Promise<any> {
    const all = await this.findAll();
    const start = (options.page - 1) * options.limit;
    return {
      items: all.slice(start, start + options.limit),
      total: all.length,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(all.length / options.limit) || 1,
    };
  }`;

const statsMethod = (body) => `async getStats(_filter?: any): Promise<any> {
    const all = await this.findAll();
${body}
  }`;

const softDeleteMethod = `async softDelete(id: string, _deletedBy?: string): Promise<void> {
    return this.softDeleteById(id);
  }`;

const restoreMethod = `async restore(id: string): Promise<void> {
    return this.restoreById(id);
  }`;

// ─────────────────────────────────────────────
// SPECS
// ─────────────────────────────────────────────

const SPECS = [
  // ═══ 1. Cart ═══
  {
    file: 'cart.memory.repository.ts',
    entity: 'CartEntity',
    className: 'Cart',
    entityPath: `${DOMAIN}/entities/cart.entity.js`,
    interfaceName: 'CartRepository',
    interfacePath: `${DOMAIN}/repositories/cart.repository.interface.js`,
    voImports: [
      { name: 'CartIdVO', path: `${DOMAIN}/value-objects/primitives/cart-id.vo.js` },
      { name: 'IdempotencyKeyVO', path: `${DOMAIN}/value-objects/primitives/idempotency-key.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: CartIdVO): Promise<CartEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByUserId(userId: string): Promise<readonly CartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId?.value === userId);
  }`,
      `async findActiveByUserId(userId: string): Promise<CartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.userId?.value === userId && e.isActive()) ?? null;
  }`,
      `async findBySessionId(sessionId: string): Promise<readonly CartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.sessionId?.value === sessionId);
  }`,
      `async findActiveBySessionId(sessionId: string): Promise<CartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.sessionId?.value === sessionId && e.isActive()) ?? null;
  }`,
      `async findByStatus(status: string): Promise<readonly CartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<CartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.idempotencyKey?.value === key.value) ?? null;
  }`,
      paginatedMethod,
      statsMethod(`    const totalValue = all.reduce((s, c) => s + c.total, 0);
    const totalItems = all.reduce((s, c) => s + c.itemCount, 0);
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const c of all) {
      byStatus[c.status.value] = (byStatus[c.status.value] ?? 0) + 1;
      byType[c.type.value] = (byType[c.type.value] ?? 0) + 1;
    }
    return {
      total: all.length,
      totalValue,
      averageValue: all.length ? totalValue / all.length : 0,
      averageItemCount: all.length ? totalItems / all.length : 0,
      byStatus,
      byType,
    };`),
      `async findStale(inactiveMinutes: number): Promise<readonly CartEntity[]> {
    const cutoff = Date.now() - inactiveMinutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isActive() && new Date(e.lastActivityAt).getTime() < cutoff);
  }`,
      `async findExpired(beforeDate: Date): Promise<readonly CartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.isFinal() && new Date(e.expiresAt).getTime() <= beforeDate.getTime());
  }`,
      `async findAbandonable(thresholdHours: number): Promise<readonly CartEntity[]> {
    const cutoff = Date.now() - thresholdHours * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isActive() && e.itemCount > 0 && new Date(e.lastActivityAt).getTime() < cutoff);
  }`,
      `async findRetryable(_maxRetries?: number): Promise<readonly CartEntity[]> {
    return [];
  }`,
      `async countByUserId(userId: string): Promise<number> {
    return (await this.findByUserId(userId)).length;
  }`,
      `async countByStatus(status: string): Promise<number> {
    return (await this.findByStatus(status)).length;
  }`,
      `async countActiveByUserId(userId: string): Promise<number> {
    const all = await this.findByUserId(userId);
    return all.filter((e) => e.isActive()).length;
  }`,
      `async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      const c = await this.findById(id);
      if (c) {
        if (status === 'cleared') c.clear();
        else if (status === 'abandoned') c.abandon();
        else if (status === 'expired') c.expire();
        await this.save(c);
        count++;
      }
    }
    return count;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 2. CartItem ═══
  {
    file: 'cart-item.memory.repository.ts',
    entity: 'CartItemEntity',
    className: 'CartItem',
    entityPath: `${DOMAIN}/entities/cart-item.entity.js`,
    interfaceName: 'CartItemRepository',
    interfacePath: `${DOMAIN}/repositories/cart-item.repository.interface.js`,
    voImports: [
      { name: 'CartItemIdVO', path: `${DOMAIN}/value-objects/primitives/cart-item-id.vo.js` },
      { name: 'CartItemStatusVO', path: `${DOMAIN}/value-objects/primitives/cart-item-status.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: CartItemIdVO): Promise<CartItemEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.cartId.value === cartId);
  }`,
      `async findActiveByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    const items = await this.findByCartId(cartId);
    return items.filter((e) => e.isActive());
  }`,
      `async countByCartId(cartId: string): Promise<number> {
    return (await this.findByCartId(cartId)).length;
  }`,
      `async findByProductId(productId: string): Promise<readonly CartItemEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.productId.value === productId);
  }`,
      `async findInCartByProduct(cartId: string, productId: string, variantId?: string): Promise<CartItemEntity | null> {
    const all = await this.findAll();
    return all.find((e) =>
      e.cartId.value === cartId &&
      e.productId.value === productId &&
      (variantId ? e.variantId?.value === variantId : true),
    ) ?? null;
  }`,
      `async existsInCart(cartId: string, productId: string, variantId?: string): Promise<boolean> {
    return (await this.findInCartByProduct(cartId, productId, variantId)) !== null;
  }`,
      `async findByStatus(status: string): Promise<readonly CartItemEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findUnavailableItems(): Promise<readonly CartItemEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isOutOfStock() || e.isUnavailable());
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let totalQuantity = 0;
    let totalValue = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      totalQuantity += e.quantity.value;
      totalValue += e.subtotal;
    }
    return {
      total: all.length,
      totalQuantity,
      totalValue,
      averageUnitPrice: all.length ? totalValue / all.length : 0,
      byStatus,
    };`),
      `async findStale(inactiveMinutes: number): Promise<readonly CartItemEntity[]> {
    const cutoff = Date.now() - inactiveMinutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => new Date(e.updatedAtInternal).getTime() < cutoff);
  }`,
      `async deleteByCartId(cartId: string): Promise<number> {
    const items = await this.findByCartId(cartId);
    for (const item of items) await this.delete(item.id);
    return items.length;
  }`,
      `async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      const item = await this.findById(id);
      if (item) {
        item.changeStatus(CartItemStatusVO.create(status));
        await this.save(item);
        count++;
      }
    }
    return count;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 3. CartCoupon ═══
  {
    file: 'cart-coupon.memory.repository.ts',
    entity: 'CartCouponEntity',
    className: 'CartCoupon',
    entityPath: `${DOMAIN}/entities/cart-coupon.entity.js`,
    interfaceName: 'CartCouponRepository',
    interfacePath: `${DOMAIN}/repositories/cart-coupon.repository.interface.js`,
    voImports: [],
    methods: [
      `async findByCartId(cartId: string): Promise<readonly CartCouponEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.cartId.value === cartId);
  }`,
      `async findUsableByCartId(cartId: string): Promise<CartCouponEntity | null> {
    const items = await this.findByCartId(cartId);
    return items.find((c) => c.isUsable()) ?? null;
  }`,
      `async existsByCartAndCode(cartId: string, code: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.cartId.value === cartId && e.code.value === code);
  }`,
      `async findByCartAndCode(cartId: string, code: string): Promise<CartCouponEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.cartId.value === cartId && e.code.value === code) ?? null;
  }`,
      `async findByCode(code: string): Promise<readonly CartCouponEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.code.value === code);
  }`,
      `async findByStatus(status: string): Promise<readonly CartCouponEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findExpired(beforeDate: Date): Promise<readonly CartCouponEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => new Date(e.expiresAt).getTime() < beforeDate.getTime());
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let totalDiscountGiven = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      totalDiscountGiven += e.appliedDiscountAmount;
    }
    return {
      total: all.length,
      totalDiscountGiven,
      averageDiscount: all.length ? totalDiscountGiven / all.length : 0,
      byStatus,
    };`),
      `async deleteByCartId(cartId: string): Promise<number> {
    const items = await this.findByCartId(cartId);
    for (const item of items) await this.delete(item.id);
    return items.length;
  }`,
      `async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 4. CartVoucher ═══
  {
    file: 'cart-voucher.memory.repository.ts',
    entity: 'CartVoucherEntity',
    className: 'CartVoucher',
    entityPath: `${DOMAIN}/entities/cart-voucher.entity.js`,
    interfaceName: 'CartVoucherRepository',
    interfacePath: `${DOMAIN}/repositories/cart-voucher.repository.interface.js`,
    voImports: [],
    methods: [
      `async findByCartId(cartId: string): Promise<readonly CartVoucherEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.cartId.value === cartId);
  }`,
      `async findUsableByCartId(cartId: string): Promise<CartVoucherEntity | null> {
    const items = await this.findByCartId(cartId);
    return items.find((v) => v.canBeApplied()) ?? null;
  }`,
      `async existsByCartAndCode(cartId: string, code: string): Promise<boolean> {
    const all = await this.findAll();
    return all.some((e) => e.cartId.value === cartId && e.code.value === code);
  }`,
      `async findByCartAndCode(cartId: string, code: string): Promise<CartVoucherEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.cartId.value === cartId && e.code.value === code) ?? null;
  }`,
      `async findByCode(code: string): Promise<readonly CartVoucherEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.code.value === code);
  }`,
      `async findByStatus(status: string): Promise<readonly CartVoucherEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findExpired(beforeDate: Date): Promise<readonly CartVoucherEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => new Date(e.expiresAt).getTime() < beforeDate.getTime());
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let totalApplied = 0;
    let totalRemaining = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      totalApplied += e.appliedAmount;
      totalRemaining += e.remainingAmount;
    }
    return { total: all.length, totalApplied, totalRemaining, byStatus };`),
      `async deleteByCartId(cartId: string): Promise<number> {
    const items = await this.findByCartId(cartId);
    for (const item of items) await this.delete(item.id);
    return items.length;
  }`,
      `async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 5. CartTax ═══
  {
    file: 'cart-tax.memory.repository.ts',
    entity: 'CartTaxEntity',
    className: 'CartTax',
    entityPath: `${DOMAIN}/entities/cart-tax.entity.js`,
    interfaceName: 'CartTaxRepository',
    interfacePath: `${DOMAIN}/repositories/cart-tax.repository.interface.js`,
    voImports: [],
    methods: [
      `async findByCartId(cartId: string): Promise<readonly CartTaxEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.cartId.value === cartId);
  }`,
      `async findInclusiveByCartId(cartId: string): Promise<readonly CartTaxEntity[]> {
    const items = await this.findByCartId(cartId);
    return items.filter((e) => e.isInclusive());
  }`,
      `async findExclusiveByCartId(cartId: string): Promise<readonly CartTaxEntity[]> {
    const items = await this.findByCartId(cartId);
    return items.filter((e) => e.isExclusive());
  }`,
      paginatedMethod,
      statsMethod(`    let totalTaxAmount = 0;
    let inclusiveCount = 0;
    let exclusiveCount = 0;
    for (const e of all) {
      totalTaxAmount += e.taxAmount;
      if (e.isInclusive()) inclusiveCount++;
      else exclusiveCount++;
    }
    return {
      total: all.length,
      totalTaxAmount,
      averageRate: all.length ? all.reduce((s, e) => s + e.rate.value, 0) / all.length : 0,
      inclusiveCount,
      exclusiveCount,
    };`),
      `async deleteByCartId(cartId: string): Promise<number> {
    const items = await this.findByCartId(cartId);
    for (const item of items) await this.delete(item.id);
    return items.length;
  }`,
      `async recalculateByCartId(cartId: string, baseAmount: number): Promise<number> {
    const items = await this.findByCartId(cartId);
    for (const item of items) {
      item.recalculate(baseAmount);
      await this.save(item);
    }
    return items.length;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 6. CartShipping ═══
  {
    file: 'cart-shipping.memory.repository.ts',
    entity: 'CartShippingEntity',
    className: 'CartShipping',
    entityPath: `${DOMAIN}/entities/cart-shipping.entity.js`,
    interfaceName: 'CartShippingRepository',
    interfacePath: `${DOMAIN}/repositories/cart-shipping.repository.interface.js`,
    voImports: [],
    methods: [
      `async findByCartId(cartId: string): Promise<CartShippingEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.cartId.value === cartId) ?? null;
  }`,
      `async findByMethod(method: string): Promise<readonly CartShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.method.value === method);
  }`,
      `async findWithoutAddress(): Promise<readonly CartShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.hasAddress());
  }`,
      `async findWithAddress(): Promise<readonly CartShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.hasAddress());
  }`,
      paginatedMethod,
      statsMethod(`    const byMethod: Record<string, number> = {};
    let totalCost = 0;
    for (const e of all) {
      byMethod[e.method.value] = (byMethod[e.method.value] ?? 0) + 1;
      totalCost += e.cost;
    }
    return {
      total: all.length,
      totalCost,
      averageCost: all.length ? totalCost / all.length : 0,
      byMethod,
    };`),
      `async deleteByCartId(cartId: string): Promise<number> {
    const item = await this.findByCartId(cartId);
    if (item) { await this.delete(item.id); return 1; }
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 7. SavedForLater ═══
  {
    file: 'saved-for-later.memory.repository.ts',
    entity: 'SavedForLaterEntity',
    className: 'SavedForLater',
    entityPath: `${DOMAIN}/entities/saved-for-later.entity.js`,
    interfaceName: 'SavedForLaterRepository',
    interfacePath: `${DOMAIN}/repositories/saved-for-later.repository.interface.js`,
    voImports: [
      { name: 'SavedItemIdVO', path: `${DOMAIN}/value-objects/primitives/saved-item-id.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: SavedItemIdVO): Promise<SavedForLaterEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId);
  }`,
      `async findActiveByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId.value === userId && e.isActive());
  }`,
      `async findByUserAndProduct(userId: string, productId: string, variantId?: string): Promise<SavedForLaterEntity | null> {
    const all = await this.findAll();
    return all.find((e) =>
      e.userId.value === userId &&
      e.productId.value === productId &&
      (variantId ? e.variantId?.value === variantId : true),
    ) ?? null;
  }`,
      `async existsForUser(userId: string, productId: string, variantId?: string): Promise<boolean> {
    return (await this.findByUserAndProduct(userId, productId, variantId)) !== null;
  }`,
      `async findByStatus(status: string): Promise<readonly SavedForLaterEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findMovedToCart(): Promise<readonly SavedForLaterEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isMovedToCart());
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    let movedCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      if (e.isActive()) activeCount++;
      if (e.isMovedToCart()) movedCount++;
    }
    return { total: all.length, activeCount, movedCount, byStatus };`),
      `async findStale(inactiveDays: number): Promise<readonly SavedForLaterEntity[]> {
    const cutoff = Date.now() - inactiveDays * 24 * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => new Date(e.updatedAt).getTime() < cutoff);
  }`,
      `async findPurgeable(olderThanDays: number): Promise<readonly SavedForLaterEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isRemoved() && new Date(e.updatedAt).getTime() < cutoff);
  }`,
      `async deleteByUserId(userId: string): Promise<number> {
    const items = await this.findByUserId(userId);
    for (const item of items) await this.delete(item.id);
    return items.length;
  }`,
      `async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 8. AbandonedCart ═══
  {
    file: 'abandoned-cart.memory.repository.ts',
    entity: 'AbandonedCartEntity',
    className: 'AbandonedCart',
    entityPath: `${DOMAIN}/entities/abandoned-cart.entity.js`,
    interfaceName: 'AbandonedCartRepository',
    interfacePath: `${DOMAIN}/repositories/abandoned-cart.repository.interface.js`,
    voImports: [
      { name: 'AbandonedCartIdVO', path: `${DOMAIN}/value-objects/primitives/abandoned-cart-id.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByCartId(cartId: string): Promise<AbandonedCartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.cartId.value === cartId) ?? null;
  }`,
      `async findByUserId(userId: string): Promise<readonly AbandonedCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.userId?.value === userId);
  }`,
      `async findByStatus(status: string): Promise<readonly AbandonedCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findPendingReminders(maxReminders: number): Promise<readonly AbandonedCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.canSendReminder() && e.remindersSent < maxReminders);
  }`,
      `async findLostCandidates(olderThanDays: number): Promise<readonly AbandonedCartEntity[]> {
    const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isRecoverable() && new Date(e.abandonedAt).getTime() < cutoff);
  }`,
      `async findRecoverable(): Promise<readonly AbandonedCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isRecoverable());
  }`,
      `async findRecovered(): Promise<readonly AbandonedCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isRecovered());
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let totalValue = 0;
    let recoveredCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      totalValue += e.cartValue;
      if (e.isRecovered()) recoveredCount++;
    }
    return {
      total: all.length,
      totalValue,
      averageValue: all.length ? totalValue / all.length : 0,
      recoveredCount,
      recoveryRate: all.length ? (recoveredCount / all.length) * 100 : 0,
      byStatus,
    };`),
      `async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 9. GuestCart ═══
  {
    file: 'guest-cart.memory.repository.ts',
    entity: 'GuestCartEntity',
    className: 'GuestCart',
    entityPath: `${DOMAIN}/entities/guest-cart.entity.js`,
    interfaceName: 'GuestCartRepository',
    interfacePath: `${DOMAIN}/repositories/guest-cart.repository.interface.js`,
    voImports: [
      { name: 'GuestCartIdVO', path: `${DOMAIN}/value-objects/primitives/guest-cart-id.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: GuestCartIdVO): Promise<GuestCartEntity | null> {
    return this.findById(id.value);
  }`,
      `async findByToken(token: string): Promise<GuestCartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.token.value === token) ?? null;
  }`,
      `async findByCartId(cartId: string): Promise<GuestCartEntity | null> {
    const all = await this.findAll();
    return all.find((e) => e.cartId.value === cartId) ?? null;
  }`,
      `async findByStatus(status: string): Promise<readonly GuestCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.status.value === status);
  }`,
      `async findExpired(beforeDate: Date): Promise<readonly GuestCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => new Date(e.expiresAt).getTime() < beforeDate.getTime());
  }`,
      `async findMergable(): Promise<readonly GuestCartEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.canMerge());
  }`,
      `async findStaleAbandonable(inactiveHours: number): Promise<readonly GuestCartEntity[]> {
    const cutoff = Date.now() - inactiveHours * 60 * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => e.isActive() && new Date(e.updatedAt).getTime() < cutoff);
  }`,
      paginatedMethod,
      statsMethod(`    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    let mergedCount = 0;
    let abandonedCount = 0;
    let totalItems = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      if (e.isActive()) activeCount++;
      if (e.isMerged()) mergedCount++;
      if (e.isAbandoned()) abandonedCount++;
      totalItems += e.itemCount;
    }
    return {
      total: all.length,
      activeCount,
      mergedCount,
      abandonedCount,
      averageItemCount: all.length ? totalItems / all.length : 0,
      byStatus,
    };`),
      `async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },

  // ═══ 10. CartMerger ═══
  {
    file: 'cart-merger.memory.repository.ts',
    entity: 'CartMergerEntity',
    className: 'CartMerger',
    entityPath: `${DOMAIN}/entities/cart-merger.entity.js`,
    interfaceName: 'CartMergerRepository',
    interfacePath: `${DOMAIN}/repositories/cart-merger.repository.interface.js`,
    voImports: [
      { name: 'CartMergerIdVO', path: `${DOMAIN}/value-objects/primitives/cart-merger-id.vo.js` },
    ],
    methods: [
      `async findByIdVO(id: CartMergerIdVO): Promise<CartMergerEntity | null> {
    return this.findById(id.value);
  }`,
      `async findBySourceCartId(sourceCartId: string): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.sourceCartId.value === sourceCartId);
  }`,
      `async findByTargetCartId(targetCartId: string): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.targetCartId.value === targetCartId);
  }`,
      `async findByCartId(cartId: string): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.sourceCartId.value === cartId || e.targetCartId.value === cartId);
  }`,
      `async findCompleted(): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isCompleted());
  }`,
      `async findFailed(): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.isFailed());
  }`,
      `async findWithConflicts(): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.hasConflicts());
  }`,
      `async findIncomplete(): Promise<readonly CartMergerEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => !e.isCompleted() && !e.isFailed());
  }`,
      paginatedMethod,
      statsMethod(`    const byStrategy: Record<string, number> = {};
    let completedCount = 0;
    let failedCount = 0;
    let totalItemsMerged = 0;
    let totalConflicts = 0;
    for (const e of all) {
      byStrategy[e.strategy.value] = (byStrategy[e.strategy.value] ?? 0) + 1;
      if (e.isCompleted()) completedCount++;
      if (e.isFailed()) failedCount++;
      totalItemsMerged += e.itemsMerged;
      totalConflicts += e.conflicts;
    }
    return {
      total: all.length,
      completedCount,
      failedCount,
      totalItemsMerged,
      totalConflicts,
      successRate: all.length ? (completedCount / all.length) * 100 : 0,
      byStrategy,
    };`),
      `async findStale(inactiveMinutes: number): Promise<readonly CartMergerEntity[]> {
    const cutoff = Date.now() - inactiveMinutes * 60 * 1000;
    const all = await this.findAll();
    return all.filter((e) => new Date(e.mergedAt).getTime() < cutoff);
  }`,
      softDeleteMethod,
      restoreMethod,
    ],
  },
];

// ─────────────────────────────────────────────
// GENERATOR
// ─────────────────────────────────────────────
function generateRepo(spec) {
  // Split VO imports: if VO is used as value (e.g., .create()), import normally
  const VALUE_VOS = ['CartItemStatusVO'];
  const voImports = spec.voImports.length
    ? '\n' + spec.voImports
        .map((v) => VALUE_VOS.includes(v.name)
          ? `import { ${v.name} } from '${v.path}';`
          : `import type { ${v.name} } from '${v.path}';`)
        .join('\n')
    : '';

  const methods = spec.methods.join('\n\n  ');

  return `/**
 * ${spec.entity} In-Memory Repository
 * @module cart-service/infrastructure/persistence/memory/repositories
 *
 * Implements: ${spec.interfaceName}
 * Auto-generated by scripts/generate-inmemory-repos.mjs
 *
 * ⚠️ Some return types use 'any' — InMemory repos are dev/test-only fallback.
 *    Runtime data structure matches the domain interface exactly.
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

  ${methods}
}
`;
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
function main() {
  if (!existsSync(MEMORY_DIR)) mkdirSync(MEMORY_DIR, { recursive: true });

  let generated = 0;
  let failed = 0;

  for (const spec of SPECS) {
    const targetPath = join(MEMORY_DIR, spec.file);
    try {
      writeFileSync(targetPath, generateRepo(spec), 'utf8');
      console.log(`✅ ${spec.file}`);
      generated++;
    } catch (err) {
      console.error(`❌ ${spec.file} — ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log(`📊 Summary: ${generated} generated, ${failed} failed, ${SPECS.length} total`);
}

main();
