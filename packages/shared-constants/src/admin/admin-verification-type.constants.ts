/**
 * অ্যাডমিন ভেরিফিকেশনের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ভেরিফিকেশন টাইপ
export const VERIFICATION_TYPES = {
  EMAIL: 'email',
  PHONE: 'phone',
  DOCUMENT: 'document',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  AGE: 'age',
  BACKGROUND_CHECK: 'background_check',
} as const;

// টাইপের আইকন
export const VERIFICATION_TYPE_ICONS = {
  EMAIL: '📧',
  PHONE: '📱',
  DOCUMENT: '📄',
  IDENTITY: '🪪',
  ADDRESS: '🏠',
  AGE: '🎂',
  BACKGROUND_CHECK: '🔍',
} as const;

// টাইপের কালার কোড
export const VERIFICATION_TYPE_COLORS = {
  EMAIL: '#3B82F6',
  PHONE: '#22C55E',
  DOCUMENT: '#F59E0B',
  IDENTITY: '#8B5CF6',
  ADDRESS: '#EC4899',
  AGE: '#14B8A6',
  BACKGROUND_CHECK: '#DC2626',
} as const;

// টাইপের ডেসক্রিপশন
export const VERIFICATION_TYPE_DESCRIPTIONS = {
  EMAIL: 'Email address verification',
  PHONE: 'Phone number verification',
  DOCUMENT: 'Document verification (ID, passport, etc.)',
  IDENTITY: 'Identity verification (photo, biometrics)',
  ADDRESS: 'Address verification (utility bill, etc.)',
  AGE: 'Age verification (minimum age requirement)',
  BACKGROUND_CHECK: 'Background check (criminal, employment)',
} as const;

// টাইপের প্রয়োজনীয়তা লেভেল (১ = সর্বোচ্চ)
export const VERIFICATION_TYPE_REQUIREMENT_LEVEL = {
  EMAIL: 1,
  PHONE: 2,
  DOCUMENT: 3,
  IDENTITY: 1,
  ADDRESS: 4,
  AGE: 3,
  BACKGROUND_CHECK: 1,
} as const;

// টাইপের প্রক্রিয়াকরণ সময় (ঘন্টায়)
export const VERIFICATION_TYPE_PROCESSING_TIME = {
  EMAIL: 0.1, // ৬ মিনিট
  PHONE: 0.1, // ৬ মিনিট
  DOCUMENT: 24, // ১ দিন
  IDENTITY: 48, // ২ দিন
  ADDRESS: 24, // ১ দিন
  AGE: 0.5, // ৩০ মিনিট
  BACKGROUND_CHECK: 72, // ৩ দিন
} as const;

// টাইপের ডকুমেন্ট প্রয়োজন কিনা
export const VERIFICATION_TYPE_REQUIRES_DOCUMENT = {
  EMAIL: false,
  PHONE: false,
  DOCUMENT: true,
  IDENTITY: true,
  ADDRESS: true,
  AGE: true,
  BACKGROUND_CHECK: true,
} as const;

// টাইপ গ্রুপ
export const VERIFICATION_TYPE_GROUPS = {
  BASIC: ['email', 'phone'],
  IDENTITY: ['identity', 'document', 'address'],
  ADVANCED: ['age', 'background_check'],
} as const;

// টাইপের লেবেল (বাংলা)
export const VERIFICATION_TYPE_LABELS_BN = {
  EMAIL: 'ইমেইল',
  PHONE: 'ফোন',
  DOCUMENT: 'ডকুমেন্ট',
  IDENTITY: 'পরিচয়',
  ADDRESS: 'ঠিকানা',
  AGE: 'বয়স',
  BACKGROUND_CHECK: 'পটভূমি যাচাই',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const VERIFICATION_TYPE_LABELS_EN = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  DOCUMENT: 'Document',
  IDENTITY: 'Identity',
  ADDRESS: 'Address',
  AGE: 'Age',
  BACKGROUND_CHECK: 'Background Check',
} as const;

// টাইপের CSS ক্লাস
export const VERIFICATION_TYPE_CSS_CLASSES = {
  EMAIL: 'verification-email',
  PHONE: 'verification-phone',
  DOCUMENT: 'verification-document',
  IDENTITY: 'verification-identity',
  ADDRESS: 'verification-address',
  AGE: 'verification-age',
  BACKGROUND_CHECK: 'verification-background',
} as const;

// টাইপের জন্য ইমোজি
export const VERIFICATION_TYPE_EMOJIS = {
  EMAIL: '✉️',
  PHONE: '📞',
  DOCUMENT: '📋',
  IDENTITY: '🆔',
  ADDRESS: '📍',
  AGE: '📅',
  BACKGROUND_CHECK: '🕵️',
} as const;

// টাইপের ডিফল্ট এক্সপাইরি টাইম (দিনে)
export const VERIFICATION_TYPE_EXPIRY_TIME = {
  EMAIL: 7,
  PHONE: 7,
  DOCUMENT: 30,
  IDENTITY: 30,
  ADDRESS: 30,
  AGE: 365,
  BACKGROUND_CHECK: 180,
} as const;

// টাইপের প্রয়োজনীয় ডকুমেন্ট টাইপ
export const VERIFICATION_TYPE_REQUIRED_DOCUMENTS = {
  EMAIL: [],
  PHONE: [],
  DOCUMENT: ['id_card', 'passport', 'driving_license'],
  IDENTITY: ['photo', 'biometric_data'],
  ADDRESS: ['utility_bill', 'bank_statement'],
  AGE: ['birth_certificate', 'national_id'],
  BACKGROUND_CHECK: ['consent_form', 'reference_letters'],
} as const;

// টাইপের অটো-অ্যাপ্রুভ সেটিংস
export const VERIFICATION_TYPE_AUTO_APPROVE = {
  EMAIL: true,
  PHONE: true,
  DOCUMENT: false,
  IDENTITY: false,
  ADDRESS: false,
  AGE: true,
  BACKGROUND_CHECK: false,
} as const;
