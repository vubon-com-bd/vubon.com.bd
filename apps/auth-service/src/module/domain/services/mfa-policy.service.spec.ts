/**
 * MfaPolicyService — Unit Tests
 * @module auth-service/domain/services
 */
import { MfaPolicyService } from './mfa-policy.service';
import { UserEntity } from '../entities/user.entity';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';
import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../value-objects/primitives/mfa-status.vo';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';
import { MfaRequiredError } from '../errors/mfa.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildUser = (roles: UserRoleVO[] = [UserRoleVO.customer()]) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles,
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const buildMfa = (enabled: boolean) =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: enabled ? MfaStatusVO.enabled() : MfaStatusVO.disabled(),
    createdAt: NOW,
    updatedAt: NOW,
  });

const buildTrustedDevice = () =>
  AuthDeviceEntity.create({
    id: 'dev-1',
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('trusted'),
    name: 'iPhone',
    firstSeenAt: NOW_MS,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
  });

const buildUntrustedDevice = () =>
  AuthDeviceEntity.create({
    id: 'dev-1',
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('untrusted'),
    name: 'iPhone',
    firstSeenAt: NOW_MS,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('MfaPolicyService', () => {
  describe('isRequired()', () => {
    it('should require MFA when user has it enabled', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: buildMfa(true),
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should require MFA for admin role', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser([UserRoleVO.of('admin')]),
          mfa: null,
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should require MFA for super_admin', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser([UserRoleVO.superAdmin()]),
          mfa: null,
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should require MFA on high-risk IP', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: null,
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: true,
        }),
      ).toBe(true);
    });

    it('should require MFA on new country', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: null,
          device: buildTrustedDevice(),
          isNewCountry: true,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should require MFA for first-time (no device)', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: null,
          device: null,
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should require MFA for untrusted device', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: null,
          device: buildUntrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(true);
    });

    it('should NOT require MFA for trusted device + no risk', () => {
      expect(
        MfaPolicyService.isRequired({
          user: buildUser(),
          mfa: buildMfa(false),
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toBe(false);
    });
  });

  describe('assertSatisfied()', () => {
    it('should throw MfaRequiredError when admin has no MFA', () => {
      expect(() =>
        MfaPolicyService.assertSatisfied({
          user: buildUser([UserRoleVO.of('admin')]),
          mfa: null,
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).toThrow(MfaRequiredError);
    });

    it('should NOT throw when MFA is enabled', () => {
      expect(() =>
        MfaPolicyService.assertSatisfied({
          user: buildUser(),
          mfa: buildMfa(true),
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).not.toThrow();
    });

    it('should NOT throw for low-risk customer without MFA', () => {
      expect(() =>
        MfaPolicyService.assertSatisfied({
          user: buildUser(),
          mfa: buildMfa(false),
          device: buildTrustedDevice(),
          isNewCountry: false,
          isHighRiskIp: false,
        }),
      ).not.toThrow();
    });
  });
});
