/**
 * AuthService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthService } from './auth.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';
import { UserNotFoundError } from '../../../domain/errors/user.errors';
import { InvalidCredentialsError } from '../../errors/auth.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

// ═══════════════════════════════════════════════════════════
// Mock factories
// ═══════════════════════════════════════════════════════════

const buildUser = (overrides: Partial<Parameters<typeof UserEntity.create>[0]> = {}) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const buildSession = (): AuthSessionEntity =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockUserRepo = () => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  existsByEmail: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((u: UserEntity) => Promise.resolve(u)),
  delete: jest.fn(),
  exists: jest.fn(),
  findByIds: jest.fn(),
  countByStatus: jest.fn(),
});

const mockSessionService = () => ({
  name: 'AuthSessionService',
  create: jest.fn(),
  findActiveByUser: jest.fn(),
  revoke: jest.fn(),
  revokeAllForUser: jest.fn(),
  findByToken: jest.fn(),
  toResponse: jest.fn(),
});

const mockTokenService = () => ({
  name: 'AuthTokenService',
  generate: jest.fn(),
  generatePair: jest.fn(),
  verify: jest.fn(),
  revoke: jest.fn(),
  revokeAllForSubject: jest.fn(),
  refresh: jest.fn(),
});

const mockHasher = () => ({
  name: 'PasswordHasherService',
  hash: jest.fn(),
  verify: jest.fn(),
  needsRehash: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(),
  generateUuid: jest.fn(() => 'uuid-test-1'),
});

// ═══════════════════════════════════════════════════════════
// Test Suite
// ═══════════════════════════════════════════════════════════

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let sessionService: ReturnType<typeof mockSessionService>;
  let tokenService: ReturnType<typeof mockTokenService>;
  let hasher: ReturnType<typeof mockHasher>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    userRepo = mockUserRepo();
    sessionService = mockSessionService();
    tokenService = mockTokenService();
    hasher = mockHasher();
    idGen = mockIdGen();

    service = new AuthService(
      userRepo as never,
      sessionService as never,
      tokenService as never,
      hasher as never,
      idGen as never,
    );
  });

  // ═══════════════════════════════════════════════════════════
  // login
  // ═══════════════════════════════════════════════════════════

  describe('login()', () => {
    it('should throw InvalidCredentialsError when user not found', async () => {
      userRepo.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ identifier: 'noone@example.com', password: 'x' } as never),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError when password wrong', async () => {
      userRepo.findByEmail.mockResolvedValue(buildUser());
      hasher.verify.mockResolvedValue(false);

      await expect(
        service.login({ identifier: 'john@example.com', password: 'wrong' } as never),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it('should create session and return tokens on success', async () => {
      const user = buildUser();
      userRepo.findByEmail.mockResolvedValue(user);
      hasher.verify.mockResolvedValue(true);
      sessionService.create.mockResolvedValue(buildSession());
      sessionService.toResponse.mockReturnValue({ sessionId: 'sess-1' });
      tokenService.generatePair.mockResolvedValue({
        accessToken: 'access-1',
        refreshToken: 'refresh-1',
        tokenType: 'Bearer',
        expiresIn: 900,
        expiresAt: NOW_MS + 900_000,
      });

      const result = await service.login(
        { identifier: 'john@example.com', password: 'Test1234!' } as never,
        { ip: '192.168.1.1', userAgent: 'Mozilla' },
      );

      expect(result).toBeDefined();
      expect((result as { success: boolean }).success).toBe(true);
      expect(sessionService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          ipAddress: '192.168.1.1',
        }),
      );
    });

    it('should use "unknown" for missing ctx values', async () => {
      userRepo.findByEmail.mockResolvedValue(buildUser());
      hasher.verify.mockResolvedValue(true);
      sessionService.create.mockResolvedValue(buildSession());
      sessionService.toResponse.mockReturnValue({});
      tokenService.generatePair.mockResolvedValue({
        accessToken: 'a', refreshToken: 'r', tokenType: 'Bearer',
        expiresIn: 900, expiresAt: 0,
      });

      await service.login({ identifier: 'john@example.com', password: 'x' } as never);

      expect(sessionService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ipAddress: 'unknown',
          userAgent: 'unknown',
        }),
      );
    });
  });

  // ═══════════════════════════════════════════════════════════
  // register
  // ═══════════════════════════════════════════════════════════

  describe('register()', () => {
    it('should throw if email exists', async () => {
      userRepo.existsByEmail.mockResolvedValue(true);

      await expect(
        service.register({
          email: 'exists@example.com',
          password: 'Str0ng!Pass#2024',
          confirmPassword: 'Str0ng!Pass#2024',
          acceptTerms: true,
        } as never),
      ).rejects.toThrow();
    });

    it('should create user and return response', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);
      hasher.hash.mockResolvedValue('$2b$12$abcdefghijklmnopqrstuvwxyz');
      userRepo.save.mockImplementation((u: UserEntity) => Promise.resolve(u));

      const result = await service.register({
        email: 'new@example.com',
        password: 'Str0ng!Pass#2024',
        confirmPassword: 'Str0ng!Pass#2024',
        acceptTerms: true,
        firstName: 'Jane',
        lastName: 'Doe',
      } as never);

      expect(result.verificationSent).toBe(true);
      expect(result.nextStep).toBe('verify_email');
      expect(userRepo.save).toHaveBeenCalled();
    });

    it('should set display name from firstName + lastName', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);
      hasher.hash.mockResolvedValue('$2b$12$hash');
      let savedUser: UserEntity | undefined;
      userRepo.save.mockImplementation((u: UserEntity) => {
        savedUser = u;
        return Promise.resolve(u);
      });

      await service.register({
        email: 'new@example.com',
        password: 'Str0ng!Pass#2024',
        confirmPassword: 'Str0ng!Pass#2024',
        acceptTerms: true,
        firstName: 'Jane',
        lastName: 'Doe',
      } as never);

      expect(savedUser?.name.value).toBe('Jane Doe');
    });

    it('should set "User" as default display name', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);
      hasher.hash.mockResolvedValue('$2b$12$hash');
      let savedUser: UserEntity | undefined;
      userRepo.save.mockImplementation((u: UserEntity) => {
        savedUser = u;
        return Promise.resolve(u);
      });

      await service.register({
        email: 'new@example.com',
        password: 'Str0ng!Pass#2024',
        confirmPassword: 'Str0ng!Pass#2024',
        acceptTerms: true,
      } as never);

      expect(savedUser?.name.value).toBe('User');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // logout
  // ═══════════════════════════════════════════════════════════

  describe('logout()', () => {
    it('should revoke session when sessionId provided', async () => {
      await service.logout({ sessionId: 'sess-1' } as never);
      expect(sessionService.revoke).toHaveBeenCalledWith('sess-1', 'user_logout');
    });

    it('should revoke token when refreshToken provided', async () => {
      tokenService.verify.mockResolvedValue({ id: 'token-1' });
      await service.logout({ refreshToken: 'a'.repeat(64) } as never);
      expect(tokenService.revoke).toHaveBeenCalledWith('token-1');
    });

    it('should swallow token errors (idempotent)', async () => {
      tokenService.verify.mockRejectedValue(new Error('Invalid token'));
      await expect(
        service.logout({ refreshToken: 'bad-token' } as never),
      ).resolves.not.toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // forgotPassword
  // ═══════════════════════════════════════════════════════════

  describe('forgotPassword()', () => {
    it('should be a no-op (side effects via saga)', async () => {
      await expect(
        service.forgotPassword({ identifier: 'john@example.com' } as never),
      ).resolves.toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // resetPassword
  // ═══════════════════════════════════════════════════════════

  describe('resetPassword()', () => {
    it('should update password hash', async () => {
      tokenService.verify.mockResolvedValue({ id: 'token-1', subjectId: 'user-1' });
      userRepo.findById.mockResolvedValue(buildUser());
      hasher.hash.mockResolvedValue('$2b$12$abcdefghijklmnopqrstuvwxyz');
      userRepo.save.mockImplementation((u: UserEntity) => Promise.resolve(u));

      await service.resetPassword({
        token: 'a'.repeat(32),
        newPassword: 'NewPass123!',
        confirmPassword: 'NewPass123!',
      } as never);

      expect(userRepo.save).toHaveBeenCalled();
      expect(tokenService.revoke).toHaveBeenCalledWith('token-1');
    });

    it('should throw when user not found', async () => {
      tokenService.verify.mockResolvedValue({ id: 'token-1', subjectId: 'user-99' });
      userRepo.findById.mockResolvedValue(null);

      await expect(
        service.resetPassword({
          token: 'a'.repeat(32),
          newPassword: 'NewPass123!',
          confirmPassword: 'NewPass123!',
        } as never),
      ).rejects.toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verifyEmail
  // ═══════════════════════════════════════════════════════════

  describe('verifyEmail()', () => {
    it('should mark email verified', async () => {
      const user = buildUser({ emailVerified: false });
      userRepo.findByEmail.mockResolvedValue(user);
      userRepo.save.mockImplementation((u: UserEntity) => Promise.resolve(u));

      await service.verifyEmail({
        email: 'john@example.com',
        code: '123456',
      } as never);

      expect(user.emailVerified).toBe(true);
    });

    it('should throw when user not found', async () => {
      userRepo.findByEmail.mockResolvedValue(null);

      await expect(
        service.verifyEmail({ email: 'noone@example.com', code: '123456' } as never),
      ).rejects.toThrow();
    });
  });
});
