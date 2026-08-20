/**
 * অ্যাডমিন টু-ফ্যাক্টর অথেন্টিকেশন (2FA) সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// 2FA আইডি প্রিফিক্স
export const TWO_FA_ID_PREFIX = '2FA';

// 2FA কোড লেন্থ
export const TWO_FA_CODE_LENGTH = 6;

// 2FA কোড এক্সপাইরি টাইম (সেকেন্ডে)
export const TWO_FA_CODE_EXPIRY_TIME = 120; // ২ মিনিট

// 2FA ম্যাক্স অ্যাটেম্পট
export const TWO_FA_MAX_ATTEMPTS = 3;

// 2FA ব্যাকআপ কোড কাউন্ট
export const TWO_FA_BACKUP_CODE_COUNT = 10;

// 2FA রিকভারি কোড লেন্থ
export const TWO_FA_RECOVERY_CODE_LENGTH = 16;

// 2FA ডিফল্ট মেথড
export const TWO_FA_DEFAULT_METHOD = 'authenticator_app';

// 2FA সেশন টাইমআউট (মিনিটে)
export const TWO_FA_SESSION_TIMEOUT = 5;

// 2FA ডিসেবল কুলডাউন পিরিয়ড (ঘন্টায়)
export const TWO_FA_DISABLE_COOLDOWN = 24;

// 2FA সেটআপ টাইমআউট (মিনিটে)
export const TWO_FA_SETUP_TIMEOUT = 15;

// 2FA ভেরিফিকেশন টাইমআউট (মিনিটে)
export const TWO_FA_VERIFICATION_TIMEOUT = 5;

// 2FA রিসেন্ড টাইমআউট (সেকেন্ডে)
export const TWO_FA_RESEND_TIMEOUT = 60;

// 2FA ব্যাকআপ কোড ফরম্যাট
export const TWO_FA_BACKUP_CODE_FORMAT = {
  separator: '-',
  groups: 4,
  charactersPerGroup: 4,
} as const;

// 2FA অ্যালগরিদম টাইপ
export const TWO_FA_ALGORITHM_TYPES = {
  TOTP: 'totp',
  HOTP: 'hotp',
} as const;

// 2FA হ্যাশ অ্যালগরিদম
export const TWO_FA_HASH_ALGORITHMS = {
  SHA1: 'sha1',
  SHA256: 'sha256',
  SHA512: 'sha512',
} as const;

// 2FA টোকেন লেন্থ (বাইটে)
export const TWO_FA_TOKEN_LENGTH = 20;

// 2FA ব্যাকআপ কোড এনক্রিপশন
export const TWO_FA_BACKUP_CODE_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// 2FA মনিটরিং সেটিংস
export const TWO_FA_MONITORING = {
  enabled: true,
  alertThreshold: 5, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// 2FA অডিট ট্রেইল
export const TWO_FA_AUDIT_TRAIL = {
  enabled: true,
  logSetup: true,
  logVerification: true,
  logDisable: true,
  logBackupCodes: true,
} as const;

// 2FA সিকিউরিটি সেটিংস
export const TWO_FA_SECURITY_SETTINGS = {
  requireForNewDevices: true,
  requireForNewLocations: true,
  allowRememberDevice: true,
  rememberDeviceDays: 30,
  maxFailedAttempts: 5,
  lockoutDuration: 30, // মিনিট
} as const;

// 2FA রিকভারি সেটিংস
export const TWO_FA_RECOVERY_SETTINGS = {
  requireEmailVerification: true,
  requirePhoneVerification: true,
  recoveryCodeLength: 16,
  maxRecoveryAttempts: 3,
  recoveryTimeout: 60, // মিনিট
} as const;
