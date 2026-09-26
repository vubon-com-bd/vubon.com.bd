/**
 * AuthTokenService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthTokenService } from './auth-token.service';
import { AuthTokenEntity } from '../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../domain/value-objects/primitives/token-expiry.vo';
import { TokenExpiredAppError, TokenInvalidAppError } from '../../errors/token.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildToken = (overrides: Partial<Parameters<typeof AuthTokenEntity.create>[0]> = {}) =>
  AuthTokenEntity.create({
    id: 'tok-1',
    subjectId: 'user-1',
    value: TokenValueVO.of('a'.repeat(64)),
    type: TokenTypeVO.of('access'),
    expiry: TokenExpiryVO.fromEpoch(NOW_MS + 900_000),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockTokenRepo = () => ({
  findById: jest.fn(),
  findByValue: jest.fn(),
  findActiveBySubject: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((t: AuthTokenEntity) => Promise.resolve(t)),
  delete: jest.fn(),
  exists: jest.fn(),
  revokeAllForSubject: jest.fn(),
  deleteExpired: jest.fn(),
});

const mockSigner = () => ({
  name: 'TokenSignerService',
  sign: jest.fn(() => Promise.resolve('signed-token-value')),
  verify: jest.fn(),
  decode: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'tok-new-id'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('AuthTokenService', () => {
  let service: AuthTokenService;
  let repo: ReturnType<typeof mockTokenRepo>;
  let signer: ReturnType<typeof mockSigner>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockTokenRepo();
    signer = mockSigner();
    idGen = mockIdGen();
    service = new AuthTokenService(repo as never, signer as never, idGen as never);
  });

  // ═══════════════════════════════════════════════════════════
  // generate
  // ═══════════════════════════════════════════════════════════

  describe('generate()', () => {
    it('should sign and save token', async () => {
      const result = await service.generate({
        subjectId: 'user-1',
        purpose: 'access',
      });

      expect(signer.sign).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result.subjectId).toBe('user-1');
      expect(result.type.value).toBe('access');
    });

    it('should use id generator', async () => {
      await service.generate({ subjectId: 'user-1', purpose: 'access' });
      expect(idGen.generate).toHaveBeenCalled();
    });

    it('should accept metadata', async () => {
      await service.generate({
        subjectId: 'user-1',
        purpose: 'access',
        metadata: { ip: '192.168.1.1' },
      });

      expect(signer.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: { ip: '192.168.1.1' },
        }),
      );
    });

    it('should accept parentTokenId', async () => {
      const t = await service.generate({
        subjectId: 'user-1',
        purpose: 'refresh',
        parentTokenId: 'access-1',
      });

      expect(t.parentTokenId).toBe('access-1');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // generatePair
  // ═══════════════════════════════════════════════════════════

  describe('generatePair()', () => {
    it('should generate access + refresh tokens', async () => {
      const result = await service.generatePair('user-1');

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.tokenType).toBe('Bearer');
      expect(repo.save).toHaveBeenCalledTimes(2);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verify
  // ═══════════════════════════════════════════════════════════

  describe('verify()', () => {
    it('should throw when signature verification fails', async () => {
      signer.verify.mockRejectedValue(new Error('Bad signature'));

      await expect(service.verify('bad-token')).rejects.toThrow(TokenInvalidAppError);
    });

    it('should throw when token expired', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'tok-1',
        type: 'access',
        iat: 0,
        exp: Math.floor((Date.now() - 1000) / 1000), // expired
      });

      await expect(service.verify('expired-token')).rejects.toThrow(TokenExpiredAppError);
    });

    it('should throw when purpose mismatch', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'tok-1',
        type: 'access',
        iat: 0,
        exp: Math.floor((Date.now() + 900_000) / 1000),
      });

      await expect(service.verify('token', 'refresh')).rejects.toThrow(TokenInvalidAppError);
    });

    it('should throw when token not found in store', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'tok-missing',
        type: 'access',
        iat: 0,
        exp: Math.floor((Date.now() + 900_000) / 1000),
      });
      repo.findById.mockResolvedValue(null);

      await expect(service.verify('token')).rejects.toThrow(TokenInvalidAppError);
    });

    it('should throw when token revoked', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'tok-1',
        type: 'access',
        iat: 0,
        exp: Math.floor((Date.now() + 900_000) / 1000),
      });
      const revoked = buildToken({ revokedAt: Date.now() });
      repo.findById.mockResolvedValue(revoked);

      await expect(service.verify('token')).rejects.toThrow(TokenInvalidAppError);
    });

    it('should return token entity on success', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'tok-1',
        type: 'access',
        iat: 0,
        exp: Math.floor((Date.now() + 900_000) / 1000),
      });
      repo.findById.mockResolvedValue(buildToken());

      const result = await service.verify('token');

      expect(result.id).toBe('tok-1');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // revoke
  // ═══════════════════════════════════════════════════════════

  describe('revoke()', () => {
    it('should revoke token', async () => {
      const token = buildToken();
      repo.findById.mockResolvedValue(token);

      await service.revoke('tok-1');

      expect(token.revokedAt).toBeDefined();
      expect(repo.save).toHaveBeenCalled();
    });

    it('should be a no-op when token not found', async () => {
      repo.findById.mockResolvedValue(null);

      await service.revoke('missing');

      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // revokeAllForSubject
  // ═══════════════════════════════════════════════════════════

  describe('revokeAllForSubject()', () => {
    it('should delegate to repo', async () => {
      repo.revokeAllForSubject.mockResolvedValue(5);

      const count = await service.revokeAllForSubject('user-1');

      expect(count).toBe(5);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // refresh
  // ═══════════════════════════════════════════════════════════

  describe('refresh()', () => {
    it('should verify refresh token, revoke old, generate new pair', async () => {
      signer.verify.mockResolvedValue({
        sub: 'user-1',
        jti: 'refresh-1',
        type: 'refresh',
        iat: 0,
        exp: Math.floor((Date.now() + 86400_000) / 1000),
      });
      repo.findById.mockResolvedValue(
        buildToken({ type: TokenTypeVO.of('refresh') }),
      );

      const result = await service.refresh('old-refresh-token');

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      // Old token revoked + 2 new tokens saved
      expect(repo.save).toHaveBeenCalledTimes(3);
    });
  });
});
