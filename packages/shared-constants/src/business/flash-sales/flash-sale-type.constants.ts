import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const FLASH_SALE_TYPE = {
  ...COMMON_TYPES,
  DAILY_FLASH: 'daily_flash',
  WEEKLY_FLASH: 'weekly_flash',
  MONTHLY_FLASH: 'monthly_flash',
  HOLIDAY_SPECIAL: 'holiday_special',
  SEASONAL_SALE: 'seasonal_sale',
  MIDNIGHT_MADNESS: 'midnight_madness',
  HAPPY_HOUR: 'happy_hour',
  FESTIVAL_OFFER: 'festival_offer',
  CLEARANCE_SALE: 'clearance_sale',
  NEW_ARRIVAL: 'new_arrival',
} as const;
