/**
 * In-Memory Repositories for Application E2E
 * @module cart-service/test/e2e/application/setup
 *
 * Lightweight repos — implements domain repository interfaces.
 * Enables real service → repo → entity flow without DB.
 */
import type { CartRepository, CartPaginationResult, CartStats, CartListOptions } from '@domain/repositories/cart.repository.interface.js';
import type { CartItemRepository } from '@domain/repositories/cart-item.repository.interface.js';
import type { CartCouponRepository } from '@domain/repositories/cart-coupon.repository.interface.js';
import type { CartVoucherRepository } from '@domain/repositories/cart-voucher.repository.interface.js';
import type { SavedForLaterRepository } from '@domain/repositories/saved-for-later.repository.interface.js';
import type { AbandonedCartRepository } from '@domain/repositories/abandoned-cart.repository.interface.js';
import type { GuestCartRepository } from '@domain/repositories/guest-cart.repository.interface.js';
import type { CartMergerRepository } from '@domain/repositories/cart-merger.repository.interface.js';

import type { CartEntity } from '@domain/entities/cart.entity.js';
import type { CartItemEntity } from '@domain/entities/cart-item.entity.js';
import type { CartCouponEntity } from '@domain/entities/cart-coupon.entity.js';
import type { CartVoucherEntity } from '@domain/entities/cart-voucher.entity.js';
import type { SavedForLaterEntity } from '@domain/entities/saved-for-later.entity.js';
import type { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import type { GuestCartEntity } from '@domain/entities/guest-cart.entity.js';
import type { CartMergerEntity } from '@domain/entities/cart-merger.entity.js';

// ═══════════════════════════════════════════
// Generic in-memory store
// ═══════════════════════════════════════════

class InMemoryStore<T extends { id: string }> {
  protected readonly rows = new Map<string, T>();

  clear(): void { this.rows.clear(); }
  get size(): number { return this.rows.size; }
  all(): readonly T[] { return Array.from(this.rows.values()); }
}

// ═══════════════════════════════════════════
// Cart Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryCartRepository extends InMemoryStore<CartEntity> implements CartRepository {
  async findById(id: string): Promise<CartEntity | null> {
    return this.rows.get(id) ?? null;
  }
  async findByIdVO(vo: { value: string }): Promise<CartEntity | null> {
    return this.rows.get(vo.value) ?? null;
  }
  async findAll(): Promise<readonly CartEntity[]> {
    return this.all();
  }
  async save(entity: CartEntity): Promise<CartEntity> {
    this.rows.set(entity.id, entity);
    return entity;
  }
  async delete(id: string): Promise<void> {
    this.rows.delete(id);
  }
  async exists(id: string): Promise<boolean> {
    return this.rows.has(id);
  }
  async findByUserId(userId: string): Promise<readonly CartEntity[]> {
    return this.all().filter((c) => c.userId?.value === userId);
  }
  async findActiveByUserId(userId: string): Promise<CartEntity | null> {
    return (
      this.all().find((c) => c.userId?.value === userId && c.isActive()) ?? null
    );
  }
  async findBySessionId(sessionId: string): Promise<readonly CartEntity[]> {
    return this.all().filter((c) => c.sessionId?.value === sessionId);
  }
  async findActiveBySessionId(sessionId: string): Promise<CartEntity | null> {
    return (
      this.all().find(
        (c) => c.sessionId?.value === sessionId && c.isActive(),
      ) ?? null
    );
  }
  async findByStatus(status: string): Promise<readonly CartEntity[]> {
    return this.all().filter((c) => c.status.value === status);
  }
  async findByIdempotencyKey(key: { value: string }): Promise<CartEntity | null> {
    return (
      this.all().find((c) => c.idempotencyKey?.value === key.value) ?? null
    );
  }
  async findPaginated(options: CartListOptions): Promise<CartPaginationResult> {
    const items = this.all();
    const total = items.length;
    const page = options.page;
    const limit = options.limit;
    const start = (page - 1) * limit;
    return {
      items: items.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async getStats(): Promise<CartStats> {
    const items = this.all();
    const totalValue = items.reduce((s, c) => s + c.total, 0);
    return {
      total: items.length,
      totalValue,
      averageValue: items.length > 0 ? totalValue / items.length : 0,
      averageItemCount:
        items.length > 0
          ? items.reduce((s, c) => s + c.itemCount, 0) / items.length
          : 0,
      byStatus: {},
      byType: {},
    };
  }
  async findStale(): Promise<readonly CartEntity[]> { return []; }
  async findExpired(): Promise<readonly CartEntity[]> { return []; }
  async findAbandonable(): Promise<readonly CartEntity[]> { return []; }
  async findRetryable(): Promise<readonly CartEntity[]> { return []; }
  async countByUserId(userId: string): Promise<number> {
    return (await this.findByUserId(userId)).length;
  }
  async countByStatus(status: string): Promise<number> {
    return (await this.findByStatus(status)).length;
  }
  async countActiveByUserId(userId: string): Promise<number> {
    return (await this.findActiveByUserId(userId)) ? 1 : 0;
  }
  async softDelete(id: string): Promise<void> {
    this.rows.delete(id);
  }
  async restore(_id: string): Promise<void> {}
  async bulkUpdateStatus(): Promise<number> { return 0; }
}

// ═══════════════════════════════════════════
// CartItem Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryCartItemRepository extends InMemoryStore<CartItemEntity> implements CartItemRepository {
  async findById(id: string): Promise<CartItemEntity | null> {
    return this.rows.get(id) ?? null;
  }
  async findByIdVO(vo: { value: string }): Promise<CartItemEntity | null> {
    return this.rows.get(vo.value) ?? null;
  }
  async findAll(): Promise<readonly CartItemEntity[]> { return this.all(); }
  async save(entity: CartItemEntity): Promise<CartItemEntity> {
    this.rows.set(entity.id, entity);
    return entity;
  }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    return this.all().filter((i) => i.cartId.value === cartId);
  }
  async findActiveByCartId(cartId: string): Promise<readonly CartItemEntity[]> {
    return this.all().filter((i) => i.cartId.value === cartId && i.isActive());
  }
  async countByCartId(cartId: string): Promise<number> {
    return (await this.findByCartId(cartId)).length;
  }
  async findByProductId(productId: string): Promise<readonly CartItemEntity[]> {
    return this.all().filter((i) => i.productId.value === productId);
  }
  async findInCartByProduct(cartId: string, productId: string, variantId?: string): Promise<CartItemEntity | null> {
    return (
      this.all().find(
        (i) =>
          i.cartId.value === cartId &&
          i.productId.value === productId &&
          i.variantId?.value === variantId,
      ) ?? null
    );
  }
  async existsInCart(cartId: string, productId: string, variantId?: string): Promise<boolean> {
    return (await this.findInCartByProduct(cartId, productId, variantId)) !== null;
  }
  async findByStatus(status: string): Promise<readonly CartItemEntity[]> {
    return this.all().filter((i) => i.status.value === status);
  }
  async findUnavailableItems(): Promise<readonly CartItemEntity[]> {
    return this.all().filter((i) => !i.isPurchasable());
  }
  async findPaginated(): Promise<never> {
    throw new Error('not used in e2e');
  }
  async getStats(): Promise<never> {
    throw new Error('not used in e2e');
  }
  async findStale(): Promise<readonly CartItemEntity[]> { return []; }
  async deleteByCartId(cartId: string): Promise<number> {
    let count = 0;
    for (const i of this.all()) {
      if (i.cartId.value === cartId) {
        this.rows.delete(i.id);
        count++;
      }
    }
    return count;
  }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// CartCoupon Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryCartCouponRepository extends InMemoryStore<CartCouponEntity> implements CartCouponRepository {
  async findById(id: string): Promise<CartCouponEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<CartCouponEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly CartCouponEntity[]> { return this.all(); }
  async save(entity: CartCouponEntity): Promise<CartCouponEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByCartId(cartId: string): Promise<readonly CartCouponEntity[]> { return this.all().filter((c) => c.cartId.value === cartId); }
  async findUsableByCartId(cartId: string): Promise<CartCouponEntity | null> {
    return this.all().find((c) => c.cartId.value === cartId && c.isUsable()) ?? null;
  }
  async existsByCartAndCode(cartId: string, code: string): Promise<boolean> {
    return this.all().some((c) => c.cartId.value === cartId && c.code.value === code);
  }
  async findByCartAndCode(cartId: string, code: string): Promise<CartCouponEntity | null> {
    return this.all().find((c) => c.cartId.value === cartId && c.code.value === code) ?? null;
  }
  async findByCode(code: string): Promise<readonly CartCouponEntity[]> { return this.all().filter((c) => c.code.value === code); }
  async findByStatus(status: string): Promise<readonly CartCouponEntity[]> { return this.all().filter((c) => c.status.value === status); }
  async findExpired(): Promise<readonly CartCouponEntity[]> { return []; }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async deleteByCartId(cartId: string): Promise<number> {
    let count = 0;
    for (const c of this.all()) if (c.cartId.value === cartId) { this.rows.delete(c.id); count++; }
    return count;
  }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// CartVoucher Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryCartVoucherRepository extends InMemoryStore<CartVoucherEntity> implements CartVoucherRepository {
  async findById(id: string): Promise<CartVoucherEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<CartVoucherEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly CartVoucherEntity[]> { return this.all(); }
  async save(entity: CartVoucherEntity): Promise<CartVoucherEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByCartId(cartId: string): Promise<readonly CartVoucherEntity[]> { return this.all().filter((v) => v.cartId.value === cartId); }
  async findUsableByCartId(cartId: string): Promise<CartVoucherEntity | null> {
    return this.all().find((v) => v.cartId.value === cartId && v.canBeApplied()) ?? null;
  }
  async existsByCartAndCode(cartId: string, code: string): Promise<boolean> {
    return this.all().some((v) => v.cartId.value === cartId && v.code.value === code);
  }
  async findByCartAndCode(cartId: string, code: string): Promise<CartVoucherEntity | null> {
    return this.all().find((v) => v.cartId.value === cartId && v.code.value === code) ?? null;
  }
  async findByCode(code: string): Promise<readonly CartVoucherEntity[]> { return this.all().filter((v) => v.code.value === code); }
  async findByStatus(status: string): Promise<readonly CartVoucherEntity[]> { return this.all().filter((v) => v.status.value === status); }
  async findExpired(): Promise<readonly CartVoucherEntity[]> { return []; }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async deleteByCartId(): Promise<number> { return 0; }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// SavedForLater Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemorySavedForLaterRepository extends InMemoryStore<SavedForLaterEntity> implements SavedForLaterRepository {
  async findById(id: string): Promise<SavedForLaterEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<SavedForLaterEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly SavedForLaterEntity[]> { return this.all(); }
  async save(entity: SavedForLaterEntity): Promise<SavedForLaterEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> { return this.all().filter((s) => s.userId.value === userId); }
  async findActiveByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> {
    return this.all().filter((s) => s.userId.value === userId && s.isActive());
  }
  async findByUserAndProduct(userId: string, productId: string, variantId?: string): Promise<SavedForLaterEntity | null> {
    return this.all().find(
      (s) => s.userId.value === userId && s.productId.value === productId && s.variantId?.value === variantId,
    ) ?? null;
  }
  async existsForUser(userId: string, productId: string, variantId?: string): Promise<boolean> {
    return (await this.findByUserAndProduct(userId, productId, variantId)) !== null;
  }
  async findByStatus(status: string): Promise<readonly SavedForLaterEntity[]> { return this.all().filter((s) => s.status.value === status); }
  async findMovedToCart(): Promise<readonly SavedForLaterEntity[]> { return this.all().filter((s) => s.isMovedToCart()); }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async findStale(): Promise<readonly SavedForLaterEntity[]> { return []; }
  async findPurgeable(): Promise<readonly SavedForLaterEntity[]> { return []; }
  async deleteByUserId(): Promise<number> { return 0; }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// AbandonedCart Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryAbandonedCartRepository extends InMemoryStore<AbandonedCartEntity> implements AbandonedCartRepository {
  async findById(id: string): Promise<AbandonedCartEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<AbandonedCartEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly AbandonedCartEntity[]> { return this.all(); }
  async save(entity: AbandonedCartEntity): Promise<AbandonedCartEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByCartId(cartId: string): Promise<AbandonedCartEntity | null> {
    return this.all().find((a) => a.cartId.value === cartId) ?? null;
  }
  async findByUserId(userId: string): Promise<readonly AbandonedCartEntity[]> { return this.all().filter((a) => a.userId?.value === userId); }
  async findByStatus(status: string): Promise<readonly AbandonedCartEntity[]> { return this.all().filter((a) => a.status.value === status); }
  async findPendingReminders(): Promise<readonly AbandonedCartEntity[]> { return this.all().filter((a) => a.canSendReminder()); }
  async findLostCandidates(): Promise<readonly AbandonedCartEntity[]> { return []; }
  async findRecoverable(): Promise<readonly AbandonedCartEntity[]> { return this.all().filter((a) => a.isRecoverable()); }
  async findRecovered(): Promise<readonly AbandonedCartEntity[]> { return this.all().filter((a) => a.isRecovered()); }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// GuestCart Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryGuestCartRepository extends InMemoryStore<GuestCartEntity> implements GuestCartRepository {
  async findById(id: string): Promise<GuestCartEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<GuestCartEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly GuestCartEntity[]> { return this.all(); }
  async save(entity: GuestCartEntity): Promise<GuestCartEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findByToken(token: string): Promise<GuestCartEntity | null> {
    return this.all().find((g) => g.token.value === token) ?? null;
  }
  async findByCartId(cartId: string): Promise<GuestCartEntity | null> {
    return this.all().find((g) => g.cartId.value === cartId) ?? null;
  }
  async findByStatus(status: string): Promise<readonly GuestCartEntity[]> { return this.all().filter((g) => g.status.value === status); }
  async findExpired(): Promise<readonly GuestCartEntity[]> { return []; }
  async findMergable(): Promise<readonly GuestCartEntity[]> { return this.all().filter((g) => g.canMerge()); }
  async findStaleAbandonable(): Promise<readonly GuestCartEntity[]> { return []; }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async bulkUpdateStatus(): Promise<number> { return 0; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// CartMerger Repository (in-memory)
// ═══════════════════════════════════════════

export class InMemoryCartMergerRepository extends InMemoryStore<CartMergerEntity> implements CartMergerRepository {
  async findById(id: string): Promise<CartMergerEntity | null> { return this.rows.get(id) ?? null; }
  async findByIdVO(vo: { value: string }): Promise<CartMergerEntity | null> { return this.rows.get(vo.value) ?? null; }
  async findAll(): Promise<readonly CartMergerEntity[]> { return this.all(); }
  async save(entity: CartMergerEntity): Promise<CartMergerEntity> { this.rows.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.rows.delete(id); }
  async exists(id: string): Promise<boolean> { return this.rows.has(id); }
  async findBySourceCartId(cartId: string): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => m.sourceCartId.value === cartId); }
  async findByTargetCartId(cartId: string): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => m.targetCartId.value === cartId); }
  async findByCartId(cartId: string): Promise<readonly CartMergerEntity[]> {
    return this.all().filter((m) => m.sourceCartId.value === cartId || m.targetCartId.value === cartId);
  }
  async findCompleted(): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => m.isCompleted()); }
  async findFailed(): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => m.isFailed()); }
  async findWithConflicts(): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => m.hasConflicts()); }
  async findIncomplete(): Promise<readonly CartMergerEntity[]> { return this.all().filter((m) => !m.isCompleted() && !m.isFailed()); }
  async findPaginated(): Promise<never> { throw new Error('not used'); }
  async getStats(): Promise<never> { throw new Error('not used'); }
  async findStale(): Promise<readonly CartMergerEntity[]> { return []; }
  async softDelete(id: string): Promise<void> { this.rows.delete(id); }
  async restore(_id: string): Promise<void> {}
}

// ═══════════════════════════════════════════
// Bundle — a fresh set of repos
// ═══════════════════════════════════════════

export interface E2ERepoBundle {
  readonly carts: InMemoryCartRepository;
  readonly items: InMemoryCartItemRepository;
  readonly coupons: InMemoryCartCouponRepository;
  readonly vouchers: InMemoryCartVoucherRepository;
  readonly saved: InMemorySavedForLaterRepository;
  readonly abandoned: InMemoryAbandonedCartRepository;
  readonly guests: InMemoryGuestCartRepository;
  readonly mergers: InMemoryCartMergerRepository;
}

export function createE2ERepos(): E2ERepoBundle {
  return {
    carts: new InMemoryCartRepository(),
    items: new InMemoryCartItemRepository(),
    coupons: new InMemoryCartCouponRepository(),
    vouchers: new InMemoryCartVoucherRepository(),
    saved: new InMemorySavedForLaterRepository(),
    abandoned: new InMemoryAbandonedCartRepository(),
    guests: new InMemoryGuestCartRepository(),
    mergers: new InMemoryCartMergerRepository(),
  };
}
