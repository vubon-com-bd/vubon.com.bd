/**
 * Vendor Preferences Types
 * ভেন্ডর প্রেফারেন্স সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorPreferences extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard: {
    defaultTab: string;
    widgets: string[];
    layout: string;
  };
  reporting: {
    defaultPeriod: 'daily' | 'weekly' | 'monthly';
    defaultFormat: 'pdf' | 'csv' | 'excel';
  };
  catalog: {
    defaultView: 'grid' | 'list';
    itemsPerPage: number;
  };
  orders: {
    defaultStatus: string[];
    autoConfirm: boolean;
  };
  marketing: {
    emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
    promotionalEmails: boolean;
  };
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorPreferencesCreateInput {
  vendorId: string;
  theme?: 'light' | 'dark' | 'system';
  compactMode?: boolean;
  animations?: boolean;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard?: {
    defaultTab: string;
    widgets: string[];
    layout: string;
  };
  reporting?: {
    defaultPeriod: 'daily' | 'weekly' | 'monthly';
    defaultFormat: 'pdf' | 'csv' | 'excel';
  };
  catalog?: {
    defaultView: 'grid' | 'list';
    itemsPerPage: number;
  };
  orders?: {
    defaultStatus: string[];
    autoConfirm: boolean;
  };
  marketing?: {
    emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
    promotionalEmails: boolean;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPreferencesUpdateInput {
  theme?: 'light' | 'dark' | 'system';
  compactMode?: boolean;
  animations?: boolean;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  dashboard?: {
    defaultTab: string;
    widgets: string[];
    layout: string;
  };
  reporting?: {
    defaultPeriod: 'daily' | 'weekly' | 'monthly';
    defaultFormat: 'pdf' | 'csv' | 'excel';
  };
  catalog?: {
    defaultView: 'grid' | 'list';
    itemsPerPage: number;
  };
  orders?: {
    defaultStatus: string[];
    autoConfirm: boolean;
  };
  marketing?: {
    emailDigest: 'daily' | 'weekly' | 'monthly' | 'never';
    promotionalEmails: boolean;
  };
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorPreferencesResponse {
  vendorPreferences: VendorPreferences;
}
