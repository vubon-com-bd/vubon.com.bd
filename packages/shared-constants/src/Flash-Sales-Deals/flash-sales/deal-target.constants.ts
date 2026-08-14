/**
 * Deal Target Constants
 * ডিলের টার্গেট অডিয়েন্স বা লক্ষ্য নির্ধারণ
 */

// ডিল টার্গেট এনাম
export const DEAL_TARGET = {
  ALL_USERS: 'all_users',
  NEW_USERS: 'new_users',
  EXISTING_USERS: 'existing_users',
  PREMIUM_USERS: 'premium_users',
  VIP_USERS: 'vip_users',
  MEMBERS_ONLY: 'members_only',
  GUESTS: 'guests',
  SPECIFIC_LOCATION: 'specific_location',
  SPECIFIC_AGE_GROUP: 'specific_age_group',
  SPECIFIC_GENDER: 'specific_gender',
  SPECIFIC_INTEREST: 'specific_interest',
  SPECIFIC_BEHAVIOR: 'specific_behavior',
  CUSTOM_SEGMENT: 'custom_segment',
  AFFILIATE_USERS: 'affiliate_users',
  B2B_USERS: 'b2b_users',
  B2C_USERS: 'b2c_users',
} as const;

// ডিল টার্গেট টাইপ
export type DealTarget = (typeof DEAL_TARGET)[keyof typeof DEAL_TARGET];

// টার্গেটের লেবেল
export const DEAL_TARGET_LABELS: Record<DealTarget, string> = {
  all_users: 'সকল ব্যবহারকারী',
  new_users: 'নতুন ব্যবহারকারী',
  existing_users: 'বিদ্যমান ব্যবহারকারী',
  premium_users: 'প্রিমিয়াম ব্যবহারকারী',
  vip_users: 'ভিআইপি ব্যবহারকারী',
  members_only: 'শুধুমাত্র সদস্য',
  guests: 'অতিথি ব্যবহারকারী',
  specific_location: 'নির্দিষ্ট অবস্থান',
  specific_age_group: 'নির্দিষ্ট বয়স গ্রুপ',
  specific_gender: 'নির্দিষ্ট লিঙ্গ',
  specific_interest: 'নির্দিষ্ট আগ্রহ',
  specific_behavior: 'নির্দিষ্ট আচরণ',
  custom_segment: 'কাস্টম সেগমেন্ট',
  affiliate_users: 'অ্যাফিলিয়েট ব্যবহারকারী',
  b2b_users: 'বি২বি ব্যবহারকারী',
  b2c_users: 'বি২সি ব্যবহারকারী',
};

// টার্গেটের বিবরণ
export const DEAL_TARGET_DESCRIPTIONS: Record<DealTarget, string> = {
  all_users: 'সকল ব্যবহারকারীর জন্য ডিল প্রযোজ্য',
  new_users: 'শুধুমাত্র নতুন ব্যবহারকারীদের জন্য ডিল',
  existing_users: 'শুধুমাত্র বিদ্যমান ব্যবহারকারীদের জন্য ডিল',
  premium_users: 'প্রিমিয়াম ব্যবহারকারীদের জন্য বিশেষ ডিল',
  vip_users: 'ভিআইপি ব্যবহারকারীদের জন্য বিশেষ ডিল',
  members_only: 'শুধুমাত্র সদস্যদের জন্য ডিল',
  guests: 'অতিথি বা নিবন্ধিত নয় এমন ব্যবহারকারীদের জন্য ডিল',
  specific_location: 'নির্দিষ্ট ভৌগোলিক অবস্থানের জন্য ডিল',
  specific_age_group: 'নির্দিষ্ট বয়স গ্রুপের জন্য ডিল',
  specific_gender: 'নির্দিষ্ট লিঙ্গের জন্য ডিল',
  specific_interest: 'নির্দিষ্ট আগ্রহের ব্যবহারকারীদের জন্য ডিল',
  specific_behavior: 'নির্দিষ্ট আচরণের ব্যবহারকারীদের জন্য ডিল',
  custom_segment: 'কাস্টমাইজড ব্যবহারকারী সেগমেন্টের জন্য ডিল',
  affiliate_users: 'অ্যাফিলিয়েট ব্যবহারকারীদের জন্য ডিল',
  b2b_users: 'ব্যবসায়িক ব্যবহারকারীদের জন্য ডিল',
  b2c_users: 'সাধারণ ব্যবহারকারীদের জন্য ডিল',
};

// টার্গেটের আইকন (আইকন নাম)
export const DEAL_TARGET_ICONS: Record<DealTarget, string> = {
  all_users: 'Users',
  new_users: 'UserPlus',
  existing_users: 'UserCheck',
  premium_users: 'Star',
  vip_users: 'Crown',
  members_only: 'Shield',
  guests: 'User',
  specific_location: 'MapPin',
  specific_age_group: 'Calendar',
  specific_gender: 'Users',
  specific_interest: 'Heart',
  specific_behavior: 'Activity',
  custom_segment: 'Sliders',
  affiliate_users: 'Link',
  b2b_users: 'Briefcase',
  b2c_users: 'ShoppingBag',
};

