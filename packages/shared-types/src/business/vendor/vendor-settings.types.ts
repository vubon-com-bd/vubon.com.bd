/**
 * Vendor Settings Types
 * ভেন্ডর সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorSettings extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  language: 'bn' | 'en';
  timezone: string;
  currency: string;
  dateFormat: string;
  timeFormat: string;
  notificationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  autoApproveOrders: boolean;
  autoPublishProducts: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  orderConfirmationEnabled: boolean;
  invoiceGeneration: boolean;
  receiptGeneration: boolean;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorSettingsCreateInput {
  vendorId: string;
  language?: 'bn' | 'en';
  timezone?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
  notificationEnabled?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  autoApproveOrders?: boolean;
  autoPublishProducts?: boolean;
  lowStockAlert?: boolean;
  lowStockThreshold?: number;
  orderConfirmationEnabled?: boolean;
  invoiceGeneration?: boolean;
  receiptGeneration?: boolean;
  taxRate?: number;
  shippingFee?: number;
  freeShippingThreshold?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSettingsUpdateInput {
  language?: 'bn' | 'en';
  timezone?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
  notificationEnabled?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  autoApproveOrders?: boolean;
  autoPublishProducts?: boolean;
  lowStockAlert?: boolean;
  lowStockThreshold?: number;
  orderConfirmationEnabled?: boolean;
  invoiceGeneration?: boolean;
  receiptGeneration?: boolean;
  taxRate?: number;
  shippingFee?: number;
  freeShippingThreshold?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorSettingsResponse {
  vendorSettings: VendorSettings;
}
