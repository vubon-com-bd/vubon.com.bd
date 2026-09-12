import { NOTIFICATION_SCHEDULE } from '@vubon/shared-constants/src/platform/notification/notification-schedule.constants';

export interface PlatformScheduleInput {
  notificationId: string;
  status: string;
  type: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
}

export const validatePlatformSchedule = (
  schedule: Partial<PlatformScheduleInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!schedule.notificationId) errors.push('Notification ID is required');
  if (schedule.status && !Object.keys(NOTIFICATION_SCHEDULE.STATUS).includes(schedule.status)) {
    errors.push('Invalid schedule status');
  }
  if (schedule.type && !Object.keys(NOTIFICATION_SCHEDULE.TYPES).includes(schedule.type)) {
    errors.push('Invalid schedule type');
  }
  if (
    schedule.frequency &&
    !Object.keys(NOTIFICATION_SCHEDULE.FREQUENCIES).includes(schedule.frequency)
  ) {
    errors.push('Invalid frequency');
  }
  if (
    schedule.startDate &&
    schedule.endDate &&
    new Date(schedule.startDate) > new Date(schedule.endDate)
  ) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};
