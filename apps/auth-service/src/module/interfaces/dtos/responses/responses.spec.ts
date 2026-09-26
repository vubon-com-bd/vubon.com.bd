/**
 * Interface Response DTOs — Unit Tests
 * @module auth-service/interfaces/dtos/responses
 */
import 'reflect-metadata';
import { AuthResponseDTO } from './auth.response.dto';
import { SessionResponseDTO } from './session.response.dto';
import { TokenResponseDTO } from './token.response.dto';
import {
  MfaResponseDTO,
  MfaChallengeResponseDTO,
  EnableMfaEnrollResponseDTO,
} from './mfa.response.dto';
import {
  RecoveryCodesResponseDTO,
  RecoveryCodeSummaryDTO,
} from './recovery-code.response.dto';
import { SocialLoginResponseDTO } from './social.response.dto';
import { SsoLoginResponseDTO } from './sso.response.dto';
import { BiometricResponseDTO } from './biometric.response.dto';
import { UserResponseDTO } from './user.response.dto';
import { ProfileResponseDTO } from './profile.response.dto';
import { SettingsResponseDTO } from './settings.response.dto';
import { PreferencesResponseDTO } from './preferences.response.dto';
import { AddressResponseDTO } from './address.response.dto';
import { ContactResponseDTO } from './contact.response.dto';
import { VerificationResponseDTO } from './verification.response.dto';
import { KycResponseDTO } from './kyc.response.dto';
import {
  PermissionResponseDTO,
  RoleResponseDTO,
  UserPermissionResponseDTO,
} from './role-permission.response.dto';
import { AccountLockResponseDTO } from './lock.response.dto';

