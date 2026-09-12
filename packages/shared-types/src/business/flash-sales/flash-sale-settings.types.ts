import { BaseEntity } from '../../common/base.types';

export interface FlashSaleSettingsValues {
  maxFlashSales: number;
  maxProductsPerFlashSale: number;
  maxDiscountPercentage: number;
  minDiscountPercentage: number;
  defaultDurationHours: number;
  maxDurationHours: number;
  enableWishlist: boolean;
  enableSharing: boolean;
  enableNotifications: boolean;
  autoPublish: boolean;
  notificationChannels: string[];
}

export interface FlashSaleSettings extends BaseEntity {
  settingsId: string;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
