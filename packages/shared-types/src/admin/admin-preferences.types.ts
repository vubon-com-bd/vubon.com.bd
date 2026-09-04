/**
 * Admin Preferences Types
 * অ্যাডমিন প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_PREFERENCES } from '@vubon/shared-constants';

export interface AdminPreferences extends BaseEntity {
  adminId: string;
  theme: (typeof ADMIN_PREFERENCES.THEMES)[keyof typeof ADMIN_PREFERENCES.THEMES];
  layout: (typeof ADMIN_PREFERENCES.LAYOUTS)[keyof typeof ADMIN_PREFERENCES.LAYOUTS];
  navigation: (typeof ADMIN_PREFERENCES.NAVIGATIONS)[keyof typeof ADMIN_PREFERENCES.NAVIGATIONS];
  language: (typeof ADMIN_PREFERENCES.LANGUAGES)[keyof typeof ADMIN_PREFERENCES.LANGUAGES];
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  itemsPerPage: number;
  compactMode: boolean;
  animations: boolean;
  sound: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  metadata?: Record<string, unknown>;
}

export interface AdminPreferencesCreateInput {
  adminId: string;
  theme?: (typeof ADMIN_PREFERENCES.THEMES)[keyof typeof ADMIN_PREFERENCES.THEMES];
  layout?: (typeof ADMIN_PREFERENCES.LAYOUTS)[keyof typeof ADMIN_PREFERENCES.LAYOUTS];
  navigation?: (typeof ADMIN_PREFERENCES.NAVIGATIONS)[keyof typeof ADMIN_PREFERENCES.NAVIGATIONS];
  language?: (typeof ADMIN_PREFERENCES.LANGUAGES)[keyof typeof ADMIN_PREFERENCES.LANGUAGES];
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  itemsPerPage?: number;
  compactMode?: boolean;
  animations?: boolean;
  sound?: boolean;
  reducedMotion?: boolean;
  highContrast?: boolean;
  metadata?: Record<string, unknown>;
}

// UpdateInput Partial ব্যবহার
export type AdminPreferencesUpdateInput = Partial<AdminPreferencesCreateInput>;
