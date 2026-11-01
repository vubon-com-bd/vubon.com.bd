/**
 * OAuthClientPrismaRepository unit tests
 * @module identity-service/test/unit/infrastructure/persistence/prisma/repositories
 *
 * NOTE: OAuthClientPrismaRepository is a stub.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { OAuthClientPrismaRepository } from '@infrastructure/persistence/prisma/repositories/oauth-client.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

describe('OAuthClientPrismaRepository', () => {
  let repo: OAuthClientPrismaRepository;

  beforeEach(() => {
    const prisma = makeMockPrismaService(['authOAuth']);
    repo = new OAuthClientPrismaRepository(prisma as never);
  });

  it('findById returns null (stub)', async () => {
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findByClientId returns null (stub)', async () => {
    expect(await repo.findByClientId('client-1')).toBeNull();
  });

  it('findActiveClients returns [] (stub)', async () => {
    expect(await repo.findActiveClients()).toEqual([]);
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
