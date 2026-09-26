/**
 * AuthSessionService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthSessionService } from './auth-session.service';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSession = (overrides: Partial<Parameters<typeof AuthSessionEntity.create>[0]> = {}) =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockSessionRepo = () => ({
  findById: jest.fn(),
  findByToken: jest.fn(),
  findActiveByUser: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((s: AuthSessionEntity) => Promise.resolve(s)),
  delete: jest.fn(),
  exists: jest.fn(),
  revokeAllForUser: jest.fn(),
  deleteExpired: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'id-test-1'),
  generateUuid: jest.fn(() => 'uuid-test-1'),
});

describe('AuthSessionService', () => {
  let service: AuthSessionService;
  let repo: ReturnType<typeof mockSessionRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockSessionRepo();
    idGen = mockIdGen();
    service = new AuthSessionService(repo as never, idGen as never);
  });

  // ═══════════════════════════════════════════════════════════
  // create
  // ═══════════════════════════════════════════════════════════

  describe('create()', () => {
    it('should create session with default TTL', async () => {
      const result = await service.create({
        userId: 'user-1' as never,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      });

      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
      expect(result.ipAddress).toBe('192.168.1.1');
    });

    it('should accept custom TTL', async () => {
      await service.create({
        userId: 'user-1' as never,
        ipAddress: '1.1.1.1',
        userAgent: 'agent',
        ttlMs: 60_000,
      });

      const savedSession = repo.save.mock.calls[0]![0] as AuthSessionEntity;
      const remaining = savedSession.expiry.remainingMs(Date.now());
      expect(remaining).toBeLessThanOrEqual(60_000);
    });

    it('should accept optional deviceId', async () => {
      const result = await service.create({
        userId: 'user-1' as never,
        ipAddress: '1.1.1.1',
        userAgent: 'agent',
        deviceId: 'device-abc',
      });

      expect(result.deviceId).toBe('device-abc');
    });

    it('should use id generator for session id', async () => {
      await service.create({
        userId: 'user-1' as never,
        ipAddress: '1.1.1.1',
        userAgent: 'agent',
      });

      expect(idGen.generate).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // findActiveByUser
  // ═══════════════════════════════════════════════════════════

  describe('findActiveByUser()', () => {
    it('should delegate to repo', async () => {
      const sessions = [buildSession()];
      repo.findActiveByUser.mockResolvedValue(sessions);

      const result = await service.findActiveByUser('user-1' as never);

      expect(result).toEqual(sessions);
      expect(repo.findActiveByUser).toHaveBeenCalledWith('user-1', expect.any(Number));
    });
  });

  // ═══════════════════════════════════════════════════════════
  // revoke
  // ═══════════════════════════════════════════════════════════

  describe('revoke()', () => {
    it('should revoke session', async () => {
      const session = buildSession();
      repo.findById.mockResolvedValue(session);

      await service.revoke('sess-1');

      expect(session.revokedAt).toBeDefined();
      expect(repo.save).toHaveBeenCalled();
    });

    it('should be a no-op if session not found', async () => {
      repo.findById.mockResolvedValue(null);

      await service.revoke('missing');

      expect(repo.save).not.toHaveBeenCalled();
    });

    it('should accept revoke reason', async () => {
      const session = buildSession();
      repo.findById.mockResolvedValue(session);

      await service.revoke('sess-1', 'user_logout');

      expect(session.revokedAt).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // revokeAllForUser
  // ═══════════════════════════════════════════════════════════

  describe('revokeAllForUser()', () => {
    it('should delegate to repo and return count', async () => {
      repo.revokeAllForUser.mockResolvedValue(3);

      const count = await service.revokeAllForUser('user-1' as never, 'bulk');

      expect(count).toBe(3);
      expect(repo.revokeAllForUser).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // findByToken
  // ═══════════════════════════════════════════════════════════

  describe('findByToken()', () => {
    it('should look up by token value', async () => {
      const session = buildSession();
      repo.findByToken.mockResolvedValue(session);

      const result = await service.findByToken(session.token.value);

      expect(result).toEqual(session);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // toResponse
  // ═══════════════════════════════════════════════════════════

  describe('toResponse()', () => {
    it('should map session to DTO', () => {
      const session = buildSession();
      const dto = service.toResponse(session);

      expect(dto.sessionId).toBe('sess-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.ipAddress).toBe('192.168.1.1');
      expect(typeof dto.isActive).toBe('boolean');
    });

    it('should include revokedAt when revoked', () => {
      const session = buildSession({ revokedAt: NOW_MS });
      const dto = service.toResponse(session);
      expect(dto.revokedAt).toBeDefined();
    });

    it('should NOT include revokedAt for active session', () => {
      const session = buildSession();
      const dto = service.toResponse(session);
      expect(dto.revokedAt).toBeUndefined();
    });
  });
});
