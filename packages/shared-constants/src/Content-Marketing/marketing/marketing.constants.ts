/**
 * মার্কেটিং মডিউল সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * মার্কেটিং ম্যানেজমেন্ট মডিউলের নাম
 */
export const MARKETING_MODULE_NAME = 'Marketing Management';

/**
 * ক্যাম্পেইনের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_CAMPAIGN_STATUS = 'draft' as const;

/**
 * মার্কেটিং সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const MARKETING_SORT_FIELDS = ['createdAt', 'updatedAt', 'name', 'budget'] as const;

/**
 * মার্কেটিং সাজানোর ফিল্ড টাইপ
 */
export type MarketingSortField = (typeof MARKETING_SORT_FIELDS)[number];

/**
 * ক্যাম্পেইন স্ট্যাটাস টাইপ
 */
export type CampaignStatus = typeof DEFAULT_CAMPAIGN_STATUS;

/**
 * মার্কেটিং ক্যাম্পেইন ইন্টারফেস
 */
export interface CampaignInterface {
  id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  budget: number;
  spent: number;
  startDate: Date;
  endDate?: Date;
  targetAudience: string[];
  channels: string[];
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: CampaignMetadata;
}

/**
 * ক্যাম্পেইন মেটাডেটা ইন্টারফেস
 */
export interface CampaignMetadata {
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  team?: string[];
  notes?: string;
}

/**
 * ক্যাম্পেইন তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateCampaignInput {
  name: string;
  description?: string;
  budget: number;
  startDate: Date;
  endDate?: Date;
  targetAudience: string[];
  channels: string[];
  goals: string[];
  metadata?: CampaignMetadata;
  status?: CampaignStatus;
}

/**
 * ক্যাম্পেইন আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateCampaignInput {
  name?: string;
  description?: string;
  budget?: number;
  spent?: number;
  startDate?: Date;
  endDate?: Date;
  targetAudience?: string[];
  channels?: string[];
  goals?: string[];
  metadata?: CampaignMetadata;
  status?: CampaignStatus;
}

/**
 * ক্যাম্পেইন ফিল্টার ইন্টারফেস
 */
export interface CampaignFilter {
  search?: string;
  status?: CampaignStatus;
  minBudget?: number;
  maxBudget?: number;
  startDateFrom?: Date;
  startDateTo?: Date;
  channel?: string;
  sortBy?: MarketingSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * মার্কেটিং সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidMarketingSortField(field: string): field is MarketingSortField {
  return MARKETING_SORT_FIELDS.includes(field as MarketingSortField);
}

/**
 * ক্যাম্পেইন স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignStatus(status: string): status is CampaignStatus {
  return status === 'draft';
}

/**
 * ক্যাম্পেইন নাম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  const trimmedName = name.trim();
  return trimmedName.length > 0 && trimmedName.length <= 100;
}

/**
 * ক্যাম্পেইন বাজেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidBudget(budget: number): boolean {
  return typeof budget === 'number' && budget >= 0 && budget <= 1000000000;
}

/**
 * ক্যাম্পেইন সক্রিয় কিনা চেক করার ফাংশন
 */
export function isCampaignActive(campaign: CampaignInterface): boolean {
  const now = new Date();
  return (
    campaign.status === 'draft' &&
    campaign.startDate <= now &&
    (!campaign.endDate || campaign.endDate >= now)
  );
}

/**
 * ক্যাম্পেইন সম্পন্ন হয়েছে কিনা চেক করার ফাংশন
 */
export function isCampaignCompleted(campaign: CampaignInterface): boolean {
  return campaign.endDate ? campaign.endDate < new Date() : false;
}

/**
 * ক্যাম্পেইনের বাকি বাজেট গণনা করার ফাংশন
 */
export function calculateRemainingBudget(campaign: CampaignInterface): number {
  return Math.max(0, campaign.budget - campaign.spent);
}

/**
 * ক্যাম্পেইনের খরচের শতাংশ গণনা করার ফাংশন
 */
export function calculateSpentPercentage(campaign: CampaignInterface): number {
  if (campaign.budget === 0) {
    return 0;
  }
  return Math.min(100, (campaign.spent / campaign.budget) * 100);
}

/**
 * ক্যাম্পেইন এডিটযোগ্য কিনা চেক করার ফাংশন
 */
export function isCampaignEditable(campaign: CampaignInterface): boolean {
  return campaign.status === 'draft' && !isCampaignCompleted(campaign);
}

/**
 * ডিফল্ট ক্যাম্পেইন স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultCampaignStatus(): CampaignStatus {
  return DEFAULT_CAMPAIGN_STATUS;
}