// টার্গেটের কালার কোড
export const DEAL_TARGET_COLORS: Record<DealTarget, string> = {
  all_users: '#3B82F6', // Blue
  new_users: '#22C55E', // Green
  existing_users: '#8B5CF6', // Purple
  premium_users: '#FBBF24', // Yellow
  vip_users: '#EC4899', // Pink
  members_only: '#6366F1', // Indigo
  guests: '#9CA3AF', // Gray
  specific_location: '#F97316', // Orange
  specific_age_group: '#14B8A6', // Teal
  specific_gender: '#EC4899', // Pink
  specific_interest: '#EF4444', // Red
  specific_behavior: '#F59E0B', // Amber
  custom_segment: '#8B5CF6', // Purple
  affiliate_users: '#06B6D4', // Cyan
  b2b_users: '#1F2937', // Dark
  b2c_users: '#3B82F6', // Blue
};

// টার্গেটের ডিসপ্লে অর্ডার
export const DEAL_TARGET_DISPLAY_ORDER: Record<DealTarget, number> = {
  all_users: 1,
  new_users: 2,
  existing_users: 3,
  premium_users: 4,
  vip_users: 5,
  members_only: 6,
  guests: 7,
  specific_location: 8,
  specific_age_group: 9,
  specific_gender: 10,
  specific_interest: 11,
  specific_behavior: 12,
  custom_segment: 13,
  affiliate_users: 14,
  b2b_users: 15,
  b2c_users: 16,
};

// টার্গেট গ্রুপ
export const DEAL_TARGET_GROUPS = {
  ALL_USERS: ['all_users'] as DealTarget[],
  USER_STATUS: ['new_users', 'existing_users', 'guests'] as DealTarget[],
  USER_LEVEL: ['premium_users', 'vip_users', 'members_only'] as DealTarget[],
  DEMOGRAPHIC: ['specific_location', 'specific_age_group', 'specific_gender'] as DealTarget[],
  BEHAVIORAL: ['specific_interest', 'specific_behavior'] as DealTarget[],
  BUSINESS: ['affiliate_users', 'b2b_users', 'b2c_users'] as DealTarget[],
  CUSTOM: ['custom_segment'] as DealTarget[],
} as const;

// টার্গেট কনফিগারেশন ইন্টারফেস
export interface DealTargetConfig {
  target: DealTarget;
  label: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
}

