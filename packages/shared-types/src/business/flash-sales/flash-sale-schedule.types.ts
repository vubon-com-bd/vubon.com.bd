import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_SCHEDULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-schedule.constants';
import { FlashSale } from './flash-sale.types';

export interface FlashSaleSchedule extends BaseEntity {
  scheduleId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  status: keyof typeof FLASH_SALE_SCHEDULE.STATUS | string;
  type: keyof typeof FLASH_SALE_SCHEDULE.SCHEDULE_TYPES | string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  recurrenceRule?: string;
  isRecurring: boolean;
  isActive: boolean;
  isExpired: boolean;
  metadata: Record<string, unknown>;
}
