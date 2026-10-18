/**
 * Test IDs + constants
 * @module identity-service/test/fixtures
 */
export const TEST_IDS = {
  // Auth
  AUTH_ID: '11111111-1111-4111-8111-111111111111',
  AUTH_ID_2: '11111111-1111-4111-8111-222222222222',
  // Session
  SESSION_ID: '22222222-2222-4222-8222-222222222222',
  SESSION_ID_2: '22222222-2222-4222-8222-333333333333',
  // Token
  TOKEN_ID: '33333333-3333-4333-8333-333333333333',
  TOKEN_ID_2: '33333333-3333-4333-8333-444444444444',
  // Device
  DEVICE_ID: '44444444-4444-4444-8444-444444444444',
  DEVICE_ID_2: '44444444-4444-4444-8444-555555555555',
  // MFA
  MFA_ID: '55555555-5555-4555-8555-555555555555',
  // Verification
  VERIFICATION_ID: '66666666-6666-4666-8666-666666666666',
  VERIFICATION_ID_2: '66666666-6666-4666-8666-777777777777',
  // User (external reference)
  USER_ID: '77777777-7777-4777-8777-777777777777',
  USER_ID_2: '77777777-7777-4777-8777-888888888888',
  // Role
  ROLE_ID: '88888888-8888-4888-8888-888888888888',
  ROLE_ID_2: '88888888-8888-4888-8888-999999999999',
  // Account lock
  LOCK_ID: '99999999-9999-4999-8999-999999999999',
  // Application
  ADDRESS_ID: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  CONTACT_ID: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  KYC_ID: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  ACTIVITY_ID: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  BIOMETRIC_ID: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
  BACKUP_CODE_ID: '99999999-aaaa-4aaa-8aaa-999999999999',
  RECOVERY_CODE_ID: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
  OAUTH_CLIENT_ID: '0a0a0a0a-0a0a-4a0a-8a0a-0a0a0a0a0a0a',
  SSO_CONFIG_ID: '0b0b0b0b-0b0b-4b0b-8b0b-0b0b0b0b0b0b',
} as const;

export const TEST_USER_ID = TEST_IDS.USER_ID;
export const TEST_AUTH_ID = TEST_IDS.AUTH_ID;

export const TEST_EMAIL = 'test.user@vubon.com.bd';
export const TEST_EMAIL_2 = 'other.user@vubon.com.bd';
export const TEST_PHONE = '+8801712345678';
export const TEST_PHONE_2 = '+8801812345678';
export const TEST_USERNAME = 'testuser';
export const TEST_IP = '192.168.1.100';
export const TEST_IP_2 = '10.0.0.5';
export const TEST_USER_AGENT = 'Mozilla/5.0 (Test) VubonTest/1.0';
export const TEST_FINGERPRINT = 'fp-test-fingerprint-abcdef123456';
export const TEST_PASSWORD_PLAIN = 'TestPass@1234';
export const TEST_PASSWORD_HASH = '$2b$12$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012';
export const TEST_MFA_SECRET = 'JBSWY3DPEHPK3PXP';
export const TEST_BACKUP_CODE = 'ABCD1234EF';
export const TEST_OTP_CODE = '123456';
export const TEST_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature';
export const TEST_REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.signature';
export const TEST_PROVIDER_GOOGLE = 'google';
export const TEST_PROVIDER_LOCAL = 'local';
export const TEST_PROVIDER_ID = 'google-user-123456789';
export const TEST_ROLE_ADMIN = 'admin';
export const TEST_ROLE_CUSTOMER = 'customer';
export const TEST_PERMISSION_LOGIN = 'auth:login';
export const TEST_PERMISSION_ALL = '*';
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
