/**
 * লিড জেনারেশন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লিড জেনারেশন মডিউলের নাম
 */
export const LEAD_GENERATION_MODULE_NAME = 'Lead Generation';

/**
 * লিডের ডিফল্ট স্ট্যাটাস
 */
export const DEFAULT_LEAD_STATUS = 'new' as const;

/**
 * সর্বোচ্চ লিড স্কোর
 */
export const MAX_LEAD_SCORE = 100;

/**
 * লিড স্কোর থ্রেশহোল্ড
 */
export const LEAD_SCORE_THRESHOLDS = {
  cold: 0,
  warm: 30,
  hot: 70,
} as const;

/**
 * লিড স্ট্যাটাস টাইপ
 */
export type LeadStatus = typeof DEFAULT_LEAD_STATUS;

/**
 * লিড স্কোর ক্যাটাগরি
 */
export type LeadScoreCategory = 'cold' | 'warm' | 'hot';

/**
 * লিড উৎস টাইপ
 */
export type LeadSource =
  'website' | 'referral' | 'social-media' | 'email' | 'event' | 'paid-ad' | 'organic';

/**
 * লিড ইন্টারফেস
 */
export interface LeadInterface {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: LeadStatus;
  score: number;
  source: LeadSource;
  company?: string;
  position?: string;
  interests: string[];
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  convertedAt?: Date;
  metadata?: LeadMetadata;
}

/**
 * লিড মেটাডেটা ইন্টারফেস
 */
export interface LeadMetadata {
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  landingPage?: string;
  campaignId?: string;
  adId?: string;
  leadScoreFactors?: {
    engagement?: number;
    fit?: number;
    intent?: number;
  };
  customFields?: Record<string, string>;
}

/**
 * লিড তৈরির জন্য ইনপুট ইন্টারফেস
 */
export interface CreateLeadInput {
  name: string;
  email: string;
  phone?: string;
  source: LeadSource;
  company?: string;
  position?: string;
  interests?: string[];
  assignedTo?: string;
  notes?: string;
  metadata?: LeadMetadata;
  status?: LeadStatus;
}

/**
 * লিড আপডেটের জন্য ইনপুট ইন্টারফেস
 */
export interface UpdateLeadInput {
  name?: string;
  email?: string;
  phone?: string;
  status?: LeadStatus;
  score?: number;
  source?: LeadSource;
  company?: string;
  position?: string;
  interests?: string[];
  assignedTo?: string;
  notes?: string;
  convertedAt?: Date;
  metadata?: LeadMetadata;
}

/**
 * লিড ফিল্টার ইন্টারফেস
 */
export interface LeadFilter {
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  minScore?: number;
  maxScore?: number;
  assignedTo?: string;
  fromDate?: Date;
  toDate?: Date;
  isConverted?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * লিড স্ট্যাটাস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadStatus(status: string): status is LeadStatus {
  return status === 'new';
}

/**
 * লিড উৎস বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadSource(source: string): source is LeadSource {
  return ['website', 'referral', 'social-media', 'email', 'event', 'paid-ad', 'organic'].includes(
    source
  );
}

/**
 * লিড স্কোর বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLeadScore(score: number): boolean {
  return typeof score === 'number' && score >= 0 && score <= MAX_LEAD_SCORE;
}

/**
 * লিড স্কোর ক্যাটাগরি নির্ধারণ করার ফাংশন
 */
export function getLeadScoreCategory(score: number): LeadScoreCategory {
  if (score >= LEAD_SCORE_THRESHOLDS.hot) return 'hot';
  if (score >= LEAD_SCORE_THRESHOLDS.warm) return 'warm';
  return 'cold';
}

/**
 * লিড স্কোর ক্যাটাগরির লেবেল পাওয়ার ফাংশন
 */
export function getLeadScoreCategoryLabel(category: LeadScoreCategory): string {
  const labels: Record<LeadScoreCategory, string> = {
    cold: 'Cold',
    warm: 'Warm',
    hot: 'Hot',
  };
  return labels[category];
}

/**
 * লিড স্কোর ক্যাটাগরির রঙ পাওয়ার ফাংশন
 */
export function getLeadScoreCategoryColor(category: LeadScoreCategory): string {
  const colors: Record<LeadScoreCategory, string> = {
    cold: '#6B7280',
    warm: '#F59E0B',
    hot: '#EF4444',
  };
  return colors[category];
}

/**
 * লিড হট কিনা চেক করার ফাংশন
 */
export function isHotLead(score: number): boolean {
  return score >= LEAD_SCORE_THRESHOLDS.hot;
}

/**
 * লিড ওয়ার্ম কিনা চেক করার ফাংশন
 */
export function isWarmLead(score: number): boolean {
  return score >= LEAD_SCORE_THRESHOLDS.warm && score < LEAD_SCORE_THRESHOLDS.hot;
}

/**
 * লিড কোল্ড কিনা চেক করার ফাংশন
 */
export function isColdLead(score: number): boolean {
  return score < LEAD_SCORE_THRESHOLDS.warm;
}

/**
 * লিড কনভার্টেড হয়েছে কিনা চেক করার ফাংশন
 */
export function isLeadConverted(lead: LeadInterface): boolean {
  return lead.convertedAt !== undefined;
}

/**
 * লিড কনভার্ট করার ফাংশন
 */
export function convertLead(lead: LeadInterface): LeadInterface {
  return {
    ...lead,
    convertedAt: lead.convertedAt || new Date(),
  };
}

/**
 * লিড স্কোর আপডেট করার ফাংশন
 */
export function updateLeadScore(lead: LeadInterface, newScore: number): LeadInterface {
  return {
    ...lead,
    score: Math.max(0, Math.min(newScore, MAX_LEAD_SCORE)),
  };
}

/**
 * লিড স্কোর ইনক্রিমেন্ট করার ফাংশন
 */
export function incrementLeadScore(lead: LeadInterface, points: number): LeadInterface {
  return updateLeadScore(lead, lead.score + points);
}

/**
 * লিড স্কোর ডিক্রিমেন্ট করার ফাংশন
 */
export function decrementLeadScore(lead: LeadInterface, points: number): LeadInterface {
  return updateLeadScore(lead, lead.score - points);
}

/**
 * ডিফল্ট লিড স্ট্যাটাস পাওয়ার ফাংশন
 */
export function getDefaultLeadStatus(): LeadStatus {
  return DEFAULT_LEAD_STATUS;
}

/**
 * সব লিড উৎসের তালিকা পাওয়ার ফাংশন
 */
export function getAllLeadSources(): LeadSource[] {
  return ['website', 'referral', 'social-media', 'email', 'event', 'paid-ad', 'organic'];
}

/**
 * লিড উৎসের লেবেল পাওয়ার ফাংশন
 */
export function getLeadSourceLabel(source: LeadSource): string {
  const labels: Record<LeadSource, string> = {
    website: 'Website',
    referral: 'Referral',
    'social-media': 'Social Media',
    email: 'Email',
    event: 'Event',
    'paid-ad': 'Paid Ad',
    organic: 'Organic Search',
  };
  return labels[source];
}

/**
 * লিড উৎসের আইকন পাওয়ার ফাংশন
 */
export function getLeadSourceIcon(source: LeadSource): string {
  const icons: Record<LeadSource, string> = {
    website: '🌐',
    referral: '🤝',
    'social-media': '📱',
    email: '📧',
    event: '🎪',
    'paid-ad': '💰',
    organic: '🔍',
  };
  return icons[source];
}
