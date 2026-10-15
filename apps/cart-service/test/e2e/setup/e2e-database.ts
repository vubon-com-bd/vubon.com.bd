/**
 * E2E In-Memory Database
 * @module cart-service/test/e2e/setup
 *
 * Simple in-memory maps for E2E isolation between tests.
 * Production uses Prisma; E2E uses this for speed + determinism.
 */

export interface InMemoryTable<TEntity> {
  readonly id: string;
  readonly entity: TEntity;
}

export class InMemoryStore<TEntity extends { id: string }> {
  private readonly rows = new Map<string, TEntity>();

  add(entity: TEntity): void {
    this.rows.set(entity.id, entity);
  }

  get(id: string): TEntity | undefined {
    return this.rows.get(id);
  }

  has(id: string): boolean {
    return this.rows.has(id);
  }

  all(): readonly TEntity[] {
    return Array.from(this.rows.values());
  }

  update(id: string, entity: TEntity): void {
    this.rows.set(id, entity);
  }

  delete(id: string): void {
    this.rows.delete(id);
  }

  clear(): void {
    this.rows.clear();
  }

  get size(): number {
    return this.rows.size;
  }
}

/**
 * Global E2E database — reset in beforeEach.
 */
export class E2EDatabase {
  readonly carts = new InMemoryStore<{ id: string }>();
  readonly items = new InMemoryStore<{ id: string }>();
  readonly coupons = new InMemoryStore<{ id: string }>();
  readonly vouchers = new InMemoryStore<{ id: string }>();
  readonly saved = new InMemoryStore<{ id: string }>();
  readonly abandoned = new InMemoryStore<{ id: string }>();

  reset(): void {
    this.carts.clear();
    this.items.clear();
    this.coupons.clear();
    this.vouchers.clear();
    this.saved.clear();
    this.abandoned.clear();
  }
}

export const e2eDb = new E2EDatabase();
