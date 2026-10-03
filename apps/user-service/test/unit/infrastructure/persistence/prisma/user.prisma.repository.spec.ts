/**
 * UserPrismaRepository Unit Test (mocked Prisma)
 */
import { UserPrismaRepository } from '@infrastructure/persistence/prisma/repositories/user.prisma.repository';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import {
  createPrismaServiceMock,
  buildUserRow,
} from '../../../../helpers/prisma-mock';

describe('UserPrismaRepository (mocked)', () => {
  let repo: UserPrismaRepository;
  let prisma: ReturnType<typeof createPrismaServiceMock>;

  beforeEach(() => {
    prisma = createPrismaServiceMock();
    repo = new UserPrismaRepository(prisma as never);
  });

  const buildEntity = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now: '2026-01-01T00:00:00.000Z',
    });

  describe('findById', () => {
    it('should return null when not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      const r = await repo.findById('missing');
      expect(r).toBeNull();
    });

    it('should map Prisma row to domain entity', async () => {
      prisma.user.findUnique.mockResolvedValue(buildUserRow());
      const r = await repo.findById('user-1');
      expect(r).not.toBeNull();
      expect(r!.id).toBe('user-1');
      expect(r!.email.value).toBe('user@example.com');
      expect(r!.status.value).toBe('active');
    });
  });

  describe('save', () => {
    it('should upsert and return mapped entity', async () => {
      prisma.user.upsert.mockResolvedValue(buildUserRow());

      const saved = await repo.save(buildEntity());

      expect(prisma.user.upsert).toHaveBeenCalled();
      expect(saved.email.value).toBe('user@example.com');
      const call = prisma.user.upsert.mock.calls[0][0];
      expect(call.where.id).toBe('user-1');
    });
  });

  describe('exists', () => {
    it('should return true when count > 0', async () => {
      prisma.user.count.mockResolvedValue(1);
      expect(await repo.exists('user-1')).toBe(true);
    });

    it('should return false when count = 0', async () => {
      prisma.user.count.mockResolvedValue(0);
      expect(await repo.exists('missing')).toBe(false);
    });
  });

  describe('findByEmail', () => {
    it('should query by email value', async () => {
      prisma.user.findUnique.mockResolvedValue(buildUserRow());
      const r = await repo.findByEmail(UserEmailVO.create('user@example.com'));
      expect(r).not.toBeNull();
      const call = prisma.user.findUnique.mock.calls[0][0];
      expect(call.where.email).toBe('user@example.com');
    });
  });

  describe('existsByEmail', () => {
    it('should return true for existing email', async () => {
      prisma.user.count.mockResolvedValue(1);
      const r = await repo.existsByEmail(UserEmailVO.create('user@example.com'));
      expect(r).toBe(true);
    });
  });

  describe('findByStatus', () => {
    it('should filter by status', async () => {
      prisma.user.findMany.mockResolvedValue([buildUserRow()]);
      const r = await repo.findByStatus(UserStatusVO.active());
      expect(r.length).toBe(1);
      const call = prisma.user.findMany.mock.calls[0][0];
      expect(call.where.status).toBe('active');
    });
  });

  describe('findPaginated', () => {
    it('should return items and total', async () => {
      prisma.user.findMany.mockResolvedValue([buildUserRow()]);
      prisma.user.count.mockResolvedValue(1);

      const r = await repo.findPaginated({ page: 1, limit: 20 });
      expect(r.items.length).toBe(1);
      expect(r.total).toBe(1);
    });
  });

  describe('softDelete', () => {
    it('should update deletedAt', async () => {
      prisma.user.update.mockResolvedValue(buildUserRow());
      await repo.softDelete(UserIdVO.create('user-1'));
      expect(prisma.user.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call prisma delete', async () => {
      prisma.user.delete.mockResolvedValue(buildUserRow());
      await repo.delete('user-1');
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
    });
  });
});
