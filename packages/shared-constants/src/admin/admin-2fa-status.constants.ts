/**
 * অ্যাডমিন 2FA-এর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// 2FA স্ট্যাটাস
export const TWO_FA_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  PENDING_SETUP: 'pending_setup',
  PENDING_VERIFICATION: 'pending_verification',
  TEMPORARILY_DISABLED: 'temporarily_disabled',
  REVOKED: 'revoked',
} as const;

// স্ট্যাটাসের কালার কোড
export const TWO_FA_STATUS_COLORS = {
  ENABLED: '#22C55E', // সবুজ
  DISABLED: '#94A3B8', // ধূসর
  PENDING_SETUP: '#F59E0B', // কমলা
  PENDING_VERIFICATION: '#3B82F6', // নীল
  TEMPORARILY_DISABLED: '#EF4444', // লাল
  REVOKED: '#DC2626', // গাঢ় লাল
} as const;

// স্ট্যাটাসের আইকন
export const TWO_FA_STATUS_ICONS = {
  ENABLED: '✅',
  DISABLED: '❌',
  PENDING_SETUP: '⚙️',
  PENDING_VERIFICATION: '🔄',
  TEMPORARILY_DISABLED: '⚠️',
  REVOKED: '🚫',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const TWO_FA_STATUS_DESCRIPTIONS = {
  ENABLED: 'Two-factor authentication is active',
  DISABLED: 'Two-factor authentication is inactive',
  PENDING_SETUP: 'Two-factor authentication setup in progress',
  PENDING_VERIFICATION: 'Two-factor authentication verification pending',
  TEMPORARILY_DISABLED: 'Two-factor authentication is temporarily disabled',
  REVOKED: 'Two-factor authentication has been revoked',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const TWO_FA_STATUS_TRANSITIONS = {
  ENABLED: ['disabled', 'temporarily_disabled', 'revoked'],
  DISABLED: ['pending_setup', 'enabled'],
  PENDING_SETUP: ['enabled', 'disabled', 'pending_verification'],
  PENDING_VERIFICATION: ['enabled', 'disabled', 'revoked'],
  TEMPORARILY_DISABLED: ['enabled', 'disabled', 'revoked'],
  REVOKED: ['disabled', 'pending_setup'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const TWO_FA_STATUS_PRIORITY = {
  ENABLED: 1,
  DISABLED: 5,
  PENDING_SETUP: 3,
  PENDING_VERIFICATION: 2,
  TEMPORARILY_DISABLED: 4,
  REVOKED: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const TWO_FA_STATUS_LABELS_BN = {
  ENABLED: 'সক্রিয়',
  DISABLED: 'নিষ্ক্রিয়',
  PENDING_SETUP: 'সেটআপ চলমান',
  PENDING_VERIFICATION: 'যাচাইকরণ চলমান',
  TEMPORARILY_DISABLED: 'অস্থায়ীভাবে নিষ্ক্রিয়',
  REVOKED: 'বাতিল',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const TWO_FA_STATUS_LABELS_EN = {
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
  PENDING_SETUP: 'Pending Setup',
  PENDING_VERIFICATION: 'Pending Verification',
  TEMPORARILY_DISABLED: 'Temporarily Disabled',
  REVOKED: 'Revoked',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const TWO_FA_STATUS_CSS_CLASSES = {
  ENABLED: 'status-enabled',
  DISABLED: 'status-disabled',
  PENDING_SETUP: 'status-pending-setup',
  PENDING_VERIFICATION: 'status-pending-verification',
  TEMPORARILY_DISABLED: 'status-temporarily-disabled',
  REVOKED: 'status-revoked',
} as const;

// স্ট্যাটাস গ্রুপ
export const TWO_FA_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['enabled', 'pending_setup', 'pending_verification'],
  INACTIVE_STATUSES: ['disabled', 'temporarily_disabled', 'revoked'],
  POSITIVE_STATUSES: ['enabled'],
  NEGATIVE_STATUSES: ['disabled', 'revoked'],
  ACTIONABLE_STATUSES: ['pending_setup', 'pending_verification'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const TWO_FA_STATUS_EMOJIS = {
  ENABLED: '✔️',
  DISABLED: '✖️',
  PENDING_SETUP: '🔧',
  PENDING_VERIFICATION: '🔄',
  TEMPORARILY_DISABLED: '⏸️',
  REVOKED: '🔐',
} as const;

// স্ট্যাটাস অ্যাকশন
export const TWO_FA_STATUS_ACTIONS = {
  ENABLED: ['disable', 'temporarily_disable', 'revoke'],
  DISABLED: ['setup', 'enable'],
  PENDING_SETUP: ['complete', 'cancel', 'verification'],
  PENDING_VERIFICATION: ['verify', 'cancel', 'revoke'],
  TEMPORARILY_DISABLED: ['enable', 'disable', 'revoke'],
  REVOKED: ['setup', 'disable'],
} as const;

// স্ট্যাটাস টাইমআউট (মিনিটে)
export const TWO_FA_STATUS_TIMEOUT = {
  ENABLED: 0,
  DISABLED: 0,
  PENDING_SETUP: 15, // ১৫ মিনিট
  PENDING_VERIFICATION: 5, // ৫ মিনিট
  TEMPORARILY_DISABLED: 1440, // ২৪ ঘন্টা
  REVOKED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const TWO_FA_STATUS_VALIDATION = {
  ENABLED: {
    canLogin: true,
    canSetup: false,
    canVerify: false,
    canDisable: true,
    canRevoke: true,
  },
  DISABLED: {
    canLogin: true,
    canSetup: true,
    canVerify: false,
    canDisable: false,
    canRevoke: false,
  },
  PENDING_SETUP: {
    canLogin: false,
    canSetup: true,
    canVerify: false,
    canDisable: false,
    canRevoke: false,
  },
  PENDING_VERIFICATION: {
    canLogin: false,
    canSetup: false,
    canVerify: true,
    canDisable: false,
    canRevoke: true,
  },
  TEMPORARILY_DISABLED: {
    canLogin: true,
    canSetup: false,
    canVerify: false,
    canDisable: false,
    canRevoke: true,
  },
  REVOKED: {
    canLogin: false,
    canSetup: true,
    canVerify: false,
    canDisable: false,
    canRevoke: false,
  },
} as const;

// ডিফল্ট 2FA স্ট্যাটাস
export const DEFAULT_TWO_FA_STATUS = 'disabled';

// 2FA স্ট্যাটাস চেক ইন্টারভাল (মিনিটে)
export const TWO_FA_STATUS_CHECK_INTERVAL = 5;

// 2FA স্ট্যাটাস ক্লিনআপ ইন্টারভাল (ঘন্টায়)
export const TWO_FA_STATUS_CLEANUP_INTERVAL = 24;

// 2FA স্ট্যাটাস ট্রানজিশন টাইম (মিলিসেকেন্ডে)
export const TWO_FA_STATUS_TRANSITION_TIME = 500;

// 2FA ডিজেবল রিজন
export const TWO_FA_DISABLE_REASONS = {
  USER_REQUEST: 'user_request',
  ADMIN_ACTION: 'admin_action',
  SECURITY_BREACH: 'security_breach',
  TECHNICAL_ISSUE: 'technical_issue',
  TEMPORARY_ACCESS: 'temporary_access',
} as const;

// 2FA রিভোক রিজন
export const TWO_FA_REVOKE_REASONS = {
  USER_REQUEST: 'user_request',
  ADMIN_ACTION: 'admin_action',
  DEVICE_LOST: 'device_lost',
  SECURITY_BREACH: 'security_breach',
  COMPROMISED: 'compromised',
} as const;
