/**
 * Flash Sale Schedule Types
 * ফ্ল্যাশ সেল সময়সূচী সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { SCHEDULE } from '@vubon/shared-constants';

export interface FlashSaleSchedule extends BaseEntity {
  flashSaleId: string;
  startDate: Date;
  endDate: Date;
  status: (typeof SCHEDULE.STATUS)[keyof typeof SCHEDULE.STATUS];
  type: (typeof SCHEDULE.TYPES)[keyof typeof SCHEDULE.TYPES];
  priority: (typeof SCHEDULE.PRIORITY)[keyof typeof SCHEDULE.PRIORITY];
  interval?: number;
  dayOfWeek?: number[];
  dayOfMonth?: number[];
  monthOfYear?: number[];
  timezone: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleScheduleCreateInput {
  flashSaleId: string;
  startDate: Date;
  endDate: Date;
  type: (typeof SCHEDULE.TYPES)[keyof typeof SCHEDULE.TYPES];
  priority?: (typeof SCHEDULE.PRIORITY)[keyof typeof SCHEDULE.PRIORITY];
  interval?: number;
  dayOfWeek?: number[];
  dayOfMonth?: number[];
  monthOfYear?: number[];
  timezone?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleScheduleUpdateInput {
  startDate?: Date;
  endDate?: Date;
  status?: (typeof SCHEDULE.STATUS)[keyof typeof SCHEDULE.STATUS];
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleScheduleResponse {
  flashSaleSchedule: FlashSaleSchedule;
}
