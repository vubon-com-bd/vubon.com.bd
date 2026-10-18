/**
 * Primitive Value Objects — Grouped Test
 * @module identity-service/test/unit/domain
 *
 * Covers all ~63 primitive VOs in one file for maintainability.
 */
import { describe, it, expect } from '@jest/globals';

// ─── ID VOs ───────────────────────────────────
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';
import { VerificationIdVO } from '@domain/value-objects/primitives/verification-id.vo.js';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { RoleIdVO } from '@domain/value-objects/primitives/role-id.vo.js';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo.js';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo.js';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo.js';
import { BiometricIdVO } from '@domain/value-objects/primitives/biometric-id.vo.js';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo.js';
import { PreferenceIdVO } from '@domain/value-objects/primitives/preference-id.vo.js';
import { SettingIdVO } from '@domain/value-objects/primitives/setting-id.vo.js';

// ─── Auth Type/Status VOs ─────────────────────
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { LoginAttemptStatusVO } from '@domain/value-objects/primitives/login-attempt-status.vo.js';
import { DeviceTypeVO } from '@domain/value-objects/primitives/device-type.vo.js';

// ─── User Type/Status VOs ─────────────────────
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '@domain/value-objects/primitives/user-role.vo.js';
import { UserGenderVO } from '@domain/value-objects/primitives/user-gender.vo.js';
import { UserLanguageVO } from '@domain/value-objects/primitives/user-language.vo.js';
import { UserTimezoneVO } from '@domain/value-objects/primitives/user-timezone.vo.js';

// ─── Profile VOs ──────────────────────────────
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo.js';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo.js';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo.js';

// ─── Address ──────────────────────────────────
import { AddressTypeVO } from '@domain/value-objects/primitives/address-type.vo.js';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo.js';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo.js';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo.js';

// ─── KYC / Activity / Biometric ───────────────
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo.js';
import { KycDocumentTypeVO } from '@domain/value-objects/primitives/kyc-document-type.vo.js';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo.js';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo.js';
import { BiometricTypeVO } from '@domain/value-objects/primitives/biometric-type.vo.js';
import { RecoveryCodeStatusVO } from '@domain/value-objects/primitives/recovery-code-status.vo.js';
import { TwoFactorMethodVO } from '@domain/value-objects/primitives/twofa-method.vo.js';
import { TwoFactorStatusVO } from '@domain/value-objects/primitives/twofa-status.vo.js';

// ─── Contact / Preference / Setting ───────────
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo.js';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo.js';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo.js';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo.js';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo.js';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo.js';

// ─── Email / Password / Name / Code ───────────
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo.js';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo.js';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo.js';
import { UserPermissionVO } from '@domain/value-objects/primitives/user-permission.vo.js';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { OtpCodeVO } from '@domain/value-objects/primitives/otp-code.vo.js';
import { BackupCodeVO } from '@domain/value-objects/primitives/backup-code.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { RecoveryCodeValueVO } from '@domain/value-objects/primitives/recovery-code-value.vo.js';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo.js';
import { CityVO } from '@domain/value-objects/primitives/city.vo.js';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo.js';

