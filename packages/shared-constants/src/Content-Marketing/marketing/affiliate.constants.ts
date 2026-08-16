/**
 * অ্যাফিলিয়েট ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * অ্যাফিলিয়েট ম্যানেজমেন্ট মডিউলের নাম
 */
export const AFFILIATE_MODULE_NAME = 'Affiliate Management';

/**
 * অ্যাফিলিয়েটের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_AFFILIATE_STATUS = 'pending' as const;

/**
 * অ্যাফিলিয়েট নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_AFFILIATE_NAME_LENGTH = 100;

/**
 * সর্বনিম্ন কমিশন রেট
 */
export const MIN_COMMISSION_RATE = 0;

/**
 * সর্বোচ্চ কমিশন রেট
 */
export const MAX_COMMISSION_RATE = 100;

/**
 * অ্যাফিলিয়েট স্ট্যাটাস টাইপ
 */
export type AffiliateStatus = typeof DEFAULT_AFFILIATE_STATUS;

/**
 * অ্যাফিলিয়েট টাইপ
 */
export type AffiliateType = 'individual' | 'business' | 'influencer' | 'blogger';

/**
 * অ্যাফিলিয়েট ইন্টারফেস
 */
export interface AffiliateInterface {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: AffiliateType;
  status: AffiliateStatus;
  commissionRate: number;
  totalEarnings: number;
  totalSales: number;
  joinDate: Date;
  referralCode: string;
  website?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: AffiliateMetadata;
}

/**
 * অ্যাফিলিয়েট মেটাডেটা ইন্টারফেস
 */
export interface AffiliateMetadata {
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

/**
 * অ্যাফিলিয়েট তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateAffiliateInput {
  name: string;
  email: string;
  phone?: string;
  type: AffiliateType;
  commissionRate: number;
  referralCode: string;
  website?: string;
  notes?: string;
  metadata?: AffiliateMetadata;
  status?: AffiliateStatus;
}

/**
 * অ্যাফিলিয়েট আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateAffiliateInput {
  name?: string;
  email?: string;
  phone?: string;
  type?: AffiliateType;
  status?: AffiliateStatus;
  commissionRate?: number;
  totalEarnings?: number;
  totalSales?: number;
  website?: string;
  notes?: string;
  metadata?: AffiliateMetadata;
}

/**
 * অ্যাফিলিয়েট ফিল্টার ইন্টারফেস
 */
export interface AffiliateFilter {
  search?: string;
  status?: AffiliateStatus;
  type?: AffiliateType;
  minCommission?: number;
  maxCommission?: number;
  joinDateFrom?: Date;
  joinDateTo?: Date;
  minEarnings?: number;
  maxEarnings?: number;
  limit?: number;
  offset?: number;
}

/**
 * অ্যাফিলিয়েট স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAffiliateStatus(status: string): status is AffiliateStatus {
  return status === 'pending';
}

/**
 * অ্যাফিলিয়েট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAffiliateType(type: string): type is AffiliateType {
  return ['individual', 'business', 'influencer', 'blogger'].includes(type);
}

/**
 * অ্যাফিলিয়েট নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidAffiliateName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_AFFILIATE_NAME_LENGTH;
}

/**
 * কমিশন রেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCommissionRate(rate: number): boolean {
  return typeof rate === 'number' && rate >= MIN_COMMISSION_RATE && rate <= MAX_COMMISSION_RATE;
}

/**
 * অ্যাফিলিয়েট রেফারেল কোড জেনারেট করার ফাংশন
 */
export function generateReferralCode(name: string): string {
  const prefix = name.substring(0, 3).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${random}`;
}

/**
 * অ্যাফিলিয়েট সক্রিয় কিনা চেক করার ফাংশন
 */
export function isAffiliateActive(affiliate: AffiliateInterface): boolean {
  return affiliate.status === 'pending';
}

/**
 * অ্যাফিলিয়েট এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isAffiliateEditable(affiliate: AffiliateInterface): boolean {
  return affiliate.status === 'pending';
}

/**
 * অ্যাফিলিয়েটের মোট উপার্জন আপডেট করার ফাংশন
 */
export function updateAffiliateEarnings(
  affiliate: AffiliateInterface,
  saleAmount: number
): AffiliateInterface {
  const commission = (saleAmount * affiliate.commissionRate) / 100;
  return {
    ...affiliate,
    totalEarnings: affiliate.totalEarnings + commission,
    totalSales: affiliate.totalSales + 1,
  };
}

/**
 * ডিফল্ট অ্যাফিলিয়েট স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultAffiliateStatus(): AffiliateStatus {
  return DEFAULT_AFFILIATE_STATUS;
}

/**
 * সব অ্যাফিলিয়েট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllAffiliateTypes(): AffiliateType[] {
  return ['individual', 'business', 'influencer', 'blogger'];
}

/**
 * অ্যাফিলিয়েট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getAffiliateTypeLabel(type: AffiliateType): string {
  const labels: Record<AffiliateType, string> = {
    individual: 'Individual',
    business: 'Business',
    influencer: 'Influencer',
    blogger: 'Blogger',
  };
  return labels[type];
}
