import { FLASH_SALE_SCHEDULE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-schedule.constants';

export interface ScheduleInput {
  startDate: Date;
  endDate: Date;
  status: string;
  isActive: boolean;
}

export const validateSchedule = (
  schedule: Partial<ScheduleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!schedule.startDate) errors.push('Start date is required');
  if (!schedule.endDate) errors.push('End date is required');
  if (
    schedule.startDate &&
    schedule.endDate &&
    new Date(schedule.startDate) >= new Date(schedule.endDate)
  ) {
    errors.push('Start date must be before end date');
  }
  if (schedule.status && !Object.keys(FLASH_SALE_SCHEDULE.STATUS).includes(schedule.status)) {
    errors.push('Invalid schedule status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isScheduleValid = (schedule: ScheduleInput): boolean => {
  const now = new Date();
  return (
    now >= new Date(schedule.startDate) && now <= new Date(schedule.endDate) && schedule.isActive
  );
};
