/**
 * Admin Analytics Types
 * অ্যাডমিন অ্যানালিটিক্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export interface AdminAnalytics extends BaseEntity {
  adminId: string;
  type: 'login' | 'activity' | 'performance' | 'security' | 'custom';
  data: Record<string, unknown>;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  metadata?: Record<string, unknown>;
}

export interface AdminAnalyticsCreateInput {
  adminId: string;
  type: 'login' | 'activity' | 'performance' | 'security' | 'custom';
  data: Record<string, unknown>;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  metadata?: Record<string, unknown>;
}

export interface AdminAnalyticsQuery {
  adminId?: string;
  type?: 'login' | 'activity' | 'performance' | 'security' | 'custom';
  period?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

export interface AdminAnalyticsSummary {
  totalAdmins: number;
  activeAdmins: number;
  newAdmins: number;
  loginCount: number;
  activityCount: number;
  performanceScore: number;
  securityScore: number;
}
