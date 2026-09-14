/**
 * Support Schedule Schema
 * @module shared-schemas/support
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const ScheduleDayOfWeekSchema = z.enum([
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]);

export const SupportShiftSchema = z.object({
  dayOfWeek: ScheduleDayOfWeekSchema,
  startHour: z.number().int().min(0).max(23),
  startMinute: z.number().int().min(0).max(59),
  endHour: z.number().int().min(0).max(23),
  endMinute: z.number().int().min(0).max(59),
  isBreak: z.boolean(),
  breakStartHour: z.number().int().min(0).max(23).optional(),
  breakStartMinute: z.number().int().min(0).max(59).optional(),
  breakEndHour: z.number().int().min(0).max(23).optional(),
  breakEndMinute: z.number().int().min(0).max(59).optional(),
});

export const SupportScheduleSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema.optional(),
  teamId: UuidSchema.optional(),
  timezone: z.string().min(1).max(64),
  shifts: z.array(SupportShiftSchema).max(50),
  isActive: z.boolean(),
  effectiveFrom: z.string().datetime(),
  effectiveTo: z.string().datetime().optional(),
});

export const SupportAvailabilitySchema = z.object({
  userId: UuidSchema,
  isWithinSchedule: z.boolean(),
  nextShiftStart: z.string().datetime().optional(),
  nextShiftEnd: z.string().datetime().optional(),
  checkedAt: z.string().datetime(),
});

export type SupportScheduleSchemaType = z.infer<typeof SupportScheduleSchema>;
export type SupportAvailabilitySchemaType = z.infer<typeof SupportAvailabilitySchema>;
