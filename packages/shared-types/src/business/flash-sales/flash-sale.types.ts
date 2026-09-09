import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Product } from '../product/product.types';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-status.constants';
import { FLASH_SALE_TYPE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-type.constants';
import { FlashSaleSchedule } from './flash-sale-schedule.types';
import { FlashSaleParticipant } from './flash-sale-participant.types';
import { FlashSaleRule } from './flash-sale-rule.types';
import { FlashSaleInventory } from './flash-sale-inventory.types';
import { FlashSalePrice } from './flash-sale-price.types';

export interface FlashSaleMetadata {
  bannerImage?: string;
  bannerVideo?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublic: boolean;
  viewCount: number;
  shareCount: number;
}

export interface FlashSale extends BaseEntity {
  flashSaleId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof FLASH_SALE_STATUS | string;
  type: keyof typeof FLASH_SALE_TYPE | string;
  products: Product[];
  productCount: number;
  schedule: FlashSaleSchedule;
  participants: FlashSaleParticipant[];
  participantCount: number;
  rules: FlashSaleRule[];
  inventory: FlashSaleInventory;
  pricing: FlashSalePrice;
  discountPercentage: number;
  maxDiscountAmount?: Money;
  minPurchaseAmount?: Money;
  maxPurchaseAmount?: Money;
  perUserLimit: number;
  totalLimit: number;
  soldCount: number;
  remainingCount: number;
  isActive: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  metadata: FlashSaleMetadata;
}
