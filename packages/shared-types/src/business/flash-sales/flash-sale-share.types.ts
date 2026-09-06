/**
 * Flash Sale Share Types
 * ফ্ল্যাশ সেল শেয়ার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { FlashSale } from './flash-sale.types';
import { FLASH_SALE_SHARE } from '@vubon/shared-constants';

export interface FlashSaleShare extends BaseEntity {
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  platform: (typeof FLASH_SALE_SHARE.PLATFORMS)[keyof typeof FLASH_SALE_SHARE.PLATFORMS];
  shareUrl: string;
  shareCode: string;
  clicks: number;
  conversions: number;
  status: (typeof FLASH_SALE_SHARE.STATUS)[keyof typeof FLASH_SALE_SHARE.STATUS];
  metadata?: Record<string, string | number | boolean>;
  sharedAt: Date;
  lastClickedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleShareCreateInput {
  flashSaleId: string;
  userId: string;
  platform: (typeof FLASH_SALE_SHARE.PLATFORMS)[keyof typeof FLASH_SALE_SHARE.PLATFORMS];
  shareUrl: string;
  shareCode: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleShareUpdateInput {
  clicks?: number;
  conversions?: number;
  status?: (typeof FLASH_SALE_SHARE.STATUS)[keyof typeof FLASH_SALE_SHARE.STATUS];
  lastClickedAt?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleShareResponse {
  flashSaleShare: FlashSaleShare;
}

export interface FlashSaleShareStats {
  totalShares: number;
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  topPlatform: string;
}
