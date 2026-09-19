/**
 * Support Schedule Types
 * @module shared-types/support
 */

import type { UserId } from '../common/primitives';

export type ScheduleDayOfWeek =
  'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface SupportSchedule {
  readonly id: string;
  readonly userId?: UserId;
  readonly teamId?: string;
  readonly timezone: string;
  readonly shifts: readonly SupportShift[];
  readonly isActive: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

export interface SupportShift {
  readonly dayOfWeek: ScheduleDayOfWeek;
  readonly startHour: number;
  readonly startMinute: number;
  readonly endHour: number;
  readonly endMinute: number;
  readonly isBreak: boolean;
  readonly breakStartHour?: number;
  readonly breakStartMinute?: number;
  readonly breakEndHour?: number;
  readonly breakEndMinute?: number;
}

export interface SupportAvailability {
  readonly userId: UserId;
  readonly isWithinSchedule: boolean;
  readonly nextShiftStart?: string;
  readonly nextShiftEnd?: string;
  readonly checkedAt: string;
}
