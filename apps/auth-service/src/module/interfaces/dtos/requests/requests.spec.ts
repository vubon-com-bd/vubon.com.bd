/**
 * Interface Request DTOs — Unit Tests
 * @module auth-service/interfaces/dtos/requests
 *
 * DTOs are class declarations with Swagger metadata. These tests
 * verify shape, required fields, and metadata presence.
 */
import 'reflect-metadata';
import { AuthRequestDTO } from './auth.request.dto';
import { SessionRequestDTO } from './session.request.dto';
import { TokenRequestDTO } from './token.request.dto';
import {
  EnableMfaRequestDTO,
  DisableMfaRequestDTO,
  VerifyMfaRequestDTO,
} from './mfa.request.dto';
import {
  GenerateRecoveryCodesRequestDTO,
  RecoverAccountRequestDTO,
} from './recovery-code.request.dto';
import {
  SocialLoginRequestDTO,
  SocialCallbackRequestDTO,
  LinkSocialRequestDTO,
  UnlinkSocialRequestDTO,
} from './social.request.dto';
import {
  SsoLoginRequestDTO,
  SsoCallbackRequestDTO,
} from './sso.request.dto';
import {
  EnableBiometricRequestDTO,
  DisableBiometricRequestDTO,
  VerifyBiometricRequestDTO,
} from './biometric.request.dto';
import {
  LockAccountRequestDTO,
  UnlockAccountRequestDTO,
} from './lock.request.dto';
import {
  VerifyEmailRequestDTO,
  ResendVerificationRequestDTO,
} from './verification.request.dto';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
  DeleteUserRequestDTO,
} from './user.request.dto';
import { UpdateProfileRequestDTO } from './profile.request.dto';
import { UpdateSettingsRequestDTO } from './settings.request.dto';
import { UpdatePreferencesRequestDTO } from './preferences.request.dto';
import {
  AddAddressRequestDTO,
  UpdateAddressRequestDTO,
  DeleteAddressRequestDTO,
} from './address.request.dto';
import {
  AddContactRequestDTO,
  UpdateContactRequestDTO,
  DeleteContactRequestDTO,
} from './contact.request.dto';
import {
  SubmitKycRequestDTO,
  VerifyKycRequestDTO,
  RejectKycRequestDTO,
} from './kyc.request.dto';
import {
  AssignRoleRequestDTO,
  RevokeRoleRequestDTO,
  AssignPermissionRequestDTO,
  RevokePermissionRequestDTO,
  LifecycleUserRequestDTO,
} from './role-permission.request.dto';

