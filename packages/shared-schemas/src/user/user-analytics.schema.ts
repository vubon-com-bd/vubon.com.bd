/**
 * User Analytics Schema
 * ইউজার অ্যানালিটিক্স সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const UserDeviceStatsSchema = z.object({
  deviceType: z.enum(['desktop', 'mobile', 'tablet', 'other']),
  platform: z.string(),
  browser: z.string(),
  visits: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});

export const UserLocationStatsSchema = z.object({
  country: z.string(),
  city: z.string(),
  region: z.string(),
  visits: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});

export const UserReferrerStatsSchema = z.object({
  source: z.string(),
  medium: z.string(),
  visits: z.number().int().nonnegative(),
  percentage: z.number().min(0).max(100),
});

export const UserAnalyticsSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  totalVisits: z.number().int().nonnegative().default(0),
  uniqueVisits: z.number().int().nonnegative().default(0),
  pageViews: z.number().int().nonnegative().default(0),
  sessionDuration: z.number().nonnegative().default(0),
  bounceRate: z.number().min(0).max(100).default(0),
  lastVisitAt: z.date().optional(),
  devices: z.array(UserDeviceStatsSchema).default([]),
  locations: z.array(UserLocationStatsSchema).default([]),
  referrers: z.array(UserReferrerStatsSchema).default([]),
  metadata: z.record(z.unknown()).optional(),
});

export const UserAnalyticsSummarySchema = z.object({
  totalUsers: z.number().int().nonnegative(),
  activeUsers: z.number().int().nonnegative(),
  newUsers: z.number().int().nonnegative(),
  returningUsers: z.number().int().nonnegative(),
  averageSessionDuration: z.number().nonnegative(),
  bounceRate: z.number().min(0).max(100),
  topLocations: z.array(UserLocationStatsSchema),
  topDevices: z.array(UserDeviceStatsSchema),
  topReferrers: z.array(UserReferrerStatsSchema),
});

export const UserAnalyticsFilterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  userId: z.string().uuid().optional(),
  deviceType: z.enum(['desktop', 'mobile', 'tablet', 'other']).optional(),
  country: z.string().optional(),
  source: z.string().optional(),
});

export const UserAnalyticsCreateSchema = UserAnalyticsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UserAnalyticsUpdateSchema = UserAnalyticsSchema.partial();

export type UserAnalyticsSchemaType = z.infer<typeof UserAnalyticsSchema>;
export type UserAnalyticsSummarySchemaType = z.infer<typeof UserAnalyticsSummarySchema>;
export type UserAnalyticsFilterSchemaType = z.infer<typeof UserAnalyticsFilterSchema>;
export type UserAnalyticsCreateSchemaType = z.infer<typeof UserAnalyticsCreateSchema>;
export type UserAnalyticsUpdateSchemaType = z.infer<typeof UserAnalyticsUpdateSchema>;
