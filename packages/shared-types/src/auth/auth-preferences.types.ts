/**
 * Auth Preferences Types
 * প্রমাণীকরণ প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';

export interface AuthPreferences extends BaseEntity {
  userId: string;
  // Language & Locale
  language: 'bn' | 'en';
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  // UI Preferences
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
  // Notification Preferences
  emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
  smsEnabled: boolean;
  pushEnabled: boolean;
  marketingEmails: boolean;
  // Security Preferences
  rememberMe: boolean;
  autoLogout: boolean;
  autoLogoutTimeout: number;
  // Metadata
  metadata?: Record<string, unknown>;
}

export interface AuthPreferencesUpdateInput {
  language?: 'bn' | 'en';
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  theme?: 'light' | 'dark' | 'system';
  compactMode?: boolean;
  animations?: boolean;
  emailDigest?: 'daily' | 'weekly' | 'monthly' | 'never';
  smsEnabled?: boolean;
  pushEnabled?: boolean;
  marketingEmails?: boolean;
  rememberMe?: boolean;
  autoLogout?: boolean;
  autoLogoutTimeout?: number;
  metadata?: Record<string, unknown>;
}