// সম্পূর্ণ টার্গেট কনফিগারেশন
export const DEAL_TARGET_CONFIGS: Record<DealTarget, DealTargetConfig> = {
  all_users: {
    target: 'all_users',
    label: DEAL_TARGET_LABELS.all_users,
    description: DEAL_TARGET_DESCRIPTIONS.all_users,
    icon: DEAL_TARGET_ICONS.all_users,
    color: DEAL_TARGET_COLORS.all_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.all_users,
    isActive: true,
  },
  new_users: {
    target: 'new_users',
    label: DEAL_TARGET_LABELS.new_users,
    description: DEAL_TARGET_DESCRIPTIONS.new_users,
    icon: DEAL_TARGET_ICONS.new_users,
    color: DEAL_TARGET_COLORS.new_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.new_users,
    isActive: true,
  },
  existing_users: {
    target: 'existing_users',
    label: DEAL_TARGET_LABELS.existing_users,
    description: DEAL_TARGET_DESCRIPTIONS.existing_users,
    icon: DEAL_TARGET_ICONS.existing_users,
    color: DEAL_TARGET_COLORS.existing_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.existing_users,
    isActive: true,
  },
  premium_users: {
    target: 'premium_users',
    label: DEAL_TARGET_LABELS.premium_users,
    description: DEAL_TARGET_DESCRIPTIONS.premium_users,
    icon: DEAL_TARGET_ICONS.premium_users,
    color: DEAL_TARGET_COLORS.premium_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.premium_users,
    isActive: true,
  },
  vip_users: {
    target: 'vip_users',
    label: DEAL_TARGET_LABELS.vip_users,
    description: DEAL_TARGET_DESCRIPTIONS.vip_users,
    icon: DEAL_TARGET_ICONS.vip_users,
    color: DEAL_TARGET_COLORS.vip_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.vip_users,
    isActive: true,
  },
  members_only: {
    target: 'members_only',
    label: DEAL_TARGET_LABELS.members_only,
    description: DEAL_TARGET_DESCRIPTIONS.members_only,
    icon: DEAL_TARGET_ICONS.members_only,
    color: DEAL_TARGET_COLORS.members_only,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.members_only,
    isActive: true,
  },
  guests: {
    target: 'guests',
    label: DEAL_TARGET_LABELS.guests,
    description: DEAL_TARGET_DESCRIPTIONS.guests,
    icon: DEAL_TARGET_ICONS.guests,
    color: DEAL_TARGET_COLORS.guests,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.guests,
    isActive: true,
  },
  specific_location: {
    target: 'specific_location',
    label: DEAL_TARGET_LABELS.specific_location,
    description: DEAL_TARGET_DESCRIPTIONS.specific_location,
    icon: DEAL_TARGET_ICONS.specific_location,
    color: DEAL_TARGET_COLORS.specific_location,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.specific_location,
    isActive: true,
  },
  specific_age_group: {
    target: 'specific_age_group',
    label: DEAL_TARGET_LABELS.specific_age_group,
    description: DEAL_TARGET_DESCRIPTIONS.specific_age_group,
    icon: DEAL_TARGET_ICONS.specific_age_group,
    color: DEAL_TARGET_COLORS.specific_age_group,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.specific_age_group,
    isActive: true,
  },
  specific_gender: {
    target: 'specific_gender',
    label: DEAL_TARGET_LABELS.specific_gender,
    description: DEAL_TARGET_DESCRIPTIONS.specific_gender,
    icon: DEAL_TARGET_ICONS.specific_gender,
    color: DEAL_TARGET_COLORS.specific_gender,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.specific_gender,
    isActive: true,
  },
  specific_interest: {
    target: 'specific_interest',
    label: DEAL_TARGET_LABELS.specific_interest,
    description: DEAL_TARGET_DESCRIPTIONS.specific_interest,
    icon: DEAL_TARGET_ICONS.specific_interest,
    color: DEAL_TARGET_COLORS.specific_interest,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.specific_interest,
    isActive: true,
  },
  specific_behavior: {
    target: 'specific_behavior',
    label: DEAL_TARGET_LABELS.specific_behavior,
    description: DEAL_TARGET_DESCRIPTIONS.specific_behavior,
    icon: DEAL_TARGET_ICONS.specific_behavior,
    color: DEAL_TARGET_COLORS.specific_behavior,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.specific_behavior,
    isActive: true,
  },
  custom_segment: {
    target: 'custom_segment',
    label: DEAL_TARGET_LABELS.custom_segment,
    description: DEAL_TARGET_DESCRIPTIONS.custom_segment,
    icon: DEAL_TARGET_ICONS.custom_segment,
    color: DEAL_TARGET_COLORS.custom_segment,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.custom_segment,
    isActive: true,
  },
  affiliate_users: {
    target: 'affiliate_users',
    label: DEAL_TARGET_LABELS.affiliate_users,
    description: DEAL_TARGET_DESCRIPTIONS.affiliate_users,
    icon: DEAL_TARGET_ICONS.affiliate_users,
    color: DEAL_TARGET_COLORS.affiliate_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.affiliate_users,
    isActive: true,
  },
  b2b_users: {
    target: 'b2b_users',
    label: DEAL_TARGET_LABELS.b2b_users,
    description: DEAL_TARGET_DESCRIPTIONS.b2b_users,
    icon: DEAL_TARGET_ICONS.b2b_users,
    color: DEAL_TARGET_COLORS.b2b_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.b2b_users,
    isActive: true,
  },
  b2c_users: {
    target: 'b2c_users',
    label: DEAL_TARGET_LABELS.b2c_users,
    description: DEAL_TARGET_DESCRIPTIONS.b2c_users,
    icon: DEAL_TARGET_ICONS.b2c_users,
    color: DEAL_TARGET_COLORS.b2c_users,
    displayOrder: DEAL_TARGET_DISPLAY_ORDER.b2c_users,
    isActive: true,
  },
};

// হেল্পার ফাংশন: টার্গেট ভ্যালিড কিনা চেক করুন
export const isValidDealTarget = (target: string): target is DealTarget => {
  return Object.values(DEAL_TARGET).includes(target as DealTarget);
};

// হেল্পার ফাংশন: সক্রিয় টার্গেট গুলো পান
export const getActiveDealTargets = (): DealTarget[] => {
  return Object.values(DEAL_TARGET_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.target);
};

// হেল্পার ফাংশন: ডিসপ্লে অর্ডার অনুযায়ী সাজান
export const getDealTargetsByOrder = (): DealTarget[] => {
  return Object.values(DEAL_TARGET_CONFIGS)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((config) => config.target);
};

// হেল্পার ফাংশন: টার্গেট গ্রুপ অনুযায়ী ফিল্টার
export const getDealTargetsByGroup = (group: keyof typeof DEAL_TARGET_GROUPS): DealTarget[] => {
  return DEAL_TARGET_GROUPS[group] || [];
};

// হেল্পার ফাংশন: টার্গেটের লেবেল পান
export const getDealTargetLabel = (target: DealTarget): string => {
  return DEAL_TARGET_LABELS[target] || target;
};

// হেল্পার ফাংশন: টার্গেটের কালার পান
export const getDealTargetColor = (target: DealTarget): string => {
  return DEAL_TARGET_COLORS[target] || '#6B7280';
};

// হেল্পার ফাংশন: টার্গেটের আইকন পান
export const getDealTargetIcon = (target: DealTarget): string => {
  return DEAL_TARGET_ICONS[target] || 'Circle';
};
