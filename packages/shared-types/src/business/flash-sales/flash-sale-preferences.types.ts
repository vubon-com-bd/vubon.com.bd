/**
 * Flash Sale Preferences Types
 * ফ্ল্যাশ সেল প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';

export interface FlashSalePreferences extends BaseEntity {
  userId: string;
  user: User;
  categories: string[];
  brands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  discountRange: {
    min: number;
    max: number;
  };
  notificationTypes: ('email' | 'sms' | 'push' | 'in_app')[];
  notificationFrequency: 'instant' | 'daily' | 'weekly';
  language: 'bn' | 'en';
  currency: string;
  timezone: string;
  isActive: boolean;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSalePreferencesCreateInput {
  userId: string;
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  discountRange?: {
    min: number;
    max: number;
  };
  notificationTypes?: ('email' | 'sms' | 'push' | 'in_app')[];
  notificationFrequency?: 'instant' | 'daily' | 'weekly';
  language?: 'bn' | 'en';
  currency?: string;
  timezone?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSalePreferencesUpdateInput {
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  discountRange?: {
    min: number;
    max: number;
  };
  notificationTypes?: ('email' | 'sms' | 'push' | 'in_app')[];
  notificationFrequency?: 'instant' | 'daily' | 'weekly';
  language?: 'bn' | 'en';
  currency?: string;
  timezone?: string;
  isActive?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSalePreferencesResponse {
  flashSalePreferences: FlashSalePreferences;
}
