/**
 * Service Mocks for Application Layer tests
 * @module identity-service/test/fixtures/application/mocks
 */
import { jest } from '@jest/globals';

export const makeAuthSessionServiceMock = () => ({
  name: 'AuthSessionService',
  create: jest.fn(),
  findById: jest.fn(),
  findActiveByUser: jest.fn(),
  revoke: jest.fn(),
  revokeAllForUser: jest.fn(),
});

export const makeAuthTokenServiceMock = () => ({
  name: 'AuthTokenService',
  issue: jest.fn(),
  verify: jest.fn(),
  revoke: jest.fn(),
  revokeAllForUser: jest.fn(),
});

export const makeAuthMfaServiceMock = () => ({
  name: 'AuthMfaService',
  setup: jest.fn(),
  enable: jest.fn(),
  disable: jest.fn(),
  challenge: jest.fn(),
  verify: jest.fn(),
});

export const makeAuthRecoveryCodeServiceMock = () => ({
  name: 'AuthRecoveryCodeService',
  generate: jest.fn(),
  verify: jest.fn(),
  countRemaining: jest.fn(),
  revokeAll: jest.fn(),
});

export const makeAuthAccountLockServiceMock = () => ({
  name: 'AuthAccountLockService',
  getStatus: jest.fn(),
  lock: jest.fn(),
  unlock: jest.fn(),
  isLocked: jest.fn(),
});

export const makeAuthLoginAttemptServiceMock = () => ({
  name: 'AuthLoginAttemptService',
  record: jest.fn(),
  listRecent: jest.fn(),
  countRecent: jest.fn(),
});

export const makeAuthDeviceServiceMock = () => ({
  name: 'AuthDeviceService',
  register: jest.fn(),
  trust: jest.fn(),
  untrust: jest.fn(),
  findForUser: jest.fn(),
  isTrusted: jest.fn(),
  remove: jest.fn(),
});

export const makeAuthSocialServiceMock = () => ({
  name: 'AuthSocialService',
  login: jest.fn(),
  link: jest.fn(),
  unlink: jest.fn(),
  listForUser: jest.fn(),
});

export const makeAuthSsoServiceMock = () => ({
  name: 'AuthSsoService',
  login: jest.fn(),
  validateAssertion: jest.fn(),
  logout: jest.fn(),
});

export const makeAuthBiometricServiceMock = () => ({
  name: 'AuthBiometricService',
  enable: jest.fn(),
  disable: jest.fn(),
  verify: jest.fn(),
  listForAuth: jest.fn(),
});

export const makeAuthPermissionServiceMock = () => ({
  name: 'AuthPermissionService',
  listAll: jest.fn(),
  findByCategory: jest.fn(),
  listForUser: jest.fn(),
  hasPermission: jest.fn(),
});

export const makeAuthRoleServiceMock = () => ({
  name: 'AuthRoleService',
  listAll: jest.fn(),
  findByName: jest.fn(),
  listForUser: jest.fn(),
  assign: jest.fn(),
  revoke: jest.fn(),
  hasRole: jest.fn(),
});

export const makeAuthSettingsServiceMock = () => ({
  name: 'AuthSettingsService',
  get: jest.fn(),
  update: jest.fn(),
});

export const makeUserServiceMock = () => ({
  name: 'UserService',
  findById: jest.fn(),
  findByEmail: jest.fn(),
  toPublic: jest.fn(),
});

export const makeUserProfileServiceMock = () => ({
  name: 'UserProfileService',
  findForUser: jest.fn(),
  upsert: jest.fn(),
});

export const makeUserSettingsServiceMock = () => ({
  name: 'UserSettingsService',
  findForUser: jest.fn(),
  update: jest.fn(),
});

export const makeUserPreferencesServiceMock = () => ({
  name: 'UserPreferencesService',
  findForUser: jest.fn(),
  update: jest.fn(),
  unsubscribeAll: jest.fn(),
});

export const makeUserAddressServiceMock = () => ({
  name: 'UserAddressService',
  listForUser: jest.fn(),
  findById: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  setDefault: jest.fn(),
});

export const makeUserContactServiceMock = () => ({
  name: 'UserContactService',
  listForUser: jest.fn(),
  add: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  setPrimary: jest.fn(),
});

export const makeUserVerificationServiceMock = () => ({
  name: 'UserVerificationService',
  findForUser: jest.fn(),
  verifyEmail: jest.fn(),
  verifyPhone: jest.fn(),
  verifyIdentity: jest.fn(),
  verifyAddress: jest.fn(),
});

export const makeUserKycServiceMock = () => ({
  name: 'UserKycService',
  findForUser: jest.fn(),
  submit: jest.fn(),
  verify: jest.fn(),
  reject: jest.fn(),
});

export const makeUserActivityServiceMock = () => ({
  name: 'UserActivityService',
  log: jest.fn(),
  listForUser: jest.fn(),
});

export const makeUserPermissionServiceMock = () => ({
  name: 'UserPermissionService',
  listForUser: jest.fn(),
  grant: jest.fn(),
  revoke: jest.fn(),
  has: jest.fn(),
});

export const makeUserRoleServiceMock = () => ({
  name: 'UserRoleService',
  listForUser: jest.fn(),
  assign: jest.fn(),
  revoke: jest.fn(),
  has: jest.fn(),
});
