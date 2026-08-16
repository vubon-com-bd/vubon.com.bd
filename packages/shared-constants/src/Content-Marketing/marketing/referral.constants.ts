/**
 * রেফারেল ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রেফারেল ম্যানেজমেন্ট মডিউলের নাম
 */
export const REFERRAL_MODULE_NAME = 'Referral Management';

/**
 * রেফারেলের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_REFERRAL_STATUS = 'active' as const;

/**
 * রেফারেল কোডের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_REFERRAL_CODE_LENGTH = 20;

/**
 * সর্বোচ্চ রেফারেল রিওয়ার্ড
 */
export const MAX_REFERRAL_REWARDS = 100;

/**
 * রেফারেল স্ট্যাটাস টাইপ
 */
export type ReferralStatus = typeof DEFAULT_REFERRAL_STATUS;

/**
 * রিওয়ার্ড টাইপ
 */
export type RewardType = 'points' | 'discount' | 'cash' | 'gift';

/**
 * রেফারেল ইন্টারফেস
 */
export interface ReferralInterface {
  id: string;
  referrerId: string;
  referredId: string;
  code: string;
  status: ReferralStatus;
  rewardType: RewardType;
  rewardValue: number;
  rewardStatus: RewardStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  metadata?: ReferralMetadata;
}

/**
 * রিওয়ার্ড স্ট্যাটাস টাইপ
 */
export type RewardStatus = 'pending' | 'claimed' | 'expired';

/**
 * রেফারেল মেটাডেটা ইন্টারফেস
 */
export interface ReferralMetadata {
  source?: string;
  campaign?: string;
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * রেফারেল তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateReferralInput {
  referrerId: string;
  referredId: string;
  code: string;
  rewardType: RewardType;
  rewardValue: number;
  source?: string;
  campaign?: string;
  metadata?: ReferralMetadata;
}

/**
 * রেফারেল আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateReferralInput {
  status?: ReferralStatus;
  rewardStatus?: RewardStatus;
  completedAt?: Date;
  metadata?: ReferralMetadata;
}

/**
 * রেফারেল ফিল্টার ইন্টারফেস
 */
export interface ReferralFilter {
  referrerId?: string;
  referredId?: string;
  status?: ReferralStatus;
  rewardType?: RewardType;
  rewardStatus?: RewardStatus;
  fromDate?: Date;
  toDate?: Date;
  code?: string;
  limit?: number;
  offset?: number;
}

/**
 * রেফারেল স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReferralStatus(status: string): status is ReferralStatus {
  return status === 'active';
}

/**
 * রিওয়ার্ড টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardType(type: string): type is RewardType {
  return ['points', 'discount', 'cash', 'gift'].includes(type);
}

/**
 * রিওয়ার্ড স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardStatus(status: string): status is RewardStatus {
  return ['pending', 'claimed', 'expired'].includes(status);
}

/**
 * রেফারেল কোড জেনারেট করার ফাংশন
 */
export function generateReferralCode(prefix?: string): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return prefix ? `${prefix}-${code}` : code;
}

/**
 * রেফারেল কোড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidReferralCode(code: string): boolean {
  return (
    typeof code === 'string' &&
    code.length > 0 &&
    code.length <= MAX_REFERRAL_CODE_LENGTH &&
    /^[A-Z0-9-]+$/.test(code)
  );
}

/**
 * রিওয়ার্ড পরিমাণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardValue(value: number): boolean {
  return typeof value === 'number' && value > 0 && value <= MAX_REFERRAL_REWARDS;
}

/**
 * রেফারেল সক্রিয় কিনা চেক করার ফাংশন
 */
export function isReferralActive(referral: ReferralInterface): boolean {
  return referral.status === 'active' && referral.rewardStatus === 'pending';
}

/**
 * রিওয়ার্ড ক্লেইম করা যায় কিনা চেক করার ফাংশন
 */
export function isRewardClaimable(referral: ReferralInterface): boolean {
  return referral.status === 'active' && referral.rewardStatus === 'pending';
}

/**
 * রিওয়ার্ড এক্সপায়ার্ড কিনা চেক করার ফাংশন
 */
export function isRewardExpired(referral: ReferralInterface): boolean {
  return referral.rewardStatus === 'expired';
}

/**
 * রিওয়ার্ড ক্লেইম করার ফাংশন
 */
export function claimReward(referral: ReferralInterface): ReferralInterface {
  if (!isRewardClaimable(referral)) {
    throw new Error('Reward is not claimable');
  }
  return {
    ...referral,
    rewardStatus: 'claimed',
    completedAt: new Date(),
  };
}

/**
 * রিওয়ার্ড টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getRewardTypeLabel(type: RewardType): string {
  const labels: Record<RewardType, string> = {
    points: 'Points',
    discount: 'Discount',
    cash: 'Cash',
    gift: 'Gift',
  };
  return labels[type];
}

/**
 * রিওয়ার্ড স্ট্যাটাসের লেবেল পাওয়ার ফাংশন
 */
export function getRewardStatusLabel(status: RewardStatus): string {
  const labels: Record<RewardStatus, string> = {
    pending: 'Pending',
    claimed: 'Claimed',
    expired: 'Expired',
  };
  return labels[status];
}

/**
 * ডিফল্ট রেফারেল স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultReferralStatus(): ReferralStatus {
  return DEFAULT_REFERRAL_STATUS;
}

/**
 * সব রিওয়ার্ড টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllRewardTypes(): RewardType[] {
  return ['points', 'discount', 'cash', 'gift'];
}

/**
 * সব রিওয়ার্ড স্ট্যাটাসের তালিকা পাওয়ার ফাংশন
 */
export function getAllRewardStatuses(): RewardStatus[] {
  return ['pending', 'claimed', 'expired'];
}
