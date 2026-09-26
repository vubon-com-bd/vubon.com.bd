/**
 * AuthMfaService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthMfaService } from './auth-mfa.service';
import { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import { MfaTypeVO } from '../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../domain/value-objects/primitives/mfa-status.vo';
import { MfaSecretVO } from '../../../domain/value-objects/primitives/mfa-secret.vo';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import { MfaNotFoundAppError, MfaInvalidAppError } from '../../errors/mfa.errors';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = () =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$hash',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const buildMfa = (status: 'disabled' | 'pending' | 'enabled' = 'disabled') =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: MfaStatusVO.of(status),
    secret: status !== 'disabled' ? MfaSecretVO.of('JBSWY3DPEHPK3PXP') : undefined,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockMfaRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findEnabledByUserIds: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((m: AuthMfaEntity) => Promise.resolve(m)),
  delete: jest.fn(),
  exists: jest.fn(),
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

const mockTotp = () => ({
  name: 'TotpService',
  generateSecret: jest.fn(() => 'JBSWY3DPEHPK3PXPABCDEF'),
  buildOtpAuthUrl: jest.fn(() => 'otpauth://totp/test'),
  verify: jest.fn(() => Promise.resolve(true)),
});

const mockRecoveryGen = () => ({
  name: 'RecoveryCodeGeneratorService',
  generate: jest.fn((count: number) => Promise.resolve(Array(count).fill('ABCD-1234'))),
  hash: jest.fn(),
  verify: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'id-test-1'),
  generateUuid: jest.fn(() => 'uuid-test-1'),
});

describe('AuthMfaService', () => {
  let service: AuthMfaService;
  let mfaRepo: ReturnType<typeof mockMfaRepo>;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let totp: ReturnType<typeof mockTotp>;
  let recoveryGen: ReturnType<typeof mockRecoveryGen>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    mfaRepo = mockMfaRepo();
    userRepo = mockUserRepo();
    totp = mockTotp();
    recoveryGen = mockRecoveryGen();
    idGen = mockIdGen();
    service = new AuthMfaService(
      mfaRepo as never,
      userRepo as never,
      totp as never,
      recoveryGen as never,
      idGen as never,
    );
  });

  // ═══════════════════════════════════════════════════════════
  // beginEnrollment
  // ═══════════════════════════════════════════════════════════

  describe('beginEnrollment()', () => {
    it('should throw if user not found', async () => {
      userRepo.findById.mockResolvedValue(null);

      await expect(
        service.beginEnrollment('user-1' as never, { method: 'totp', password: 'x' } as never),
      ).rejects.toThrow(MfaNotFoundAppError);
    });

    it('should generate secret + QR + recovery codes', async () => {
      userRepo.findById.mockResolvedValue(buildUser());
      mfaRepo.findByUserId.mockResolvedValue(null);

      const result = await service.beginEnrollment(
        'user-1' as never,
        { method: 'totp', password: 'x' } as never,
      );

      expect(result.secret).toBeDefined();
      expect(result.qrCodeUrl).toBeDefined();
      expect(result.recoveryCodes).toHaveLength(10);
    });

    it('should create pending MFA entity', async () => {
      userRepo.findById.mockResolvedValue(buildUser());
      mfaRepo.findByUserId.mockResolvedValue(null);

      await service.beginEnrollment(
        'user-1' as never,
        { method: 'totp', password: 'x' } as never,
      );

      const saved = mfaRepo.save.mock.calls[0]![0] as AuthMfaEntity;
      expect(saved.status.value).toBe('pending');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // confirmEnrollment
  // ═══════════════════════════════════════════════════════════

  describe('confirmEnrollment()', () => {
    it('should throw if MFA not found', async () => {
      mfaRepo.findByUserId.mockResolvedValue(null);

      await expect(
        service.confirmEnrollment('user-1' as never, '123456'),
      ).rejects.toThrow(MfaNotFoundAppError);
    });

    it('should throw if code invalid', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('pending'));
      totp.verify.mockResolvedValue(false);

      await expect(
        service.confirmEnrollment('user-1' as never, '000000'),
      ).rejects.toThrow(MfaInvalidAppError);
    });

    it('should enable MFA on valid code', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('pending'));
      totp.verify.mockResolvedValue(true);

      const result = await service.confirmEnrollment('user-1' as never, '123456');

      expect(result.enabled).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // disable
  // ═══════════════════════════════════════════════════════════

  describe('disable()', () => {
    it('should disable MFA', async () => {
      const mfa = buildMfa('enabled');
      mfaRepo.findByUserId.mockResolvedValue(mfa);

      await service.disable('user-1' as never, { password: 'x' } as never);

      expect(mfa.status.value).toBe('disabled');
      expect(mfaRepo.save).toHaveBeenCalled();
    });

    it('should be a no-op when MFA not found', async () => {
      mfaRepo.findByUserId.mockResolvedValue(null);

      await service.disable('user-1' as never, { password: 'x' } as never);

      expect(mfaRepo.save).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // verify
  // ═══════════════════════════════════════════════════════════

  describe('verify()', () => {
    it('should throw when userId missing', async () => {
      await expect(
        service.verify({ challengeId: 'x', code: '123456' } as never),
      ).rejects.toThrow(MfaInvalidAppError);
    });

    it('should return true for valid code', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('enabled'));
      totp.verify.mockResolvedValue(true);

      const result = await service.verify(
        { challengeId: 'x', code: '123456' } as never,
        'user-1' as never,
      );

      expect(result).toBe(true);
    });

    it('should throw for invalid code', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('enabled'));
      totp.verify.mockResolvedValue(false);

      await expect(
        service.verify(
          { challengeId: 'x', code: '000000' } as never,
          'user-1' as never,
        ),
      ).rejects.toThrow(MfaInvalidAppError);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // getStatus
  // ═══════════════════════════════════════════════════════════

  describe('getStatus()', () => {
    it('should return disabled status when no MFA', async () => {
      mfaRepo.findByUserId.mockResolvedValue(null);

      const result = await service.getStatus('user-1' as never);

      expect(result.enabled).toBe(false);
      expect(result.type).toBe('none');
    });

    it('should return enabled status when MFA enabled', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('enabled'));

      const result = await service.getStatus('user-1' as never);

      expect(result.enabled).toBe(true);
      expect(result.type).toBe('totp');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // createChallenge
  // ═══════════════════════════════════════════════════════════

  describe('createChallenge()', () => {
    it('should throw when MFA not enabled', async () => {
      mfaRepo.findByUserId.mockResolvedValue(null);

      await expect(service.createChallenge('user-1' as never)).rejects.toThrow(
        MfaNotFoundAppError,
      );
    });

    it('should return challenge with methods', async () => {
      mfaRepo.findByUserId.mockResolvedValue(buildMfa('enabled'));

      const result = await service.createChallenge('user-1' as never);

      expect(result.challengeId).toBeDefined();
      expect(result.methods).toContain('totp');
      expect(result.expiresAt).toBeDefined();
    });
  });
});