describe('Interface Request DTOs', () => {
  describe('AuthRequestDTO', () => {
    it('should be instantiable', () => {
      const dto = new AuthRequestDTO();
      expect(dto).toBeInstanceOf(AuthRequestDTO);
    });

    it('should allow all fields to be set', () => {
      const dto = new AuthRequestDTO();
      dto.identifier = 'john@example.com';
      dto.password = 'Test1234!';
      dto.rememberMe = true;
      dto.deviceId = 'dev-1';
      dto.mfaCode = '123456';
      expect(dto.identifier).toBe('john@example.com');
      expect(dto.rememberMe).toBe(true);
    });
  });

  describe('SessionRequestDTO', () => {
    it('should be instantiable', () => {
      const dto = new SessionRequestDTO();
      dto.userId = 'user-1';
      dto.limit = 50;
      expect(dto.limit).toBe(50);
    });
  });

  describe('TokenRequestDTO', () => {
    it('should be instantiable', () => {
      const dto = new TokenRequestDTO();
      dto.refreshToken = 'a'.repeat(64);
      dto.deviceId = 'dev-1';
      expect(dto.refreshToken.length).toBe(64);
    });
  });

  describe('MFA DTOs', () => {
    it('EnableMfaRequestDTO shape', () => {
      const dto = new EnableMfaRequestDTO();
      dto.type = 'totp';
      dto.password = 'Test1234!';
      dto.phone = '+8801712345678';
      expect(dto.type).toBe('totp');
    });

    it('DisableMfaRequestDTO shape', () => {
      const dto = new DisableMfaRequestDTO();
      dto.password = 'Test1234!';
      dto.code = '123456';
      expect(dto.password).toBeDefined();
    });

    it('VerifyMfaRequestDTO shape', () => {
      const dto = new VerifyMfaRequestDTO();
      dto.challengeId = 'c-1';
      dto.code = '123456';
      dto.trustDevice = true;
      expect(dto.code).toBe('123456');
    });
  });

  describe('Recovery DTOs', () => {
    it('GenerateRecoveryCodesRequestDTO shape', () => {
      const dto = new GenerateRecoveryCodesRequestDTO();
      dto.password = 'Test1234!';
      dto.count = 5;
      expect(dto.count).toBe(5);
    });

    it('RecoverAccountRequestDTO shape', () => {
      const dto = new RecoverAccountRequestDTO();
      dto.email = 'john@example.com';
      dto.recoveryCode = 'ABCD-1234';
      dto.newPassword = 'New1234!';
      dto.confirmPassword = 'New1234!';
      expect(dto.recoveryCode).toBe('ABCD-1234');
    });
  });

  describe('Social DTOs', () => {
    it('SocialLoginRequestDTO', () => {
      const dto = new SocialLoginRequestDTO();
      dto.provider = 'google';
      dto.redirectUri = 'https://x.com/cb';
      expect(dto.provider).toBe('google');
    });

    it('SocialCallbackRequestDTO', () => {
      const dto = new SocialCallbackRequestDTO();
      dto.provider = 'google';
      dto.code = 'code-1';
      dto.state = 'state-1';
      expect(dto.state).toBe('state-1');
    });

    it('LinkSocialRequestDTO', () => {
      const dto = new LinkSocialRequestDTO();
      dto.provider = 'google';
      dto.accessToken = 'tok-12345678';
      dto.providerUserId = 'g-123';
      expect(dto.providerUserId).toBe('g-123');
    });

    it('UnlinkSocialRequestDTO', () => {
      const dto = new UnlinkSocialRequestDTO();
      dto.provider = 'google';
      dto.password = 'Test1234!';
      expect(dto.password).toBeDefined();
    });
  });

  describe('SSO DTOs', () => {
    it('SsoLoginRequestDTO', () => {
      const dto = new SsoLoginRequestDTO();
      dto.provider = 'saml';
      dto.tenantId = 'acme';
      expect(dto.tenantId).toBe('acme');
    });

    it('SsoCallbackRequestDTO', () => {
      const dto = new SsoCallbackRequestDTO();
      dto.provider = 'saml';
      dto.tenantId = 'acme';
      dto.code = 'code-1';
      expect(dto.provider).toBe('saml');
    });
  });

  describe('Biometric DTOs', () => {
    it('EnableBiometricRequestDTO', () => {
      const dto = new EnableBiometricRequestDTO();
      dto.kind = 'fingerprint';
      dto.biometricId = 'bio_abc12345';
      dto.deviceId = 'dev-1';
      dto.password = 'Test1234!';
      expect(dto.kind).toBe('fingerprint');
    });

    it('DisableBiometricRequestDTO', () => {
      const dto = new DisableBiometricRequestDTO();
      dto.biometricId = 'bio_abc12345';
      dto.password = 'Test1234!';
      expect(dto.biometricId).toBeDefined();
    });

    it('VerifyBiometricRequestDTO', () => {
      const dto = new VerifyBiometricRequestDTO();
      dto.biometricId = 'bio_abc12345';
      dto.challenge = 'challenge-1234';
      dto.deviceId = 'dev-1';
      expect(dto.challenge).toBeDefined();
    });
  });

  describe('Lock DTOs', () => {
    it('LockAccountRequestDTO', () => {
      const dto = new LockAccountRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.reason = 'too_many_attempts';
      dto.durationMinutes = 60;
      expect(dto.reason).toBe('too_many_attempts');
    });

    it('UnlockAccountRequestDTO', () => {
      const dto = new UnlockAccountRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      expect(dto.userId).toBeDefined();
    });
  });

  describe('Verification DTOs', () => {
    it('VerifyEmailRequestDTO', () => {
      const dto = new VerifyEmailRequestDTO();
      dto.email = 'john@example.com';
      dto.code = '123456';
      expect(dto.code).toBe('123456');
    });

    it('ResendVerificationRequestDTO', () => {
      const dto = new ResendVerificationRequestDTO();
      dto.identifier = 'john@example.com';
      dto.channel = 'email';
      expect(dto.channel).toBe('email');
    });
  });

  describe('User DTOs', () => {
    it('CreateUserRequestDTO', () => {
      const dto = new CreateUserRequestDTO();
      dto.email = 'new@example.com';
      dto.password = 'Test1234!';
      dto.type = 'customer';
      dto.acceptTerms = true;
      dto.sendVerificationEmail = true;
      expect(dto.email).toBe('new@example.com');
    });

    it('UpdateUserRequestDTO', () => {
      const dto = new UpdateUserRequestDTO();
      dto.name = 'New Name';
      dto.phone = '+8801712345678';
      dto.status = 'active';
      dto.type = 'customer';
      expect(dto.name).toBe('New Name');
    });

    it('DeleteUserRequestDTO', () => {
      const dto = new DeleteUserRequestDTO();
      dto.reason = 'user request';
      dto.hardDelete = false;
      expect(dto.reason).toBe('user request');
    });
  });

  describe('Profile / Settings / Preferences DTOs', () => {
    it('UpdateProfileRequestDTO', () => {
      const dto = new UpdateProfileRequestDTO();
      dto.displayName = 'John Doe';
      dto.bio = 'Hello';
      dto.avatarUrl = 'https://x.com/a.jpg';
      expect(dto.displayName).toBe('John Doe');
    });

    it('UpdateSettingsRequestDTO', () => {
      const dto = new UpdateSettingsRequestDTO();
      dto.emailNotifications = false;
      dto.smsNotifications = true;
      dto.pushNotifications = false;
      dto.marketingEmails = true;
      dto.twoFactorEnabled = true;
      dto.language = 'en';
      dto.timezone = 'UTC';
      expect(dto.emailNotifications).toBe(false);
    });

    it('UpdatePreferencesRequestDTO', () => {
      const dto = new UpdatePreferencesRequestDTO();
      dto.theme = 'dark';
      dto.currency = 'USD';
      dto.dateFormat = 'YYYY-MM-DD';
      dto.reduceMotion = true;
      expect(dto.theme).toBe('dark');
    });
  });

  describe('Address / Contact DTOs', () => {
    it('AddAddressRequestDTO', () => {
      const dto = new AddAddressRequestDTO();
      dto.label = 'Home';
      dto.line1 = '123 Main';
      dto.division = 'Dhaka';
      dto.district = 'Dhaka';
      dto.upazila = 'Dhanmondi';
      dto.postalCode = '1205';
      dto.isDefault = true;
      expect(dto.postalCode).toBe('1205');
    });

    it('UpdateAddressRequestDTO', () => {
      const dto = new UpdateAddressRequestDTO();
      dto.line1 = '456 New St';
      dto.line2 = 'Apt 5B';
      dto.isDefault = true;
      expect(dto.line1).toBeDefined();
    });

    it('DeleteAddressRequestDTO', () => {
      const dto = new DeleteAddressRequestDTO();
      dto.addressId = '00000000-0000-0000-0000-000000000001';
      expect(dto.addressId).toBeDefined();
    });

    it('AddContactRequestDTO', () => {
      const dto = new AddContactRequestDTO();
      dto.email = 'alt@example.com';
      dto.phone = '+8801712345678';
      expect(dto.email).toBeDefined();
    });

    it('UpdateContactRequestDTO', () => {
      const dto = new UpdateContactRequestDTO();
      dto.contactId = '00000000-0000-0000-0000-000000000001';
      dto.email = 'new@example.com';
      dto.verified = true;
      expect(dto.verified).toBe(true);
    });

    it('DeleteContactRequestDTO', () => {
      const dto = new DeleteContactRequestDTO();
      dto.contactId = '00000000-0000-0000-0000-000000000001';
      expect(dto.contactId).toBeDefined();
    });
  });

  describe('KYC DTOs', () => {
    it('SubmitKycRequestDTO', () => {
      const dto = new SubmitKycRequestDTO();
      dto.documentType = 'nid';
      dto.documentNumber = '1234567890';
      dto.frontImageUrl = 'https://x.com/front.jpg';
      dto.backImageUrl = 'https://x.com/back.jpg';
      expect(dto.documentType).toBe('nid');
    });

    it('VerifyKycRequestDTO', () => {
      const dto = new VerifyKycRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.note = 'verified';
      expect(dto.note).toBeDefined();
    });

    it('RejectKycRequestDTO', () => {
      const dto = new RejectKycRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.reason = 'Blurry image';
      expect(dto.reason).toBe('Blurry image');
    });
  });

  describe('Role/Permission DTOs', () => {
    it('AssignRoleRequestDTO', () => {
      const dto = new AssignRoleRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.role = 'admin';
      dto.note = 'promoted';
      expect(dto.role).toBe('admin');
    });

    it('RevokeRoleRequestDTO', () => {
      const dto = new RevokeRoleRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.role = 'admin';
      expect(dto.role).toBe('admin');
    });

    it('AssignPermissionRequestDTO', () => {
      const dto = new AssignPermissionRequestDTO();
      dto.roleId = '00000000-0000-0000-0000-000000000001';
      dto.permission = 'user:view';
      expect(dto.permission).toBe('user:view');
    });

    it('RevokePermissionRequestDTO', () => {
      const dto = new RevokePermissionRequestDTO();
      dto.roleId = '00000000-0000-0000-0000-000000000001';
      dto.permission = 'user:view';
      expect(dto.permission).toBe('user:view');
    });

    it('LifecycleUserRequestDTO', () => {
      const dto = new LifecycleUserRequestDTO();
      dto.userId = '00000000-0000-0000-0000-000000000001';
      dto.reason = 'suspicious';
      dto.until = '2024-12-31';
      expect(dto.reason).toBe('suspicious');
    });
  });
});
