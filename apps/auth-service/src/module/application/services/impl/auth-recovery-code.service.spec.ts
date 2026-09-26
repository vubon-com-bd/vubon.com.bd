/**
 * AuthRecoveryCodeService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthRecoveryCodeService } from './auth-recovery-code.service';
import { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import { RecoveryCodeVO } from '../../../domain/value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../../../domain/value-objects/primitives/recovery-code-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildCode = (overrides: Partial<Parameters<typeof AuthRecoveryCodeEntity.create>[0]> = {}) =>
  AuthRecoveryCodeEntity.create({
    id: 'rc-1',
    userId: 'user-1' as never,
    code: RecoveryCodeVO.of('ABCD-1234'),
    status: RecoveryCodeStatusVO.active(),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findActiveByUserId: jest.fn(),
  findByCode: jest.fn(),
  invalidateAllForUser: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((c: AuthRecoveryCodeEntity) => Promise.resolve(c)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockGenerator = () => ({
  name: 'RecoveryCodeGeneratorService',
  generate: jest.fn((count: number) =>
    Promise.resolve(Array.from({ length: count }, (_, i) => `CODE-${String(i).padStart(4, '0')}`))),
  hash: jest.fn(),
  verify: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'rc-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('AuthRecoveryCodeService', () => {
  let service: AuthRecoveryCodeService;
  let repo: ReturnType<typeof mockRepo>;
  let generator: ReturnType<typeof mockGenerator>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    generator = mockGenerator();
    idGen = mockIdGen();
    service = new AuthRecoveryCodeService(
      repo as never,
      generator as never,
      idGen as never,
    );
  });

  describe('generateForUser()', () => {
    it('should generate default 10 codes', async () => {
      const result = await service.generateForUser('user-1' as never);
      expect(result.codes).toHaveLength(10);
      expect(repo.save).toHaveBeenCalledTimes(10);
    });

    it('should generate custom count', async () => {
      const result = await service.generateForUser('user-1' as never, 5);
      expect(result.codes).toHaveLength(5);
    });

    it('should invalidate previous codes by default', async () => {
      await service.generateForUser('user-1' as never);
      expect(repo.invalidateAllForUser).toHaveBeenCalled();
    });

    it('should skip invalidation when requested', async () => {
      await service.generateForUser('user-1' as never, 5, false);
      expect(repo.invalidateAllForUser).not.toHaveBeenCalled();
    });

    it('should return generatedAt timestamp', async () => {
      const result = await service.generateForUser('user-1' as never);
      expect(result.generatedAt).toBeDefined();
    });
  });

  describe('consume()', () => {
    it('should return false when code not found', async () => {
      repo.findByCode.mockResolvedValue(null);
      const result = await service.consume('user-1' as never, 'ABCD-1234');
      expect(result).toBe(false);
    });

    it('should consume valid code', async () => {
      const code = buildCode();
      repo.findByCode.mockResolvedValue(code);

      const result = await service.consume('user-1' as never, 'ABCD-1234');

      expect(result).toBe(true);
      expect(code.status.value).toBe('used');
    });

    it('should return false for used code', async () => {
      const code = buildCode({ status: RecoveryCodeStatusVO.of('used') });
      repo.findByCode.mockResolvedValue(code);

      const result = await service.consume('user-1' as never, 'ABCD-1234');

      expect(result).toBe(false);
    });
  });

  describe('listActive()', () => {
    it('should delegate to repo', async () => {
      repo.findActiveByUserId.mockResolvedValue([buildCode()]);
      const result = await service.listActive('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });

  describe('invalidateAll()', () => {
    it('should return invalidated count', async () => {
      repo.invalidateAllForUser.mockResolvedValue(5);
      const result = await service.invalidateAll('user-1' as never);
      expect(result).toBe(5);
    });
  });
});
