/**
 * UserRepositoryInMemory — dev fallback coverage
 */
import { UserRepositoryInMemory } from '@infrastructure/persistence/in-memory/user.repository.in-memory';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';

describe('UserRepositoryInMemory', () => {
  let repo: UserRepositoryInMemory;
  const now = '2026-01-01T00:00:00.000Z';

  beforeEach(() => {
    repo = new UserRepositoryInMemory();
  });

  const buildUser = (id = 'u-1') =>
    UserEntity.create({
      id: UserIdVO.create(id),
      email: UserEmailVO.create(`${id}@example.com`),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('findById returns null for missing', async () => {
    expect(await repo.findById('missing')).toBeNull();
  });

  it('save + findById', async () => {
    const u = buildUser();
    await repo.save(u);
    const found = await repo.findById('u-1');
    expect(found?.id).toBe('u-1');
  });

  it('findAll returns all saved', async () => {
    await repo.save(buildUser('u-1'));
    await repo.save(buildUser('u-2'));
    expect((await repo.findAll()).length).toBe(2);
  });

  it('findByEmail finds user', async () => {
    await repo.save(buildUser('u-1'));
    const found = await repo.findByEmail(UserEmailVO.create('u-1@example.com'));
    expect(found?.id).toBe('u-1');
  });

  it('findByEmail returns null for missing', async () => {
    expect(await repo.findByEmail(UserEmailVO.create('missing@example.com'))).toBeNull();
  });

  it('existsByEmail', async () => {
    await repo.save(buildUser('u-1'));
    expect(await repo.existsByEmail(UserEmailVO.create('u-1@example.com'))).toBe(true);
    expect(await repo.existsByEmail(UserEmailVO.create('x@e.com'))).toBe(false);
  });

  it('exists true/false', async () => {
    await repo.save(buildUser('u-1'));
    expect(await repo.exists('u-1')).toBe(true);
    expect(await repo.exists('u-2')).toBe(false);
  });

  it('findByStatus filters', async () => {
    const u = buildUser('u-1');
    u.activate(now);
    await repo.save(u);
    expect((await repo.findByStatus(UserStatusVO.active())).length).toBe(1);
  });

  it('findByType filters', async () => {
    await repo.save(buildUser('u-1'));
    expect((await repo.findByType(UserTypeVO.create('individual'))).length).toBe(1);
  });

  it('findPaginated with search', async () => {
    await repo.save(buildUser('alpha'));
    await repo.save(buildUser('beta'));
    const r = await repo.findPaginated({ page: 1, limit: 10, search: 'alpha' });
    expect(r.items.length).toBe(1);
    expect(r.total).toBe(1);
  });

  it('findPaginated with status filter', async () => {
    const u1 = buildUser('u-1');
    u1.activate(now);
    await repo.save(u1);
    await repo.save(buildUser('u-2'));
    const r = await repo.findPaginated({
      page: 1,
      limit: 10,
      status: UserStatusVO.active(),
    });
    expect(r.items.length).toBe(1);
  });

  it('findPaginated with type filter', async () => {
    await repo.save(buildUser('u-1'));
    const r = await repo.findPaginated({
      page: 1,
      limit: 10,
      type: UserTypeVO.create('individual'),
    });
    expect(r.items.length).toBe(1);
  });

  it('countByStatus', async () => {
    const u = buildUser('u-1');
    u.activate(now);
    await repo.save(u);
    expect(await repo.countByStatus(UserStatusVO.active())).toBe(1);
  });

  it('delete removes user', async () => {
    await repo.save(buildUser('u-1'));
    await repo.delete('u-1');
    expect(await repo.exists('u-1')).toBe(false);
  });

  it('softDelete is no-op', async () => {
    await repo.save(buildUser('u-1'));
    await repo.softDelete(UserIdVO.create('u-1'));
    expect(await repo.exists('u-1')).toBe(true);
  });

  it('findPaginated pagination', async () => {
    for (let i = 0; i < 5; i++) await repo.save(buildUser(`u-${i}`));
    const r = await repo.findPaginated({ page: 1, limit: 2 });
    expect(r.items.length).toBe(2);
    expect(r.total).toBe(5);
  });
});
