/**
 * UserVerificationService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserVerificationService } from './user-verification.service';
import { UserVerificationEntity } from '../../../domain/entities/user-verification.entity';
import { VerificationCodeVO } from '../../../domain/value-objects/primitives/verification-code.vo';
import { VerificationTypeVO } from '../../../domain/value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../../../domain/value-objects/primitives/verification-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';

// ⚠️ CRITICAL: Use real current time for expiresAt, not NOW_MS
// because service uses Date.now() internally.
const REAL_NOW = Date.now();

const buildVerification = () =>
  UserVerificationEntity.create({
    id: 'ver-1',
    userId: 'user-1' as never,
    type: VerificationTypeVO.of('email'),
    code: VerificationCodeVO.of('123456'),
    status: VerificationStatusVO.pending(),
    expiresAt: REAL_NOW + 15 * 60 * 1000, // 15 min from NOW (real time)
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((v: UserVerificationEntity) => Promise.resolve(v)),
  delete: jest.fn(),
  exists: jest.fn(),
  findLatestByUserAndType: jest.fn(),
  deleteExpired: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'ver-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserVerificationService', () => {
  let service: UserVerificationService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new UserVerificationService(repo as never, idGen as never);
  });

  describe('request()', () => {
    it('should create verification request', async () => {
      const result = await service.request({
        userId: 'user-1' as never,
        type: 'email',
      });

      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
      expect(result.type.value).toBe('email');
    });

    it('should accept custom TTL', async () => {
      await service.request({
        userId: 'user-1' as never,
        type: 'email',
        ttlMs: 5 * 60 * 1000,
      });

      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('verify()', () => {
    it('should return false when no pending verification', async () => {
      repo.findLatestByUserAndType.mockResolvedValue(null);

      const result = await service.verify({
        userId: 'user-1' as never,
        code: '123456',
        type: 'email',
      });

      expect(result).toBe(false);
    });

    it('should verify with correct code', async () => {
      const v = buildVerification();
      repo.findLatestByUserAndType.mockResolvedValue(v);

      const result = await service.verify({
        userId: 'user-1' as never,
        code: '123456',
        type: 'email',
      });

      expect(result).toBe(true);
      expect(v.status.value).toBe('verified');
    });

    it('should reject with wrong code', async () => {
      const v = buildVerification();
      repo.findLatestByUserAndType.mockResolvedValue(v);

      await expect(
        service.verify({
          userId: 'user-1' as never,
          code: '654321',
          type: 'email',
        }),
      ).rejects.toThrow();
    });
  });

  describe('getLatest()', () => {
    it('should delegate to repo', async () => {
      const v = buildVerification();
      repo.findLatestByUserAndType.mockResolvedValue(v);

      const result = await service.getLatest('user-1' as never, 'email');

      expect(result).toEqual(v);
    });

    it('should return null when not found', async () => {
      repo.findLatestByUserAndType.mockResolvedValue(null);

      const result = await service.getLatest('user-1' as never, 'email');

      expect(result).toBeNull();
    });
  });

  describe('toResponse()', () => {
    it('should map to DTO', () => {
      const dto = service.toResponse(buildVerification());
      expect(dto.id).toBe('ver-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.type).toBe('email');
      expect(dto.status).toBe('pending');
    });
  });
});
