/**
 * User Analytics Types
 * ইউজার অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export interface UserAnalytics extends BaseEntity {
  userId: string;
  totalVisits: number;
  uniqueVisits: number;
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;
  lastVisitAt?: Date;
  devices: UserDeviceStats[];
  locations: UserLocationStats[];
  referrers: UserReferrerStats[];
  metadata?: Record<string, unknown>;
}

export interface UserDeviceStats {
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'other';
  platform: string;
  browser: string;
  visits: number;
  percentage: number;
}

export interface UserLocationStats {
  country: string;
  city: string;
  region: string;
  visits: number;
  percentage: number;
}

export interface UserReferrerStats {
  source: string;
  medium: string;
  visits: number;
  percentage: number;
}

export interface UserAnalyticsSummary {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
  bounceRate: number;
  topLocations: UserLocationStats[];
  topDevices: UserDeviceStats[];
  topReferrers: UserReferrerStats[];
}

export interface UserAnalyticsFilter {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  deviceType?: string;
  country?: string;
  source?: string;
}

export interface UserAnalyticsCreateInput {
  userId: string;
  totalVisits?: number;
  uniqueVisits?: number;
  pageViews?: number;
  sessionDuration?: number;
  bounceRate?: number;
  devices?: UserDeviceStats[];
  locations?: UserLocationStats[];
  referrers?: UserReferrerStats[];
  metadata?: Record<string, unknown>;
}

export interface UserAnalyticsUpdateInput extends Partial<UserAnalyticsCreateInput> {
  lastVisitAt?: Date;
}
