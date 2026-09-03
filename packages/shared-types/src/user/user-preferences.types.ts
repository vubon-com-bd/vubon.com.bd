/**
 * User Preferences Types
 * ইউজার প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export type UserPreferencesLanguage = 'bn' | 'en';

export interface UserPreferences extends BaseEntity {
  userId: string;
  content: {
    language: UserPreferencesLanguage;
    region: string;
    contentType: string[];
    notificationTypes: ('email' | 'sms' | 'push' | 'in_app')[];
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    layout: 'default' | 'compact' | 'sidebar';
    navigation: 'sidebar' | 'top' | 'bottom';
    compact: boolean;
    animations: boolean;
    sound: boolean;
    vibration: boolean;
  };
  communication: {
    emailFrequency: 'daily' | 'weekly' | 'monthly' | 'never';
    smsEnabled: boolean;
    pushEnabled: boolean;
    inAppEnabled: boolean;
    marketingEmails: boolean;
    newsletter: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'x-large';
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
    captions: boolean;
  };
  metadata?: Record<string, unknown>;
}

export interface UserPreferencesUpdateInput {
  userId?: string;
  content?: Partial<UserPreferences['content']>;
  ui?: Partial<UserPreferences['ui']>;
  communication?: Partial<UserPreferences['communication']>;
  accessibility?: Partial<UserPreferences['accessibility']>;
  metadata?: Record<string, unknown>;
}

export interface UserPreferencesCreateInput {
  userId: string;
  content: UserPreferences['content'];
  ui: UserPreferences['ui'];
  communication: UserPreferences['communication'];
  accessibility: UserPreferences['accessibility'];
  metadata?: Record<string, unknown>;
}
