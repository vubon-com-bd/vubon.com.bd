/**
 * Flash Sale Settings Types
 * ফ্ল্যাশ সেল সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface FlashSaleSettings extends BaseEntity {
  flashSaleId: string;
  maxProducts: number;
  maxDiscount: number;
  minDiscount: number;
  maxQuantityPerUser: number;
  minQuantityPerUser: number;
  autoApprove: boolean;
  autoPublish: boolean;
  notificationEnabled: boolean;
  wishlistEnabled: boolean;
  shareEnabled: boolean;
  analyticsEnabled: boolean;
  reportingEnabled: boolean;
  defaultCurrency: string;
  timezone: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleSettingsCreateInput {
  flashSaleId: string;
  maxProducts?: number;
  maxDiscount?: number;
  minDiscount?: number;
  maxQuantityPerUser?: number;
  minQuantityPerUser?: number;
  autoApprove?: boolean;
  autoPublish?: boolean;
  notificationEnabled?: boolean;
  wishlistEnabled?: boolean;
  shareEnabled?: boolean;
  analyticsEnabled?: boolean;
  reportingEnabled?: boolean;
  defaultCurrency?: string;
  timezone?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleSettingsUpdateInput {
  maxProducts?: number;
  maxDiscount?: number;
  minDiscount?: number;
  maxQuantityPerUser?: number;
  minQuantityPerUser?: number;
  autoApprove?: boolean;
  autoPublish?: boolean;
  notificationEnabled?: boolean;
  wishlistEnabled?: boolean;
  shareEnabled?: boolean;
  analyticsEnabled?: boolean;
  reportingEnabled?: boolean;
  defaultCurrency?: string;
  timezone?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleSettingsResponse {
  flashSaleSettings: FlashSaleSettings;
}
