/**
 * ভেন্ডার টিম বা দল সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * টিম টাইপ অবজেক্ট
 */
export const TeamType = {
  SALES: 'SALES',
  SUPPORT: 'SUPPORT',
  OPERATIONS: 'OPERATIONS',
  MARKETING: 'MARKETING',
  MANAGEMENT: 'MANAGEMENT',
  CUSTOM: 'CUSTOM',
} as const;

/**
 * টিম টাইপ - ইউনিয়ন টাইপ
 */
export type TeamTypeValue = (typeof TeamType)[keyof typeof TeamType];

/**
 * টিম স্ট্যাটাস
 */
export const TeamStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED',
} as const;

/**
 * টিম স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type TeamStatusValue = (typeof TeamStatus)[keyof typeof TeamStatus];

/**
 * সর্বোচ্চ টিম সদস্য সংখ্যা
 */
export const MaxTeamMembers = 50;

/**
 * ডিফল্ট টিম রোল
 */
export const DefaultTeamRole = 'MEMBER';

/**
 * টিম ভিজিবিলিটি
 */
export const TeamVisibility = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  VENDOR_ONLY: 'VENDOR_ONLY',
} as const;

/**
 * টিম ভিজিবিলিটি - ইউনিয়ন টাইপ
 */
export type TeamVisibilityValue = (typeof TeamVisibility)[keyof typeof TeamVisibility];

/**
 * প্রতি ভেন্ডারের টিম তৈরি লিমিট
 */
export const TeamCreationLimit = 10;

/**
 * টিম টাইপ লেবেলসমূহ
 */
export const TeamTypeLabels: Record<TeamTypeValue, { en: string; bn: string }> = {
  [TeamType.SALES]: {
    en: 'Sales Team',
    bn: 'বিক্রয় টিম',
  },
  [TeamType.SUPPORT]: {
    en: 'Support Team',
    bn: 'সাপোর্ট টিম',
  },
  [TeamType.OPERATIONS]: {
    en: 'Operations Team',
    bn: 'অপারেশন টিম',
  },
  [TeamType.MARKETING]: {
    en: 'Marketing Team',
    bn: 'মার্কেটিং টিম',
  },
  [TeamType.MANAGEMENT]: {
    en: 'Management Team',
    bn: 'ম্যানেজমেন্ট টিম',
  },
  [TeamType.CUSTOM]: {
    en: 'Custom Team',
    bn: 'কাস্টম টিম',
  },
};

/**
 * টিম স্ট্যাটাস লেবেলসমূহ
 */
export const TeamStatusLabels: Record<TeamStatusValue, { en: string; bn: string }> = {
  [TeamStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [TeamStatus.INACTIVE]: {
    en: 'Inactive',
    bn: 'নিষ্ক্রিয়',
  },
  [TeamStatus.ARCHIVED]: {
    en: 'Archived',
    bn: 'আর্কাইভ',
  },
};

/**
 * টিম স্ট্যাটাস রঙ কোডসমূহ
 */
export const TeamStatusColors: Record<TeamStatusValue, string> = {
  [TeamStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [TeamStatus.INACTIVE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [TeamStatus.ARCHIVED]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

/**
 * টিম ভিজিবিলিটি লেবেলসমূহ
 */
export const TeamVisibilityLabels: Record<TeamVisibilityValue, { en: string; bn: string }> = {
  [TeamVisibility.PUBLIC]: {
    en: 'Public',
    bn: 'সর্বজনীন',
  },
  [TeamVisibility.PRIVATE]: {
    en: 'Private',
    bn: 'ব্যক্তিগত',
  },
  [TeamVisibility.VENDOR_ONLY]: {
    en: 'Vendor Only',
    bn: 'শুধু ভেন্ডার',
  },
};

/**
 * টিম সদস্য জয়েন করার সময় (দিন)
 */
export const TeamMemberJoinWindowDays = 7;

/**
 * টিম ম্যাক্স ডিপার্টমেন্ট
 */
export const TeamMaxDepartments = 5;

/**
 * টিম অডিট লগ রিটেনশন (দিন)
 */
export const TeamAuditLogRetentionDays = 365;

/**
 * টিম অ্যাক্টিভিটি টাইমআউট (দিন)
 */
export const TeamActivityTimeoutDays = 30;
