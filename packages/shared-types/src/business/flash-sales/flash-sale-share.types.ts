/**
 * Flash Sale Share Types
 * ফ্ল্যাশ সেল শেয়ার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleShare extends BaseEntity {
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  platform:
    'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'email' | 'copy_link' | 'other';
  shareUrl: string;
  shareCode: string;
  clicks: number;
  conversions: number;
  metadata?: Record<string, string | number | boolean>;
  sharedAt: Date;
  lastClickedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleShareCreateInput {
  flashSaleId: string;
  userId: string;
  platform:
    'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'email' | 'copy_link' | 'other';
  shareUrl: string;
  shareCode: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleShareUpdateInput {
  clicks?: number;
  conversions?: number;
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
