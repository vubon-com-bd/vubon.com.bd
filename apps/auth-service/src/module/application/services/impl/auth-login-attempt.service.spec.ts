/**
 * AuthLoginAttemptService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthLoginAttemptService } from './auth-login-attempt.service';
import { AuthLoginAttemptEntity } from '../../../domain/entities/auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../../../domain/value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../../../domain/value-objects/primitives/login-attempt-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildAttempt = (overrides: Partial<Parameters<typeof AuthLoginAttemptEntity.create>[0]> = {}) =>
  AuthLoginAttemptEntity.create({
    id: 'att-1',
    userId: 'user-1' as never,
    ip: LoginAttemptIpVO.of('192.168.1.1'),
    userAgent: 'Mozilla/5.0',
    status: LoginAttemptStatusVO.success(),
    attemptedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  countRecentFailures: jest.fn(),
  findRecentByUser: jest.fn(),
  findByIp: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((a: AuthLoginAttemptEntity) => Promise.resolve(a)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'att-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('AuthLoginAttemptService', () => {
  let service: AuthLoginAttemptService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new AuthLoginAttemptService(repo as never, idGen as never);
  });

  describe('record()', () => {
    it('should create success attempt', async () => {
      const result = await service.record({
        userId: 'user-1' as never,
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        status: 'success',
      });

      expect(repo.save).toHaveBeenCalled();
      expect(result.status.value).toBe('success');
    });

    it('should create failure attempt with reason', async () => {
      const result = await service.record({
        email: 'john@example.com',
        ip: '1.1.1.1',
        userAgent: 'agent',
        status: 'failure',
        failureReason: 'Wrong password',
      });

      expect(result.status.value).toBe('failure');
      expect(result.email).toBe('john@example.com');
    });
  });

  describe('countRecentFailures()', () => {
    it('should delegate with correct window', async () => {
      repo.countRecentFailures.mockResolvedValue(3);

      const result = await service.countRecentFailures(
        'john@example.com',
        '1.1.1.1',
        900_000,
      );

      expect(result).toBe(3);
      expect(repo.countRecentFailures).toHaveBeenCalledWith(
        'john@example.com',
        expect.any(Object),
        expect.any(Number),
      );
    });
  });

  describe('getRecentForUser()', () => {
    it('should delegate with limit', async () => {
      repo.findRecentByUser.mockResolvedValue([buildAttempt()]);

      const result = await service.getRecentForUser('user-1' as never, 10);

      expect(result).toHaveLength(1);
    });

    it('should use default limit 20', async () => {
      repo.findRecentByUser.mockResolvedValue([]);

      await service.getRecentForUser('user-1' as never);

      expect(repo.findRecentByUser).toHaveBeenCalledWith('user-1', 20);
    });
  });

  describe('toResponse()', () => {
    it('should mask IP', () => {
      const dto = service.toResponse(buildAttempt());
      expect(dto.ipMasked).toContain('***');
      expect(dto.ipMasked).not.toBe('192.168.1.1');
    });

    it('should include all fields', () => {
      const dto = service.toResponse(buildAttempt());
      expect(dto.id).toBe('att-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.userAgent).toBe('Mozilla/5.0');
      expect(dto.status).toBe('success');
    });
  });
});
