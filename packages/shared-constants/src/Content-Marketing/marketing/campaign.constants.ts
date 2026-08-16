/**
 * ক্যাম্পেইন ম্যানেজমেন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ক্যাম্পেইন ম্যানেজমেন্ট মডিউলের নাম
 */
export const CAMPAIGN_MODULE_NAME = 'Campaign Management';

/**
 * ক্যাম্পেইনের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_CAMPAIGN_STATUS = 'draft' as const;

/**
 * ক্যাম্পেইন নামের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CAMPAIGN_NAME_LENGTH = 200;

/**
 * ক্যাম্পেইন বিবরণের সর্বোচ্চ দৈর্ঘ্য
 */
export const MAX_CAMPAIGN_DESCRIPTION_LENGTH = 1000;

/**
 * ক্যাম্পেইন সাজানোর জন্য অনুমোদিত ফিল্ডসমূহ
 */
export const CAMPAIGN_SORT_FIELDS = ['createdAt', 'startDate', 'endDate', 'budget'] as const;

/**
 * ক্যাম্পেইন সাজানোর ফিল্ড টাইপ
 */
export type CampaignSortField = (typeof CAMPAIGN_SORT_FIELDS)[number];

/**
 * ক্যাম্পেইন স্ট্যাটাস টাইপ
 */
export type CampaignStatus = typeof DEFAULT_CAMPAIGN_STATUS;

/**
 * ক্যাম্পেইন টাইপ
 */
export type CampaignType = 'email' | 'social' | 'ppc' | 'content' | 'affiliate' | 'event';

/**
 * ক্যাম্পেইন ইন্টারফেস
 */
export interface CampaignInterface {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: CampaignStatus;
  type: CampaignType;
  budget: number;
  spent: number;
  startDate: Date;
  endDate?: Date;
  targetAudience: string[];
  channels: string[];
  goals: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: CampaignMetadata;
}

/**
 * ক্যাম্পেইন মেটাডেটা ইন্টারফেস
 */
export interface CampaignMetadata {
  priority?: 'low' | 'medium' | 'high';
  team?: string[];
  notes?: string;
  attachments?: string[];
  color?: string;
  icon?: string;
}

/**
 * ক্যাম্পেইন তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateCampaignInput {
  name: string;
  slug: string;
  description?: string;
  type: CampaignType;
  budget: number;
  startDate: Date;
  endDate?: Date;
  targetAudience: string[];
  channels: string[];
  goals: string[];
  tags?: string[];
  metadata?: CampaignMetadata;
  status?: CampaignStatus;
}

/**
 * ক্যাম্পেইন আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateCampaignInput {
  name?: string;
  slug?: string;
  description?: string;
  type?: CampaignType;
  budget?: number;
  spent?: number;
  startDate?: Date;
  endDate?: Date;
  targetAudience?: string[];
  channels?: string[];
  goals?: string[];
  tags?: string[];
  metadata?: CampaignMetadata;
  status?: CampaignStatus;
}

/**
 * ক্যাম্পেইন ফিল্টার ইন্টারফেস
 */
export interface CampaignFilter {
  search?: string;
  status?: CampaignStatus;
  type?: CampaignType;
  minBudget?: number;
  maxBudget?: number;
  startDateFrom?: Date;
  startDateTo?: Date;
  endDateFrom?: Date;
  endDateTo?: Date;
  channel?: string;
  tag?: string;
  sortBy?: CampaignSortField;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * ক্যাম্পেইন সাজানোর ফিল্ড বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignSortField(field: string): field is CampaignSortField {
  return CAMPAIGN_SORT_FIELDS.includes(field as CampaignSortField);
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
  return trimmedName.length > 0 && trimmedName.length <= MAX_CAMPAIGN_NAME_LENGTH;
}

/**
 * ক্যাম্পেইন বিবরণ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignDescription(description: string): boolean {
  if (!description) return true;
  return description.length <= MAX_CAMPAIGN_DESCRIPTION_LENGTH;
}

/**
 * ক্যাম্পেইন বাজেট বৈধ কিনা চেক করার ফাংশন
 */
export function isValidCampaignBudget(budget: number): boolean {
  return typeof budget === 'number' && budget >= 0 && budget <= 1000000000;
}

/**
 * ক্যাম্পেইন স্লাগ তৈরির ফাংশন
 */
export function generateCampaignSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
export function calculateCampaignRemainingBudget(campaign: CampaignInterface): number {
  return Math.max(0, campaign.budget - campaign.spent);
}

/**
 * ক্যাম্পেইনের খরচের শতাংশ গণনা করার ফাংশন
 */
export function calculateCampaignSpentPercentage(campaign: CampaignInterface): number {
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

/**
 * সব ক্যাম্পেইন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllCampaignTypes(): CampaignType[] {
  return ['email', 'social', 'ppc', 'content', 'affiliate', 'event'];
}
