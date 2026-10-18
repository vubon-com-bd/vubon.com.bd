/**
 * Prisma Row Fixtures — raw DB rows for repository mapping tests
 * @module identity-service/test/fixtures/infrastructure
 */
import { TEST_IDS, TEST_EMAIL, TEST_IP, TEST_USER_AGENT, TEST_FINGERPRINT, TEST_DATES } from '../index.js';

const NOW = new Date(TEST_DATES.NOW);
const PAST = new Date(TEST_DATES.NOW);
const FUTURE = new Date(Date.now() + 3600000);

const PASSWORD_HASH = '$2b$12$' + 'a'.repeat(53);
const MFA_SECRET = 'JBSWY3DPEHPK3PXP';
const OTP = '123456';
const BACKUP_CODE = 'ABCD1234EF';
const ACCESS_TOKEN = 'access-token-' + 'x'.repeat(50);
const REFRESH_TOKEN = 'refresh-token-' + 'y'.repeat(50);

// ─── User ───────────────────────────────────
export const prismaUserRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  email: TEST_EMAIL,
  password: PASSWORD_HASH,
  name: 'Test User',
  phone: '+8801712345678',
  status: 'active',
  type: 'customer',
  role: 'customer',
  emailVerified: true,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthSession ────────────────────────────
export const prismaSessionRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.SESSION_ID,
  userId: TEST_IDS.USER_ID,
  token: ACCESS_TOKEN,
  expiry: FUTURE,
  ip: TEST_IP,
  userAgent: TEST_USER_AGENT,
  deviceId: TEST_IDS.DEVICE_ID,
  revokedAt: null,
  revokeReason: null,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthToken ──────────────────────────────
export const prismaTokenRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.TOKEN_ID,
  userId: TEST_IDS.USER_ID,
  tokenValue: ACCESS_TOKEN,
  tokenType: 'access',
  expiry: FUTURE,
  issuedAt: PAST,
  revokedAt: null,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthMfa ────────────────────────────────
export const prismaMfaRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.MFA_ID,
  userId: TEST_IDS.USER_ID,
  secret: MFA_SECRET,
  type: 'totp',
  status: 'enabled',
  enabledAt: PAST,
  lastVerifiedAt: NOW,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthDevice ─────────────────────────────
export const prismaDeviceRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.DEVICE_ID,
  userId: TEST_IDS.USER_ID,
  fingerprint: TEST_FINGERPRINT,
  type: 'desktop',
  status: 'trusted',
  name: 'Test Device',
  lastSeenAt: NOW,
  trustedAt: PAST,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthAccountLock ────────────────────────
export const prismaAccountLockRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.LOCK_ID ?? TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  reason: 'too_many_attempts',
  lockedAt: PAST,
  expiresAt: FUTURE,
  unlockedAt: null,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthLoginAttempt ───────────────────────
export const prismaLoginAttemptRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.TOKEN_ID,
  userId: TEST_IDS.USER_ID,
  email: TEST_EMAIL,
  ip: TEST_IP,
  userAgent: TEST_USER_AGENT,
  status: 'success',
  attemptedAt: NOW,
  createdAt: NOW,
  updatedAt: NOW,
  ...overrides,
});

// ─── AuthRecoveryCode ───────────────────────
export const prismaRecoveryCodeRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.TOKEN_ID,
  userId: TEST_IDS.USER_ID,
  code: BACKUP_CODE,
  status: 'active',
  usedAt: null,
  usedFromIp: null,
  generatedAt: PAST,
  expiresAt: null,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── UserProfile ────────────────────────────
export const prismaUserProfileRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  firstName: 'Test',
  lastName: 'User',
  bio: null,
  avatarUrl: null,
  coverUrl: null,
  dateOfBirth: null,
  gender: null,
  website: null,
  company: null,
  designation: null,
  visibility: 'public',
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── UserSettings ───────────────────────────
export const prismaUserSettingsRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  language: 'en',
  timezone: 'Asia/Dhaka',
  currency: 'BDT',
  theme: 'system',
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── UserPreferences ────────────────────────
export const prismaUserPreferencesRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.USER_ID,
  userId: TEST_IDS.USER_ID,
  marketingEmails: false,
  productUpdates: true,
  orderUpdates: true,
  securityAlerts: true,
  newsletter: false,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthRole ───────────────────────────────
export const prismaRoleRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.ROLE_ID ?? TEST_IDS.USER_ID,
  name: 'customer',
  description: 'Customer role',
  isSystem: false,
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});

// ─── AuthPermission ─────────────────────────
export const prismaPermissionRow = (overrides: Record<string, unknown> = {}) => ({
  id: TEST_IDS.ROLE_ID ?? TEST_IDS.USER_ID,
  name: 'auth:login',
  action: 'login',
  resource: 'auth',
  description: 'Login permission',
  createdAt: PAST,
  updatedAt: NOW,
  deletedAt: null,
  ...overrides,
});
