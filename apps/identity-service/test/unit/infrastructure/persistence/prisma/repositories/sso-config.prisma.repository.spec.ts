/**
 * SsoConfigPrismaRepository unit tests
 * @module identity-service/test/unit/infrastructure/persistence/prisma/repositories
 *
 * NOTE: SsoConfigPrismaRepository is a stub.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SsoConfigPrismaRepository } from '@infrastructure/persistence/prisma/repositories/sso-config.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

describe('SsoConfigPrismaRepository', () => {
  let repo: SsoConfigPrismaRepository;

  beforeEach(() => {
    const prisma = makeMockPrismaService(['authSso']);
    repo = new SsoConfigPrismaRepository(prisma as never);
  });

  it('findById returns null (stub)', async () => {
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findByName returns null (stub)', async () => {
    expect(await repo.findByName('saml')).toBeNull();
  });

  it('findByProvider returns [] (stub)', async () => {
    expect(await repo.findByProvider('saml')).toEqual([]);
  });

  it('findActive returns [] (stub)', async () => {
    expect(await repo.findActive()).toEqual([]);
  });

  it('findAll returns [] (stub)', async () => {
    expect(await repo.findAll()).toEqual([]);
  });

  it('exists returns false (stub)', async () => {
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(false);
  });

  it('save returns entity (stub)', async () => {
    const entity = { id: 'x' } as never;
    expect(await repo.save(entity)).toBe(entity);
  });

  it('delete is no-op', async () => {
    await expect(repo.delete(TEST_IDS.USER_ID)).resolves.toBeUndefined();
  });

  it('softDelete is no-op', async () => {
    await expect(repo.softDelete(TEST_IDS.USER_ID)).resolves.toBeUndefined();
  });

  it('findPaginated returns empty page', async () => {
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.items).toEqual([]);
    expect(r.total).toBe(0);
  });

  it('getStats returns zeros', async () => {
    const stats = await repo.getStats();
    expect(stats.total).toBe(0);
    expect(stats.activeCount).toBe(0);
  });
});
