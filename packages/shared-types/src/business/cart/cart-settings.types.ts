import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';

export interface CartSettingsValues {
  maxItems: number;
  minOrderAmount: Money;
  maxOrderAmount: Money;
  cartExpiryHours: number;
  abandonedCartReminderHours: number;
  maxReminders: number;
  couponMaxPerCart: number;
  enableGuestCart: boolean;
  enableSavedForLater: boolean;
  enableWishlist: boolean;
  autoMergeGuestCart: boolean;
  currency: string;
}

export interface CartSettings extends BaseEntity {
  settingsId: string;
  key: string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
