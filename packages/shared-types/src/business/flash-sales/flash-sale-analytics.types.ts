import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_ANALYTICS } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-analytics.constants';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleAnalytics extends BaseEntity {
  analyticsId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  type: keyof typeof FLASH_SALE_ANALYTICS.TYPES | string;
  metric: keyof typeof FLASH_SALE_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof FLASH_SALE_ANALYTICS.ANALYTICS_TIME_FRAMES | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
