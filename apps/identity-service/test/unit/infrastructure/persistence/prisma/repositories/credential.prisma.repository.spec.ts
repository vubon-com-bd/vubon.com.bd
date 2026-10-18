/**
 * CredentialPrismaRepository unit tests
 * @module identity-service/test/unit/infrastructure/persistence/prisma/repositories
 *
 * NOTE: CredentialPrismaRepository is a stub — credentials live on User.password.
 * All methods return null/[] without DB calls.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CredentialPrismaRepository } from '@infrastructure/persistence/prisma/repositories/credential.prisma.repository.js';
import { makeMockPrismaService, TEST_IDS } from '@fixtures/index.js';

describe('CredentialPrismaRepository', () => {
  let repo: CredentialPrismaRepository;

  beforeEach(() => {
    const prisma = makeMockPrismaService(['user']);
    repo = new CredentialPrismaRepository(prisma as never);
  });

  it('findById returns null (stub)', async () => {
    expect(await repo.findById(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findByAuthId returns null (stub)', async () => {
    expect(await repo.findByAuthId({ value: TEST_IDS.USER_ID } as never)).toBeNull();
  });

  it('findByAuthIdRaw returns null (stub)', async () => {
    expect(await repo.findByAuthIdRaw(TEST_IDS.USER_ID)).toBeNull();
  });

  it('findAll returns [] (stub)', async () => {
    expect(await repo.findAll()).toEqual([]);
  });

  it('exists returns false (stub)', async () => {
    expect(await repo.exists(TEST_IDS.USER_ID)).toBe(false);
  });

  it('save returns entity (stub)', async () => {
    const entity = { id: TEST_IDS.USER_ID } as never;
    expect(await repo.save(entity)).toBe(entity);
  });

  it('delete is no-op (stub)', async () => {
    await expect(repo.delete(TEST_IDS.USER_ID)).resolves.toBeUndefined();
  });

  it('softDelete is no-op (stub)', async () => {
    await expect(repo.softDelete(TEST_IDS.USER_ID)).resolves.toBeUndefined();
  });

  it('findPaginated returns empty page (stub)', async () => {
    const r = await repo.findPaginated({ page: 1, limit: 10 });
    expect(r.items).toEqual([]);
    expect(r.total).toBe(0);
  });

  it('findExpired returns [] (stub)', async () => {
    expect(await repo.findExpired()).toEqual([]);
  });

  it('findMustChange returns [] (stub)', async () => {
    expect(await repo.findMustChange()).toEqual([]);
  });
});
