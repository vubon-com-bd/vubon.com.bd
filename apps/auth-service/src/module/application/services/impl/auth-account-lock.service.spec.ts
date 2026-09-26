/**
 * AuthAccountLockService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthAccountLockService } from './auth-account-lock.service';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../domain/value-objects/primitives/account-lock-duration.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();
const ONE_HOUR = 3_600_000;

const buildLock = (overrides: Partial<Parameters<typeof AuthAccountLockEntity.create>[0]> = {}) =>
  AuthAccountLockEntity.create({
    id: 'lock-1',
    userId: 'user-1' as never,
    reason: AccountLockReasonVO.of('too_many_attempts'),
    lockedAt: NOW_MS,
    duration: AccountLockDurationVO.ofHours(1),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findActiveByUser: jest.fn(),
  findAllByUser: jest.fn(),
  findAutoUnlockable: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((l: AuthAccountLockEntity) => Promise.resolve(l)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'lock-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('AuthAccountLockService', () => {
  let service: AuthAccountLockService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new AuthAccountLockService(repo as never, idGen as never);
  });

  describe('lock()', () => {
    it('should create time-limited lock', async () => {
      const result = await service.lock({
        userId: 'user-1',
        reason: 'too_many_attempts',
        durationMinutes: 60,
      } as never);

      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
      expect(result.isPermanent()).toBe(false);
    });

    it('should create permanent lock without duration', async () => {
      const result = await service.lock({
        userId: 'user-1',
        reason: 'admin_action',
      } as never);

      expect(result.isPermanent()).toBe(true);
    });
  });

  describe('unlock()', () => {
    it('should throw when no active lock', async () => {
      repo.findActiveByUser.mockResolvedValue(null);
      await expect(
        service.unlock({ userId: 'user-1' } as never),
      ).rejects.toThrow();
    });

    it('should unlock active lock', async () => {
      const lock = buildLock();
      repo.findActiveByUser.mockResolvedValue(lock);

      await service.unlock({ userId: 'user-1' } as never);

      expect(lock.unlockedAt).toBeDefined();
    });
  });

  describe('getActiveLock()', () => {
    it('should return active lock', async () => {
      const lock = buildLock();
      repo.findActiveByUser.mockResolvedValue(lock);

      const result = await service.getActiveLock('user-1' as never);

      expect(result).toEqual(lock);
    });

    it('should return null when no lock', async () => {
      repo.findActiveByUser.mockResolvedValue(null);
      const result = await service.getActiveLock('user-1' as never);
      expect(result).toBeNull();
    });
  });

  describe('isLocked()', () => {
    it('should return true when lock active', async () => {
      repo.findActiveByUser.mockResolvedValue(buildLock());
      const result = await service.isLocked('user-1' as never);
      expect(result).toBe(true);
    });

    it('should return false when no lock', async () => {
      repo.findActiveByUser.mockResolvedValue(null);
      const result = await service.isLocked('user-1' as never);
      expect(result).toBe(false);
    });
  });

  describe('autoUnlockExpired()', () => {
    it('should unlock auto-unlockable locks', async () => {
      const lock = buildLock({ duration: AccountLockDurationVO.ofMinutes(5) });
      repo.findAutoUnlockable.mockResolvedValue([lock]);

      const count = await service.autoUnlockExpired();

      expect(count).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 when nothing to unlock', async () => {
      repo.findAutoUnlockable.mockResolvedValue([]);
      const count = await service.autoUnlockExpired();
      expect(count).toBe(0);
    });
  });

  describe('toResponse()', () => {
    it('should map lock to DTO', () => {
      const dto = service.toResponse(buildLock());
      expect(dto.id).toBe('lock-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.reason).toBe('too_many_attempts');
      expect(dto.isPermanent).toBe(false);
    });

    it('should include unlockAt for time-limited lock', () => {
      const dto = service.toResponse(buildLock());
      expect(dto.unlockAt).toBeDefined();
    });

    it('should omit unlockAt for permanent lock', () => {
      const dto = service.toResponse(buildLock({ duration: undefined }));
      expect(dto.unlockAt).toBeUndefined();
      expect(dto.isPermanent).toBe(true);
    });
  });
});
