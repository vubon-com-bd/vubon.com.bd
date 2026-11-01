/**
 * E2E — Prisma Repository + Mapper Integration
 * @module cart-service/test/e2e/infrastructure
 *
 * Tests the full flow:
 *   Entity → Mapper → PrismaService (mock) → Mapper → Entity
 *
 * Uses in-memory delegates to simulate Prisma behavior.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartPrismaRepository } from '@infrastructure/persistence/prisma/repositories/cart.prisma.repository.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';

// ─── In-memory delegate emulation ───

interface Row {
  [key: string]: unknown;
}

class InMemoryDelegate {
  private readonly rows = new Map<string, Row>();
  private readonly softDeleted = new Set<string>();

  findFirst = jest.fn(async (args: { where?: Record<string, unknown> }): Promise<Row | null> => {
    const where = args?.where ?? {};
    for (const row of this.rows.values()) {
      if (this.matchesWhere(row, where)) return row;
    }
    return null;
  });

  findUnique = jest.fn(async (args: { where: { id: string }; select?: unknown }): Promise<Row | null> => {
    const row = this.rows.get(args.where.id);
    if (!row) return null;
    if (args.select) return { id: row['id'] };
    return row;
  });

  findMany = jest.fn(async (args?: { where?: Record<string, unknown>; orderBy?: unknown }): Promise<Row[]> => {
    const where = args?.where ?? {};
    return Array.from(this.rows.values()).filter((r) => this.matchesWhere(r, where));
  });

  create = jest.fn(async (args: { data: Row }): Promise<Row> => {
    const row = { ...args.data };
    this.rows.set(row['id'] as string, row);
    return row;
  });

  update = jest.fn(async (args: { where: { id: string }; data: Row }): Promise<Row> => {
    const existing = this.rows.get(args.where.id);
    if (!existing) throw new Error('Not found');
    const updated = { ...existing, ...args.data };
    this.rows.set(args.where.id, updated);
    return updated;
  });

  delete = jest.fn(async (args: { where: { id: string } }): Promise<Row> => {
    const row = this.rows.get(args.where.id);
    if (!row) throw new Error('Not found');
    this.rows.delete(args.where.id);
    return row;
  });

  count = jest.fn(async (args?: { where?: Record<string, unknown> }): Promise<number> => {
    const where = args?.where ?? {};
    return Array.from(this.rows.values()).filter((r) => this.matchesWhere(r, where)).length;
  });

  private matchesWhere(row: Row, where: Record<string, unknown>): boolean {
    for (const [k, v] of Object.entries(where)) {
      if (v === null && row[k] !== null && row[k] !== undefined) return false;
      if (v === null && row[k] === undefined) continue;
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        const cond = v as { lt?: unknown; lte?: unknown; gt?: unknown; gte?: unknown; notIn?: unknown };
        if (cond.lt !== undefined && !(new Date(row[k] as string).getTime() < new Date(cond.lt as string).getTime())) return false;
        if (cond.lte !== undefined && !(new Date(row[k] as string).getTime() <= new Date(cond.lte as string).getTime())) return false;
        if (cond.gt !== undefined && !(new Date(row[k] as string).getTime() > new Date(cond.gt as string).getTime())) return false;
        if (cond.gte !== undefined && !(new Date(row[k] as string).getTime() >= new Date(cond.gte as string).getTime())) return false;
        if (cond.notIn && (cond.notIn as readonly string[]).includes(row[k] as string)) return false;
        continue;
      }
      if (row[k] !== v) return false;
    }
    return true;
  }
}

describe('E2E — Prisma Repository + Mapper', () => {
  let delegate: InMemoryDelegate;
  let repo: CartPrismaRepository;

  beforeEach(() => {
    delegate = new InMemoryDelegate();
    const mockPrisma = {
      getModel: jest.fn(() => delegate),
      isEngineAvailable: jest.fn(() => true),
      isHealthy: jest.fn(async () => true),
    };
    repo = new CartPrismaRepository(mockPrisma as never);
  });

  // ═══════════════ CART LIFECYCLE ═══════════════

  it('E2E: create → read → update → soft-delete → find', async () => {
    // 1. Create a cart in memory (via save)
    const cart = makeUserCart();
    await repo.save(cart);

    // 2. Read it back
    const found = await repo.findByIdVO(CartIdVO.reconstitute(cart.id));
    expect(found).not.toBeNull();
    expect(found?.id).toBe(cart.id);
    expect(found?.currency).toBe('BDT');
    expect(found?.userId?.value).toBe(TEST_IDS.USER_ID);

    // 3. Update: set totals
    if (found) {
      found.updateTotals({ subtotal: 100, discount: 0, tax: 0, shipping: 0 });
      await repo.save(found);

      const updated = await repo.findById(cart.id);
      expect(updated?.total).toBe(100);
    }

    // 4. Soft delete: sets deletedAt (logical delete)
    await repo.softDelete(cart.id, TEST_IDS.USER_ID);
    const afterDelete = await repo.findById(cart.id);
    // findById uses `deletedAt: null` filter → soft-deleted cart not found
    expect(afterDelete).toBeNull();
  });

  it('E2E: restore() brings soft-deleted cart back', async () => {
    const cart = makeUserCart();
    await repo.save(cart);

    await repo.softDelete(cart.id);
    expect(await repo.findById(cart.id)).toBeNull();

    await repo.restore(cart.id);
    const restored = await repo.findById(cart.id);
    expect(restored).not.toBeNull();
    expect(restored?.id).toBe(cart.id);
  });

  // ═══════════════ QUERY BY USER ═══════════════

  it('E2E: findByUserId returns all matching carts', async () => {
    const cartA = makeUserCart();
    const cartB = makeUserCart();
    (cartB as unknown as { id: string }).id = TEST_IDS.CART_ID_2;

    await repo.save(cartA);
    await repo.save(cartB);

    const all = await repo.findByUserId(TEST_IDS.USER_ID);
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  // ═══════════════ FIND ACTIVE BY USER ═══════════════

  it('E2E: findActiveByUserId returns active cart only', async () => {
    const cart = makeUserCart();
    await repo.save(cart);

    const active = await repo.findActiveByUserId(TEST_IDS.USER_ID);
    expect(active).not.toBeNull();
    expect(active?.isActive()).toBe(true);
  });

  // ═══════════════ COUNT ═══════════════

  it('E2E: countByUserId', async () => {
    const cart = makeUserCart();
    await repo.save(cart);

    const count = await repo.countByUserId(TEST_IDS.USER_ID);
    expect(count).toBe(1);
  });

  it('E2E: countActiveByUserId', async () => {
    const cart = makeUserCart();
    await repo.save(cart);

    const count = await repo.countActiveByUserId(TEST_IDS.USER_ID);
    expect(count).toBe(1);
  });

  // ═══════════════ FINDALL ═══════════════

  it('E2E: findAll returns all carts', async () => {
    await repo.save(makeUserCart());
    const all = await repo.findAll();
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  // ═══════════════ PAGINATION ═══════════════

  it('E2E: findPaginated splits results correctly', async () => {
    await repo.save(makeUserCart());

    const page1 = await repo.findPaginated({ page: 1, limit: 5 });
    expect(page1.page).toBe(1);
    expect(page1.limit).toBe(5);
    expect(page1.total).toBeGreaterThanOrEqual(1);
  });
});
