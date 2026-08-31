/**
 * User Analytics Types
 * Types for user analytics, tracking, and insights
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';

// ============================================================
// USER SESSION ANALYTICS
// ============================================================

/**
 * User session analytics
 */
export interface UserSessionAnalytics {
  /** User ID */
  userId: ID;
  /** Session ID */
  sessionId: ID;
  /** Session start time */
  startTime: Timestamp;
  /** Session end time */
  endTime?: Timestamp;
  /** Session duration in seconds */
  durationSeconds?: number;
  /** Pages viewed */
  pagesViewed: string[];
  /** Actions performed */
  actions: string[];
  /** Referrer URL */
  referrer?: string;
  /** User agent */
  userAgent: string;
  /** IP address */
  ipAddress: string;
  /** Device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'other';
  /** Browser */
  browser?: string;
  /** Operating system */
  os?: string;
  /** Screen resolution */
  screenResolution?: string;
  /** Location */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

// ============================================================
// USER ENGAGEMENT ANALYTICS
// ============================================================

/**
 * User engagement metrics
 */
export interface UserEngagementAnalytics {
  /** User ID */
  userId: ID;
  /** Time period */
  period: {
    start: Date;
    end: Date;
  };
  /** Total login count */
  loginCount: number;
  /** Total session count */
  sessionCount: number;
  /** Average session duration in seconds */
  averageSessionDuration: number;
  /** Total pages viewed */
  totalPageViews: number;
  /** Total actions performed */
  totalActions: number;
  /** Features used */
  featuresUsed: string[];
  /** Feature usage count */
  featureUsageCount: Record<string, number>;
  /** Engagement score (0-100) */
  engagementScore: number;
}

// ============================================================
// USER RETENTION ANALYTICS
// ============================================================

/**
 * User retention analytics
 */
export interface UserRetentionAnalytics {
  /** User ID */
  userId: ID;
  /** Registration date */
  registrationDate: Timestamp;
  /** Last active date */
  lastActiveDate: Timestamp;
  /** Days since registration */
  daysSinceRegistration: number;
  /** Days since last active */
  daysSinceLastActive: number;
  /** Whether user is active */
  isActive: boolean;
  /** Whether user is retained */
  isRetained: boolean;
  /** Retention cohort */
  retentionCohort: string;
  /** Retention period in days */
  retentionPeriod: number;
  /** Churn risk score (0-100) */
  churnRiskScore: number;
  /** Churn risk factors */
  churnRiskFactors?: string[];
}

// ============================================================
// USER FUNNEL ANALYTICS
// ============================================================

/**
 * Funnel step
 */
export interface UserFunnelStep {
  /** Step name */
  name: string;
  /** Step description */
  description?: string;
  /** Number of users who reached this step */
  users: number;
  /** Drop-off rate from previous step */
  dropOffRate?: number;
  /** Conversion rate from previous step */
  conversionRate?: number;
  /** Time spent on this step in seconds */
  averageTimeSpent?: number;
}

/**
 * User funnel analytics
 */
export interface UserFunnelAnalytics {
  /** Funnel ID */
  funnelId: ID;
  /** Funnel name */
  name: string;
  /** Funnel description */
  description?: string;
  /** Steps in the funnel */
  steps: UserFunnelStep[];
  /** Total users entered */
  totalUsers: number;
  /** Total users completed */
  totalCompleted: number;
  /** Overall conversion rate */
  overallConversionRate: number;
  /** Time period */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// USER COHORT ANALYTICS
// ============================================================

/**
 * User cohort analytics
 */
export interface UserCohortAnalytics {
  /** Cohort ID */
  cohortId: ID;
  /** Cohort name */
  name: string;
  /** Cohort description */
  description?: string;
  /** Cohort criteria */
  criteria: JsonObject;
  /** User count */
  userCount: number;
  /** Average retention by period */
  retentionByPeriod: Record<string, number>;
  /** Average engagement by period */
  engagementByPeriod: Record<string, number>;
  /** User distribution by status */
  statusDistribution: Record<string, number>;
  /** User distribution by type */
  typeDistribution: Record<string, number>;
  /** Time period */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// USER BEHAVIOR ANALYTICS
// ============================================================

/**
 * User behavior analytics
 */
export interface UserBehaviorAnalytics {
  /** User ID */
  userId: ID;
  /** Behavior type */
  behaviorType: string;
  /** Behavior data */
  data: JsonObject;
  /** Timestamp */
  timestamp: Timestamp;
  /** Session ID */
  sessionId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}

// ============================================================
// USER GROWTH ANALYTICS
// ============================================================

/**
 * User growth metrics
 */
export interface UserGrowthAnalytics {
  /** Total users */
  totalUsers: number;
  /** New users in period */
  newUsers: number;
  /** Active users in period */
  activeUsers: number;
  /** Inactive users in period */
  inactiveUsers: number;
  /** Churned users in period */
  churnedUsers: number;
  /** Growth rate */
  growthRate: number;
  /** Active rate */
  activeRate: number;
  /** Churn rate */
  churnRate: number;
  /** Period */
  period: {
    start: Date;
    end: Date;
  };
  /** Daily metrics */
  dailyMetrics: {
    date: Date;
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    churnedUsers: number;
  }[];
}

// ============================================================
// USER ANALYTICS FILTER
// ============================================================

/**
 * User analytics filter
 */
export interface UserAnalyticsFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Filter by session ID */
  sessionId?: ID;
  /** Filter by device type */
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'other';
  /** Filter by browser */
  browser?: string;
  /** Filter by OS */
  os?: string;
  /** Filter by location */
  location?: {
    country?: string;
    city?: string;
  };
  /** Filter by cohort */
  cohort?: string;
  /** Filter by engagement score range */
  engagementScore?: {
    min?: number;
    max?: number;
  };
  /** Filter by retention */
  isRetained?: boolean;
  /** Filter by active status */
  isActive?: boolean;
}

// ============================================================
// USER ANALYTICS SUMMARY
// ============================================================

/**
 * User analytics summary
 */
export interface UserAnalyticsSummary {
  /** User ID */
  userId: ID;
  /** Total sessions */
  totalSessions: number;
  /** Total engagement score */
  engagementScore: number;
  /** Average session duration */
  averageSessionDuration: number;
  /** Most used features */
  topFeatures: {
    feature: string;
    count: number;
  }[];
  /** Most active days */
  activeDays: {
    date: Date;
    count: number;
  }[];
  /** Device distribution */
  deviceDistribution: Record<string, number>;
  /** Browser distribution */
  browserDistribution: Record<string, number>;
  /** Location distribution */
  locationDistribution: Record<string, number>;
  /** Retention status */
  retentionStatus: 'new' | 'active' | 'at_risk' | 'churned';
  /** Last active */
  lastActive: Timestamp;
  /** Summary period */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Calculate engagement score from metrics
 */
export function calculateUserEngagementScore(
  loginCount: number,
  sessionCount: number,
  averageSessionDuration: number,
  totalPageViews: number,
  totalActions: number
): number {
  let score = 0;

  // Login frequency (max 20 points)
  if (loginCount >= 30) score += 20;
  else if (loginCount >= 20) score += 15;
  else if (loginCount >= 10) score += 10;
  else if (loginCount >= 5) score += 5;

  // Session count (max 20 points)
  if (sessionCount >= 30) score += 20;
  else if (sessionCount >= 20) score += 15;
  else if (sessionCount >= 10) score += 10;
  else if (sessionCount >= 5) score += 5;

  // Average session duration (max 20 points)
  if (averageSessionDuration >= 600)
    score += 20; // 10+ minutes
  else if (averageSessionDuration >= 300)
    score += 15; // 5+ minutes
  else if (averageSessionDuration >= 120)
    score += 10; // 2+ minutes
  else if (averageSessionDuration >= 60) score += 5; // 1+ minute

  // Page views (max 20 points)
  if (totalPageViews >= 100) score += 20;
  else if (totalPageViews >= 50) score += 15;
  else if (totalPageViews >= 20) score += 10;
  else if (totalPageViews >= 10) score += 5;

  // Actions (max 20 points)
  if (totalActions >= 100) score += 20;
  else if (totalActions >= 50) score += 15;
  else if (totalActions >= 20) score += 10;
  else if (totalActions >= 10) score += 5;

  return Math.min(100, score);
}

/**
 * Calculate churn risk score
 */
export function calculateUserChurnRisk(
  daysSinceLastActive: number,
  daysSinceRegistration: number,
  engagementScore: number,
  loginCount: number
): number {
  let score = 0;

  // Time since last active (max 30 points)
  if (daysSinceLastActive >= 90) score += 30;
  else if (daysSinceLastActive >= 60) score += 20;
  else if (daysSinceLastActive >= 30) score += 10;

  // Engagement score (max 30 points)
  if (engagementScore < 20) score += 30;
  else if (engagementScore < 40) score += 20;
  else if (engagementScore < 60) score += 10;

  // Login frequency (max 20 points)
  if (loginCount < 3) score += 20;
  else if (loginCount < 5) score += 10;

  // Account age (max 20 points)
  if (daysSinceRegistration >= 180 && loginCount < 10) score += 20;
  else if (daysSinceRegistration >= 90 && loginCount < 5) score += 10;

  return Math.min(100, score);
}

/**
 * Get retention status from metrics
 */
export function getUserRetentionStatus(
  daysSinceLastActive: number,
  engagementScore: number,
  daysSinceRegistration: number
): 'new' | 'active' | 'at_risk' | 'churned' {
  if (daysSinceRegistration <= 7) return 'new';
  if (daysSinceLastActive <= 7) return 'active';
  if (daysSinceLastActive <= 30) return 'at_risk';
  return 'churned';
}

/**
 * Calculate retention rate
 */
export function calculateUserRetentionRate(retainedUsers: number, totalUsers: number): number {
  if (totalUsers === 0) return 0;
  return (retainedUsers / totalUsers) * 100;
}

/**
 * Calculate growth rate
 */
export function calculateUserGrowthRate(newUsers: number, totalUsers: number): number {
  if (totalUsers === 0) return 0;
  return (newUsers / totalUsers) * 100;
}

/**
 * Calculate churn rate
 */
export function calculateUserChurnRate(churnedUsers: number, totalUsers: number): number {
  if (totalUsers === 0) return 0;
  return (churnedUsers / totalUsers) * 100;
}

/**
 * Get engagement level label
 */
export function getUserEngagementLevel(score: number): string {
  if (score >= 80) return 'Very High';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Low';
  return 'Very Low';
}

/**
 * Get churn risk label
 */
export function getUserChurnRiskLabel(score: number): string {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Medium Risk';
  if (score >= 20) return 'Low Risk';
  return 'No Risk';
}