describe('Interface Response DTOs', () => {
  describe('AuthResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new AuthResponseDTO();
      dto.success = true;
      dto.accessToken = 'tok';
      dto.refreshToken = 'ref';
      dto.tokenType = 'Bearer';
      dto.expiresAt = Date.now() + 900_000;
      expect(dto.success).toBe(true);
      expect(dto.tokenType).toBe('Bearer');
    });

    it('should accept optional MFA fields', () => {
      const dto = new AuthResponseDTO();
      dto.requiresMfa = true;
      dto.challengeId = 'c-1';
      expect(dto.requiresMfa).toBe(true);
    });
  });

  describe('SessionResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new SessionResponseDTO();
      dto.sessionId = 's-1';
      dto.userId = 'u-1';
      dto.ipAddress = '1.1.1.1';
      dto.userAgent = 'agent';
      dto.createdAt = new Date().toISOString();
      dto.expiresAt = new Date().toISOString();
      dto.isActive = true;
      expect(dto.isActive).toBe(true);
    });
  });

  describe('TokenResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new TokenResponseDTO();
      dto.accessToken = 'a';
      dto.refreshToken = 'r';
      dto.tokenType = 'Bearer';
      dto.expiresIn = 900;
      dto.expiresAt = Date.now();
      expect(dto.expiresIn).toBe(900);
    });
  });

  describe('MFA Response DTOs', () => {
    it('MfaResponseDTO shape', () => {
      const dto = new MfaResponseDTO();
      dto.enabled = true;
      dto.type = 'totp';
      expect(dto.enabled).toBe(true);
    });

    it('MfaChallengeResponseDTO shape', () => {
      const dto = new MfaChallengeResponseDTO();
      dto.challengeId = 'c-1';
      dto.methods = ['totp'];
      dto.expiresAt = new Date().toISOString();
      expect(dto.methods).toHaveLength(1);
    });

    it('EnableMfaEnrollResponseDTO shape', () => {
      const dto = new EnableMfaEnrollResponseDTO();
      dto.secret = 'JBSWY3DPEHPK3PXP';
      dto.qrCodeUrl = 'otpauth://totp/...';
      dto.recoveryCodes = ['A', 'B'];
      expect(dto.recoveryCodes).toHaveLength(2);
    });
  });

  describe('Recovery Code Response DTOs', () => {
    it('RecoveryCodesResponseDTO shape', () => {
      const dto = new RecoveryCodesResponseDTO();
      dto.codes = ['ABCD-1234'];
      dto.generatedAt = new Date().toISOString();
      expect(dto.codes).toHaveLength(1);
    });

    it('RecoveryCodeSummaryDTO shape', () => {
      const dto = new RecoveryCodeSummaryDTO();
      dto.id = 'rc-1';
      dto.masked = '****-1234';
      dto.status = 'active';
      dto.createdAt = new Date().toISOString();
      expect(dto.masked).toBe('****-1234');
    });
  });

  describe('Social / SSO Response DTOs', () => {
    it('SocialLoginResponseDTO extends auth shape', () => {
      const dto = new SocialLoginResponseDTO();
      dto.isNewUser = true;
      dto.success = true;
      expect(dto.isNewUser).toBe(true);
    });

    it('SsoLoginResponseDTO extends auth shape', () => {
      const dto = new SsoLoginResponseDTO();
      dto.tenantId = 'acme';
      dto.success = true;
      expect(dto.tenantId).toBe('acme');
    });
  });

  describe('BiometricResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new BiometricResponseDTO();
      dto.enabled = true;
      dto.biometricId = 'bio-1';
      dto.kind = 'fingerprint';
      expect(dto.enabled).toBe(true);
    });
  });

  describe('UserResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new UserResponseDTO();
      dto.id = 'u-1';
      dto.email = 'a@b.com';
      dto.name = 'John';
      dto.status = 'active';
      dto.type = 'customer';
      dto.roles = ['customer'];
      dto.emailVerified = true;
      dto.phoneVerified = false;
      dto.mfaEnabled = false;
      dto.createdAt = new Date().toISOString();
      dto.updatedAt = new Date().toISOString();
      expect(dto.email).toBe('a@b.com');
    });
  });

  describe('Profile / Settings / Preferences DTOs', () => {
    it('ProfileResponseDTO shape', () => {
      const dto = new ProfileResponseDTO();
      dto.userId = 'u-1';
      dto.displayName = 'John';
      dto.locale = 'bn-BD';
      dto.updatedAt = new Date().toISOString();
      expect(dto.locale).toBe('bn-BD');
    });

    it('SettingsResponseDTO shape', () => {
      const dto = new SettingsResponseDTO();
      dto.userId = 'u-1';
      dto.twoFactorEnabled = true;
      dto.emailNotifications = true;
      dto.smsNotifications = false;
      dto.pushNotifications = true;
      dto.marketingEmails = false;
      dto.language = 'bn';
      dto.timezone = 'Asia/Dhaka';
      dto.updatedAt = new Date().toISOString();
      expect(dto.twoFactorEnabled).toBe(true);
    });

    it('PreferencesResponseDTO shape', () => {
      const dto = new PreferencesResponseDTO();
      dto.userId = 'u-1';
      dto.theme = 'dark';
      dto.currency = 'BDT';
      dto.dateFormat = 'DD/MM/YYYY';
      dto.reduceMotion = false;
      dto.updatedAt = new Date().toISOString();
      expect(dto.theme).toBe('dark');
    });
  });

  describe('Address / Contact Response DTOs', () => {
    it('AddressResponseDTO shape', () => {
      const dto = new AddressResponseDTO();
      dto.id = 'a-1';
      dto.userId = 'u-1';
      dto.label = 'Home';
      dto.line1 = '123';
      dto.division = 'Dhaka';
      dto.district = 'Dhaka';
      dto.upazila = 'Dhanmondi';
      dto.postalCode = '1205';
      dto.isDefault = true;
      dto.createdAt = new Date().toISOString();
      dto.updatedAt = new Date().toISOString();
      expect(dto.isDefault).toBe(true);
    });

    it('ContactResponseDTO shape', () => {
      const dto = new ContactResponseDTO();
      dto.id = 'c-1';
      dto.userId = 'u-1';
      dto.email = 'a@b.com';
      dto.verified = true;
      dto.createdAt = new Date().toISOString();
      dto.updatedAt = new Date().toISOString();
      expect(dto.verified).toBe(true);
    });
  });

  describe('Verification / KYC Response DTOs', () => {
    it('VerificationResponseDTO shape', () => {
      const dto = new VerificationResponseDTO();
      dto.id = 'v-1';
      dto.userId = 'u-1';
      dto.type = 'email';
      dto.status = 'pending';
      dto.expiresAt = new Date().toISOString();
      dto.createdAt = new Date().toISOString();
      expect(dto.status).toBe('pending');
    });

    it('KycResponseDTO shape', () => {
      const dto = new KycResponseDTO();
      dto.id = 'k-1';
      dto.userId = 'u-1';
      dto.status = 'pending';
      dto.documentType = 'nid';
      dto.documentNumberMasked = '****7890';
      expect(dto.documentNumberMasked).toBe('****7890');
    });
  });

  describe('Role / Permission Response DTOs', () => {
    it('PermissionResponseDTO shape', () => {
      const dto = new PermissionResponseDTO();
      dto.id = 'p-1';
      dto.name = 'user:view';
      dto.resource = 'user';
      dto.action = 'view';
      expect(dto.name).toBe('user:view');
    });

    it('RoleResponseDTO shape', () => {
      const dto = new RoleResponseDTO();
      dto.id = 'r-1';
      dto.name = 'admin';
      dto.description = 'Admin role';
      dto.permissions = ['user:view'];
      dto.isSystem = false;
      dto.createdAt = new Date().toISOString();
      dto.updatedAt = new Date().toISOString();
      expect(dto.permissions).toHaveLength(1);
    });

    it('UserPermissionResponseDTO shape', () => {
      const dto = new UserPermissionResponseDTO();
      dto.permissions = ['user:view'];
      dto.roles = ['admin'];
      dto.isSuperAdmin = false;
      expect(dto.roles).toContain('admin');
    });
  });

  describe('AccountLockResponseDTO', () => {
    it('should be instantiable', () => {
      const dto = new AccountLockResponseDTO();
      dto.id = 'l-1';
      dto.userId = 'u-1';
      dto.reason = 'too_many_attempts';
      dto.lockedAt = new Date().toISOString();
      dto.isCurrentlyLocked = true;
      dto.isPermanent = false;
      expect(dto.isCurrentlyLocked).toBe(true);
    });
  });
});
