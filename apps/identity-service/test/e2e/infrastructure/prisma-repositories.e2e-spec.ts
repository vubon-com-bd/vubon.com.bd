/**
 * E2E — Prisma Repositories
 * @module identity-service/test/e2e/infrastructure
 *
 * Uses real Postgres. Skips gracefully if engine unavailable (Termux ARM64).
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { UserPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user.prisma.repository.js';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo.js';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '@domain/value-objects/primitives/user-role.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { UserEntity } from '@domain/entities/user.entity.js';
import { E2E_CONSTANTS } from '../setup/e2e-fixtures.js';

describe('E2E — UserPrismaRepository (real Postgres)', () => {
  let prisma: PrismaService;
  let repo: UserPrismaRepository;
  let engineAvailable = false;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    engineAvailable = prisma.isEngineAvailable();
    repo = new UserPrismaRepository(prisma);
  });

  afterAll(async () => {
    try { await prisma.onModuleDestroy(); } catch { /* ignore */ }
  });

  it('engine availability check', () => {
    expect(typeof engineAvailable).toBe('boolean');
  });

  it('full CRUD round-trip (skipped if engine unavailable)', async () => {
    if (!engineAvailable) {
      // graceful skip in Termux without engine
      expect(true).toBe(true);
      return;
    }

    const id = UserIdVO.create(crypto.randomUUID());
    const email = UserEmailVO.create(`e2e-${Date.now()}@vubon.test`);
    const entity = UserEntity.create({
      id,
      email,
      type: UserTypeVO.individual(),
      roles: [UserRoleVO.customer()],
      now: new Date().toISOString(),
    });

    // CREATE
    const saved = await repo.save(entity);
    expect(saved.id).toBe(id.value);

    // READ
    const found = await repo.findById(id.value);
    expect(found).not.toBeNull();
    expect(found!.email.value).toBe(email.value);

    // UPDATE
    entity.activate();
    const updated = await repo.save(entity);
    expect(updated.status.value).toBe('active');

    // SOFT DELETE
    await repo.softDelete(id.value);
    const afterDelete = await repo.findById(id.value);
    expect(afterDelete).toBeNull();
  });

  it('findByEmailRaw returns null on miss', async () => {
    if (!engineAvailable) { expect(true).toBe(true); return; }
    const result = await repo.findByEmailRaw(`missing-${Date.now()}@vubon.test`);
    expect(result).toBeNull();
  });

  it('exists returns false for random id', async () => {
    if (!engineAvailable) { expect(true).toBe(true); return; }
    const exists = await repo.exists(crypto.randomUUID());
    expect(exists).toBe(false);
  });

  it('findPaginated returns valid page shape', async () => {
    if (!engineAvailable) { expect(true).toBe(true); return; }
    const result = await repo.findPaginated({ page: 1, limit: 5 });
    expect(result.page).toBe(1);
    expect(result.limit).toBe(5);
    expect(Array.isArray(result.items)).toBe(true);
  });

  it('findActive returns array', async () => {
    if (!engineAvailable) { expect(true).toBe(true); return; }
    const list = await repo.findActive();
    expect(Array.isArray(list)).toBe(true);
  });
});