// ─── Misc ─────────────────────────────────────
import { DeviceFingerprintVO } from '@domain/value-objects/primitives/device-fingerprint.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { VerificationChannelVO } from '@domain/value-objects/primitives/verification-channel.vo.js';
import { VerificationPurposeVO } from '@domain/value-objects/primitives/verification-purpose.vo.js';
import { VerificationStatusVO } from '@domain/value-objects/primitives/verification-status.vo.js';
import { SocialProviderVO } from '@domain/value-objects/primitives/social-provider.vo.js';
import { OAuthGrantTypeVO } from '@domain/value-objects/primitives/oauth-grant-type.vo.js';
import { SsoProviderVO } from '@domain/value-objects/primitives/sso-provider.vo.js';
import { RoleNameVO } from '@domain/value-objects/primitives/role-name.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('Primitive VOs', () => {
  // ═══════════════════════════════════════════
  // ID VOs
  // ═══════════════════════════════════════════
  describe('ID VOs', () => {
    it.each([
      ['AuthIdVO', AuthIdVO],
      ['SessionIdVO', SessionIdVO],
      ['TokenIdVO', TokenIdVO],
      ['DeviceIdVO', DeviceIdVO],
      ['VerificationIdVO', VerificationIdVO],
      ['MfaIdVO', MfaIdVO],
      ['UserIdVO', UserIdVO],
      ['RoleIdVO', RoleIdVO],
      ['AddressIdVO', AddressIdVO],
      ['KycIdVO', KycIdVO],
      ['ActivityIdVO', ActivityIdVO],
      ['BiometricIdVO', BiometricIdVO],
      ['ContactIdVO', ContactIdVO],
      ['PreferenceIdVO', PreferenceIdVO],
      ['SettingIdVO', SettingIdVO],
    ])('%s.create() accepts UUID', (_name, VO) => {
      const vo = VO.create(UUID);
      expect(vo.value).toBe(UUID);
    });

    it.each([
      ['AuthIdVO', AuthIdVO],
      ['UserIdVO', UserIdVO],
      ['SessionIdVO', SessionIdVO],
    ])('%s.create() rejects non-UUID', (_name, VO) => {
      expect(() => VO.create('not-a-uuid')).toThrow();
    });

    it.each([
      ['AuthIdVO', AuthIdVO],
      ['UserIdVO', UserIdVO],
    ])('%s.create() rejects empty', (_name, VO) => {
      expect(() => VO.create('')).toThrow();
    });

    it('UserIdVO.reconstitute() bypasses validation', () => {
      expect(UserIdVO.reconstitute('x').value).toBe('x');
    });
  });

  // ═══════════════════════════════════════════
  // Auth Type/Status
  // ═══════════════════════════════════════════
  describe('AuthTypeVO', () => {
    it('create password', () => expect(AuthTypeVO.create('password').isPassword()).toBe(true));
    it('create otp', () => expect(AuthTypeVO.create('otp').isOtp()).toBe(true));
    it('isFederated true for social', () => expect(AuthTypeVO.social().isFederated()).toBe(true));
    it('isFederated false for password', () => expect(AuthTypeVO.password().isFederated()).toBe(false));
    it('requiresPassword', () => expect(AuthTypeVO.password().requiresPassword()).toBe(true));
    it('rejects invalid', () => expect(() => AuthTypeVO.create('xyz')).toThrow());
  });

  describe('AuthStatusVO', () => {
    it('active', () => expect(AuthStatusVO.active().isActive()).toBe(true));
    it('locked', () => expect(AuthStatusVO.locked().isLocked()).toBe(true));
    it('pending isUsable false', () => expect(AuthStatusVO.pending().isUsable()).toBe(false));
    it('revoked isFinal', () => expect(AuthStatusVO.revoked().isFinal()).toBe(true));
    it('active canTransitionTo inactive', () => expect(AuthStatusVO.active().canTransitionTo('inactive')).toBe(true));
    it('revoked cannotTransitionTo active', () => expect(AuthStatusVO.revoked().canTransitionTo('active')).toBe(false));
    it('rejects invalid', () => expect(() => AuthStatusVO.create('xyz')).toThrow());
  });

  describe('AuthProviderVO', () => {
    it('local', () => expect(AuthProviderVO.local().isLocal()).toBe(true));
    it('google isSocial', () => expect(AuthProviderVO.google().isSocial()).toBe(true));
    it('google isCustom false', () => expect(AuthProviderVO.google().isCustom()).toBe(false));
  });

  describe('AuthMethodVO', () => {
    it('emailPassword isPasswordBased', () => expect(AuthMethodVO.emailPassword().isPasswordBased()).toBe(true));
    it('emailOtp isOtpBased', () => expect(AuthMethodVO.emailOtp().isOtpBased()).toBe(true));
    it('socialLogin isFederated', () => expect(AuthMethodVO.socialLogin().isFederated()).toBe(true));
  });

  describe('SessionStatusVO', () => {
    it('active isActive', () => expect(SessionStatusVO.active().isActive()).toBe(true));
    it('expired isFinal', () => expect(SessionStatusVO.expired().isFinal()).toBe(true));
    it('active canTransitionTo revoked', () => expect(SessionStatusVO.active().canTransitionTo('revoked')).toBe(true));
    it('revoked cannotTransitionTo active', () => expect(SessionStatusVO.revoked().canTransitionTo('active')).toBe(false));
  });

  describe('TokenTypeVO', () => {
    it('access', () => expect(TokenTypeVO.access().isAccess()).toBe(true));
    it('refresh', () => expect(TokenTypeVO.refresh().isRefresh()).toBe(true));
    it('access isShortLived', () => expect(TokenTypeVO.access().isShortLived()).toBe(true));
    it('refresh isLongLived', () => expect(TokenTypeVO.refresh().isLongLived()).toBe(true));
    it('reset isReset', () => expect(TokenTypeVO.reset().isReset()).toBe(true));
  });

  describe('MfaMethodVO', () => {
    it('totp', () => expect(MfaMethodVO.totp().isTotp()).toBe(true));
    it('backupCode', () => expect(MfaMethodVO.backupCode().isBackupCode()).toBe(true));
    it('totp isPrimary', () => expect(MfaMethodVO.totp().isPrimary()).toBe(true));
    it('sms isPrimary false', () => expect(MfaMethodVO.sms().isPrimary()).toBe(false));
  });

  describe('LoginAttemptStatusVO', () => {
    it('success', () => expect(LoginAttemptStatusVO.success().isSuccess()).toBe(true));
    it('failed countsAsFailure', () => expect(LoginAttemptStatusVO.failed().countsAsFailure()).toBe(true));
    it('locked isTerminal', () => expect(LoginAttemptStatusVO.locked().isTerminal()).toBe(true));
  });

  describe('DeviceTypeVO', () => {
    it('mobile isMobile', () => expect(DeviceTypeVO.mobile().isMobile()).toBe(true));
    it('desktop isDesktop', () => expect(DeviceTypeVO.desktop().isDesktop()).toBe(true));
    it('mobile isHandheld', () => expect(DeviceTypeVO.mobile().isHandheld()).toBe(true));
    it('unknown isKnown false', () => expect(DeviceTypeVO.unknown().isKnown()).toBe(false));
  });

  // ═══════════════════════════════════════════
  // User VOs
  // ═══════════════════════════════════════════
  describe('UserStatusVO', () => {
    it('active isActive', () => expect(UserStatusVO.active().isActive()).toBe(true));
    it('active canLogin', () => expect(UserStatusVO.active().canLogin()).toBe(true));
    it('suspended cannot login', () => expect(UserStatusVO.suspended().canLogin()).toBe(false));
    it('deleted isFinal', () => expect(UserStatusVO.deleted().isFinal()).toBe(true));
    it('active canTransitionTo suspended', () => expect(UserStatusVO.active().canTransitionTo('suspended')).toBe(true));
    it('deleted cannotTransitionTo active', () => expect(UserStatusVO.deleted().canTransitionTo('active')).toBe(false));
    it('rejects invalid', () => expect(() => UserStatusVO.create('xyz')).toThrow());
  });

  describe('UserTypeVO', () => {
    it('individual', () => expect(UserTypeVO.individual().isIndividual()).toBe(true));
    it('business requiresKyc', () => expect(UserTypeVO.business().requiresKyc()).toBe(true));
    it('individual requiresKyc false', () => expect(UserTypeVO.individual().requiresKyc()).toBe(false));
    it('vendor requiresVerification true', () => expect(UserTypeVO.vendor().requiresVerification()).toBe(true));
  });

  describe('UserRoleVO', () => {
    it('admin isAdmin', () => expect(UserRoleVO.admin().isAdmin()).toBe(true));
    it('customer isCustomer', () => expect(UserRoleVO.customer().isCustomer()).toBe(true));
    it('superAdmin isSystemRole', () => expect(UserRoleVO.superAdmin().isSystemRole()).toBe(true));
    it('customer isAdmin false', () => expect(UserRoleVO.customer().isAdmin()).toBe(false));
  });

  describe('UserGenderVO', () => {
    it('male', () => expect(UserGenderVO.male().isMale()).toBe(true));
    it('female', () => expect(UserGenderVO.female().isFemale()).toBe(true));
    it('preferNotToSay', () => expect(UserGenderVO.preferNotToSay().isPreferNotToSay()).toBe(true));
    it('rejects invalid', () => expect(() => UserGenderVO.create('xyz')).toThrow());
  });

  describe('UserLanguageVO', () => {
    it('en', () => expect(UserLanguageVO.english().isEnglish).toBe(true));
    it('bn', () => expect(UserLanguageVO.bangla().isBangla).toBe(true));
    it('rejects too long', () => expect(() => UserLanguageVO.create('eng-us-xx')).toThrow());
    it('primaryCode', () => expect(UserLanguageVO.create('en-us').primaryCode).toBe('en'));
  });

  describe('UserTimezoneVO', () => {
    it('dhaka', () => expect(UserTimezoneVO.dhaka().isDhaka).toBe(true));
    it('utc', () => expect(UserTimezoneVO.utc().isUtc).toBe(true));
    it('region', () => expect(UserTimezoneVO.dhaka().region).toBe('Asia'));
    it('rejects invalid', () => expect(() => UserTimezoneVO.create('invalid')).toThrow());
  });

  // ═══════════════════════════════════════════
  // Profile VOs
  // ═══════════════════════════════════════════
  describe('UserAvatarVO', () => {
    it('create valid URL', () => {
      expect(UserAvatarVO.create('https://x.com/a.jpg').value).toBe('https://x.com/a.jpg');
    });
    it('rejects non-http URL', () => expect(() => UserAvatarVO.create('ftp://x')).toThrow());
    it('rejects empty', () => expect(() => UserAvatarVO.create('')).toThrow());
    it('fileName', () => expect(UserAvatarVO.create('https://x.com/a.jpg').fileName).toBe('a.jpg'));
  });

  describe('UserBioVO', () => {
    it('create valid', () => expect(UserBioVO.create('Hello').value).toBe('Hello'));
    it('empty()', () => expect(UserBioVO.empty().isEmpty).toBe(true));
    it('rejects too long', () => expect(() => UserBioVO.create('a'.repeat(600))).toThrow());
    it('length', () => expect(UserBioVO.create('hello').length).toBe(5));
  });

  describe('ProfileVisibilityVO', () => {
    it('public', () => expect(ProfileVisibilityVO.public().isPublic()).toBe(true));
    it('private', () => expect(ProfileVisibilityVO.private().isPrivate()).toBe(true));
    it('onlyMe isDiscoverable false', () => expect(ProfileVisibilityVO.onlyMe().isDiscoverable()).toBe(false));
    it('public isDiscoverable true', () => expect(ProfileVisibilityVO.public().isDiscoverable()).toBe(true));
  });

  // ═══════════════════════════════════════════
  // Address VOs
  // ═══════════════════════════════════════════
  describe('AddressTypeVO', () => {
    it('home', () => expect(AddressTypeVO.home().isHome()).toBe(true));
    it('billing isBilling', () => expect(AddressTypeVO.billing().isBilling()).toBe(true));
    it('shipping isShipping', () => expect(AddressTypeVO.shipping().isShipping()).toBe(true));
  });

  describe('AddressLabelVO', () => {
    it('create valid', () => expect(AddressLabelVO.create('Home').value).toBe('Home'));
    it('rejects empty', () => expect(() => AddressLabelVO.create('')).toThrow());
  });

  describe('DistrictVO', () => {
    it('dhaka', () => expect(DistrictVO.dhaka().isDhaka).toBe(true));
    it('rejects invalid', () => expect(() => DistrictVO.create('xyz')).toThrow());
  });

  describe('DivisionVO', () => {
    it('dhaka', () => expect(DivisionVO.dhaka().isDhaka).toBe(true));
    it('rejects invalid', () => expect(() => DivisionVO.create('xyz')).toThrow());
  });

  // ═══════════════════════════════════════════
  // KYC / Activity / Biometric
  // ═══════════════════════════════════════════
  describe('KycStatusVO', () => {
    it('pending', () => expect(KycStatusVO.pending().isPending()).toBe(true));
    it('verified', () => expect(KycStatusVO.verified().isVerified()).toBe(true));
    it('rejected canRetry', () => expect(KycStatusVO.rejected().canRetry()).toBe(true));
    it('verified isFinal', () => expect(KycStatusVO.verified().isFinal()).toBe(true));
    it('pending canTransitionTo verified', () => expect(KycStatusVO.pending().canTransitionTo('verified')).toBe(true));
  });

  describe('KycDocumentTypeVO', () => {
    it('nationalId isIdentity', () => expect(KycDocumentTypeVO.nationalId().isIdentityDocument()).toBe(true));
    it('tradeLicense isBusiness', () => expect(KycDocumentTypeVO.tradeLicense().isBusinessDocument()).toBe(true));
    it('utilityBill isAddressProof', () => expect(KycDocumentTypeVO.create('utility_bill').isAddressProof()).toBe(true));
  });

  describe('ActivityTypeVO', () => {
    it('login', () => expect(ActivityTypeVO.login().value).toBe('login'));
    it('logout', () => expect(ActivityTypeVO.logout().value).toBe('logout'));
    it('login isSecurityEvent', () => expect(ActivityTypeVO.login().isSecurityEvent()).toBe(true));
    it('profileUpdate isSecurityEvent false', () => expect(ActivityTypeVO.profileUpdate().isSecurityEvent()).toBe(false));
  });

  describe('ActivityTimestampVO', () => {
    it('fromEpochMs', () => expect(ActivityTimestampVO.fromEpochMs(1000).epochMs).toBe(1000));
    it('fromIso', () => expect(ActivityTimestampVO.fromIso('2025-01-01T00:00:00.000Z').epochMs).toBe(1735689600000));
    it('now', () => expect(ActivityTimestampVO.now().epochMs).toBeGreaterThan(0));
    it('rejects negative', () => expect(() => ActivityTimestampVO.fromEpochMs(-1)).toThrow());
    it('secondsAgo', () => expect(ActivityTimestampVO.fromEpochMs(Date.now()).secondsAgo()).toBe(0));
  });

  describe('BiometricTypeVO', () => {
    it('fingerprint', () => expect(BiometricTypeVO.fingerprint().value).toBe('fingerprint'));
    it('faceId', () => expect(BiometricTypeVO.faceId().value).toBe('face_id'));
    it('faceId isStrong', () => expect(BiometricTypeVO.faceId().isStrong()).toBe(true));
    it('voice isStrong false', () => expect(BiometricTypeVO.voice().isStrong()).toBe(false));
  });

  describe('RecoveryCodeStatusVO', () => {
    it('active', () => expect(RecoveryCodeStatusVO.active().isActive()).toBe(true));
    it('used isFinal', () => expect(RecoveryCodeStatusVO.used().isFinal()).toBe(true));
    it('revoked isFinal', () => expect(RecoveryCodeStatusVO.revoked().isFinal()).toBe(true));
  });

  describe('TwoFactorMethodVO', () => {
    it('totp isStrong', () => expect(TwoFactorMethodVO.totp().isStrong()).toBe(true));
    it('webauthn isStrong', () => expect(TwoFactorMethodVO.webauthn().isStrong()).toBe(true));
    it('sms isStrong false', () => expect(TwoFactorMethodVO.sms().isStrong()).toBe(false));
    it('backupCode isFallback', () => expect(TwoFactorMethodVO.backupCode().isFallback()).toBe(true));
  });

  describe('TwoFactorStatusVO', () => {
    it('enabled isEnabled', () => expect(TwoFactorStatusVO.enabled().isEnabled()).toBe(true));
    it('disabled isOperational false', () => expect(TwoFactorStatusVO.disabled().isOperational()).toBe(false));
    it('enabled isOperational true', () => expect(TwoFactorStatusVO.enabled().isOperational()).toBe(true));
  });

  // ═══════════════════════════════════════════
  // Contact / Preference / Setting
  // ═══════════════════════════════════════════
  describe('ContactTypeVO', () => {
    it('email', () => expect(ContactTypeVO.email().isEmail()).toBe(true));
    it('phone', () => expect(ContactTypeVO.phone().isPhone()).toBe(true));
    it('whatsapp isPhone true', () => expect(ContactTypeVO.whatsapp().isPhone()).toBe(true));
    it('whatsapp isMessaging', () => expect(ContactTypeVO.whatsapp().isMessaging()).toBe(true));
    it('email isMessaging false', () => expect(ContactTypeVO.email().isMessaging()).toBe(false));
  });

  describe('ContactValueVO', () => {
    it('create', () => expect(ContactValueVO.create('hello').value).toBe('hello'));
    it('rejects empty', () => expect(() => ContactValueVO.create('')).toThrow());
    it('rejects too long', () => expect(() => ContactValueVO.create('a'.repeat(300))).toThrow());
  });

  describe('PreferenceKeyVO', () => {
    it('newsletter', () => expect(PreferenceKeyVO.newsletter().value).toBe('newsletter'));
    it('securityAlerts isSecurityRelated', () => expect(PreferenceKeyVO.securityAlerts().isSecurityRelated()).toBe(true));
    it('newsletter isMarketing', () => expect(PreferenceKeyVO.newsletter().isMarketing()).toBe(true));
    it('securityAlerts isMarketing false', () => expect(PreferenceKeyVO.securityAlerts().isMarketing()).toBe(false));
  });

  describe('PreferenceValueVO', () => {
    it('boolean', () => expect(PreferenceValueVO.boolean(true).isBoolean).toBe(true));
    it('string', () => expect(PreferenceValueVO.string('x').isString).toBe(true));
    it('number', () => expect(PreferenceValueVO.number(42).isNumber).toBe(true));
    it('asBoolean', () => expect(PreferenceValueVO.boolean(true).asBoolean).toBe(true));
  });

  describe('SettingKeyVO', () => {
    it('theme', () => expect(SettingKeyVO.theme().value).toBe('theme'));
    it('language', () => expect(SettingKeyVO.language().value).toBe('language'));
  });

  describe('SettingValueVO', () => {
    it('boolean', () => expect(SettingValueVO.create({ primitive: true }).isBoolean).toBe(true));
    it('number', () => expect(SettingValueVO.create({ primitive: 10 }).isNumber).toBe(true));
    it('string', () => expect(SettingValueVO.create({ primitive: 'x' }).isString).toBe(true));
    it('rejects too long string', () => expect(() => SettingValueVO.create({ primitive: 'a'.repeat(1001) })).toThrow());
  });

  // ═══════════════════════════════════════════
  // Email / Password / Name / Code
  // ═══════════════════════════════════════════
  describe('UserEmailVO', () => {
    it('create', () => expect(UserEmailVO.create('a@b.com').value).toBe('a@b.com'));
    it('lowercases', () => expect(UserEmailVO.create('A@B.COM').value).toBe('a@b.com'));
    it('rejects invalid', () => expect(() => UserEmailVO.create('xyz')).toThrow());
    it('domain', () => expect(UserEmailVO.create('a@b.com').domain).toBe('b.com'));
    it('localPart', () => expect(UserEmailVO.create('a@b.com').localPart).toBe('a'));
  });

  describe('UserPhoneVO', () => {
    it('create BD', () => expect(UserPhoneVO.create('01712345678').value).toBe('01712345678'));
    it('rejects invalid', () => expect(() => UserPhoneVO.create('abc')).toThrow());
    it('isBangladeshi', () => expect(UserPhoneVO.create('01712345678').isBangladeshi).toBe(true));
  });

  describe('UserNameVO', () => {
    it('create', () => expect(UserNameVO.create('John Doe').value).toBe('John Doe'));
    it('initials', () => expect(UserNameVO.create('John Doe').initials).toBe('JD'));
    it('rejects too short', () => expect(() => UserNameVO.create('J')).toThrow());
  });

  describe('UserPermissionVO', () => {
    it('create', () => expect(UserPermissionVO.create('user:view').value).toBe('user:view'));
    it('resource', () => expect(UserPermissionVO.create('user:view').resource).toBe('user'));
    it('action', () => expect(UserPermissionVO.create('user:view').action).toBe('view'));
    it('wildcard', () => expect(UserPermissionVO.create('*').isWildcard()).toBe(true));
    it('rejects invalid', () => expect(() => UserPermissionVO.create('xyz')).toThrow());
  });

  describe('PasswordHashVO', () => {
    const BCRYPT = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyqJzBvHIW8LmS';
    it('create valid bcrypt', () => expect(PasswordHashVO.create(BCRYPT).value).toBe(BCRYPT));
    it('algorithm', () => expect(PasswordHashVO.create(BCRYPT).algorithm).toBe('bcrypt'));
    it('cost', () => expect(PasswordHashVO.create(BCRYPT).cost).toBe(12));
    it('rejects invalid', () => expect(() => PasswordHashVO.create('plain')).toThrow());
  });

  describe('OtpCodeVO', () => {
    it('create 6 digits', () => expect(OtpCodeVO.create('123456').value).toBe('123456'));
    it('rejects 5 digits', () => expect(() => OtpCodeVO.create('12345')).toThrow());
    it('rejects non-digit', () => expect(() => OtpCodeVO.create('abcdef')).toThrow());
    it('length', () => expect(OtpCodeVO.create('123456').length).toBe(6));
  });

  describe('BackupCodeVO', () => {
    it('create', () => expect(BackupCodeVO.create('ABCD1234').value).toBe('ABCD1234'));
    it('rejects too short', () => expect(() => BackupCodeVO.create('AB12')).toThrow());
    it('matches', () => expect(BackupCodeVO.create('ABCD1234').matches('ABCD1234')).toBe(true));
  });

  describe('TokenValueVO', () => {
    it('create', () => expect(TokenValueVO.create('abcdefghijklmnop').value.length).toBeGreaterThan(0));
    it('rejects too short', () => expect(() => TokenValueVO.create('abc')).toThrow());
    it('masked', () => expect(TokenValueVO.create('abcdefghijklmnop').masked).toContain('...'));
  });

  describe('RecoveryCodeValueVO', () => {
    it('create', () => expect(RecoveryCodeValueVO.create('ABCD1234').value).toBe('ABCD1234'));
    it('rejects too short', () => expect(() => RecoveryCodeValueVO.create('AB')).toThrow());
    it('matches', () => expect(RecoveryCodeValueVO.create('ABCD1234').matches('ABCD1234')).toBe(true));
  });

  describe('AddressLineVO', () => {
    it('create', () => expect(AddressLineVO.create('House 12').value).toBe('House 12'));
    it('rejects too short', () => expect(() => AddressLineVO.create('A')).toThrow());
  });

  describe('CityVO', () => {
    it('create', () => expect(CityVO.create('Dhaka').value).toBe('Dhaka'));
    it('rejects too short', () => expect(() => CityVO.create('D')).toThrow());
  });

  describe('PostalCodeVO', () => {
    it('create 4 digits', () => expect(PostalCodeVO.create('1200').value).toBe('1200'));
    it('rejects 3 digits', () => expect(() => PostalCodeVO.create('120')).toThrow());
    it('rejects non-digit', () => expect(() => PostalCodeVO.create('abcd')).toThrow());
  });

  // ═══════════════════════════════════════════
  // Misc
  // ═══════════════════════════════════════════
  describe('DeviceFingerprintVO', () => {
    it('create', () => expect(DeviceFingerprintVO.create('abc12345').value).toBe('abc12345'));
    it('rejects too short', () => expect(() => DeviceFingerprintVO.create('abc')).toThrow());
  });

  describe('MfaSecretVO', () => {
    it('create valid', () => expect(MfaSecretVO.create('JBSWY3DPEHPK3PXP').value).toBe('JBSWY3DPEHPK3PXP'));
    it('rejects too short', () => expect(() => MfaSecretVO.create('ABC')).toThrow());
    it('masked', () => expect(MfaSecretVO.create('JBSWY3DPEHPK3PXP').masked).toContain('...'));
  });

  describe('IpAddressVO', () => {
    it('IPv4', () => expect(IpAddressVO.create('192.168.1.1').isIpv4).toBe(true));
    it('IPv6', () => expect(IpAddressVO.create('0:0:0:0:0:0:0:1').isIpv6).toBe(true));
    it('rejects invalid', () => expect(() => IpAddressVO.create('xyz')).toThrow());
  });

  describe('UserAgentVO', () => {
    it('create', () => expect(UserAgentVO.create('Mozilla/5.0').value).toBe('Mozilla/5.0'));
    it('rejects empty', () => expect(() => UserAgentVO.create('')).toThrow());
    it('rejects too long', () => expect(() => UserAgentVO.create('a'.repeat(600))).toThrow());
  });

  describe('TokenExpiryVO', () => {
    it('fromEpochSeconds', () => expect(TokenExpiryVO.fromEpochSeconds(1000).expiresAt).toBe(1000));
    it('fromIso', () => expect(TokenExpiryVO.fromIso('2025-01-01T00:00:00.000Z').expiresAt).toBe(1735689600));
    it('rejects invalid epoch', () => expect(() => TokenExpiryVO.fromEpochSeconds(-1)).toThrow());
    it('isExpired', () => expect(TokenExpiryVO.fromEpochSeconds(1000).isExpired()).toBe(true));
  });

  describe('SessionExpiryVO', () => {
    it('create valid', () => {
      const vo = SessionExpiryVO.create({ absoluteExpiresAt: 2000, idleTimeoutSeconds: 300 });
      expect(vo.absoluteExpiresAt).toBe(2000);
      expect(vo.idleTimeoutSeconds).toBe(300);
    });
    it('isAbsoluteExpired', () => {
      expect(SessionExpiryVO.create({ absoluteExpiresAt: 1000, idleTimeoutSeconds: 300 }).isAbsoluteExpired()).toBe(true);
    });
  });

  describe('LockReasonVO', () => {
    it('create', () => expect(LockReasonVO.create('too_many_attempts').kind).toBe('too_many_attempts'));
    it('rejects invalid', () => expect(() => LockReasonVO.create('xyz')).toThrow());
  });

  describe('LockDurationVO', () => {
    it('fromSeconds', () => expect(LockDurationVO.fromSeconds(900).seconds).toBe(900));
    it('fromMinutes', () => expect(LockDurationVO.fromMinutes(15).minutes).toBe(15));
    it('fromHours', () => expect(LockDurationVO.fromHours(1).hours).toBe(1));
    it('rejects too short', () => expect(() => LockDurationVO.fromSeconds(30)).toThrow());
  });

  describe('VerificationChannelVO', () => {
    it('email', () => expect(VerificationChannelVO.email().isEmail()).toBe(true));
    it('sms', () => expect(VerificationChannelVO.sms().isSms()).toBe(true));
    it('whatsapp', () => expect(VerificationChannelVO.whatsapp().isWhatsapp()).toBe(true));
  });

  describe('VerificationPurposeVO', () => {
    it('emailVerify', () => expect(VerificationPurposeVO.emailVerify().isEmailVerify()).toBe(true));
    it('login', () => expect(VerificationPurposeVO.login().isLogin()).toBe(true));
    it('passwordReset', () => expect(VerificationPurposeVO.passwordReset().isPasswordReset()).toBe(true));
  });

  describe('VerificationStatusVO', () => {
    it('pending', () => expect(VerificationStatusVO.pending().isPending()).toBe(true));
    it('verified', () => expect(VerificationStatusVO.verified().isVerified()).toBe(true));
    it('rejected canRetry', () => expect(VerificationStatusVO.rejected().canRetry()).toBe(true));
    it('expired canRetry', () => expect(VerificationStatusVO.expired().canRetry()).toBe(true));
  });

  describe('SocialProviderVO', () => {
    it('google', () => expect(SocialProviderVO.google().value).toBe('google'));
    it('github', () => expect(SocialProviderVO.github().value).toBe('github'));
  });

  describe('OAuthGrantTypeVO', () => {
    it('authorizationCode', () => expect(OAuthGrantTypeVO.authorizationCode().value).toBe('authorization_code'));
    it('requiresRedirectUri true', () => expect(OAuthGrantTypeVO.authorizationCode().requiresRedirectUri()).toBe(true));
    it('requiresClientSecret true', () => expect(OAuthGrantTypeVO.clientCredentials().requiresClientSecret()).toBe(true));
  });

  describe('SsoProviderVO', () => {
    it('saml', () => expect(SsoProviderVO.saml().isSaml()).toBe(true));
    it('oidc', () => expect(SsoProviderVO.oidc().isOidc()).toBe(true));
    it('ldap', () => expect(SsoProviderVO.ldap().isLdap()).toBe(true));
  });

  describe('RoleNameVO', () => {
    it('create admin', () => expect(RoleNameVO.create('admin').value).toBe('admin'));
    it('isAdmin', () => expect(RoleNameVO.create('admin').isAdmin()).toBe(true));
    it('customer isAdmin false', () => expect(RoleNameVO.create('customer').isAdmin()).toBe(false));
  });

  describe('PermissionNameVO', () => {
    it('create', () => expect(PermissionNameVO.create('user:view').value).toBe('user:view'));
    it('resource', () => expect(PermissionNameVO.create('user:view').resource).toBe('user'));
    it('action', () => expect(PermissionNameVO.create('user:view').action).toBe('view'));
    it('wildcard', () => expect(PermissionNameVO.create('*').isWildcard()).toBe(true));
    it('rejects invalid', () => expect(() => PermissionNameVO.create('xyz')).toThrow());
  });

  describe('IdentifierVO', () => {
    it('email', () => expect(IdentifierVO.email('a@b.com').isEmail()).toBe(true));
    it('phone', () => expect(IdentifierVO.phone('01712345678').isPhone()).toBe(true));
    it('username', () => expect(IdentifierVO.username('john_doe').isUsername()).toBe(true));
    it('auto email', () => expect(IdentifierVO.auto('a@b.com').isEmail()).toBe(true));
    it('auto phone', () => expect(IdentifierVO.auto('01712345678').isPhone()).toBe(true));
  });
});
