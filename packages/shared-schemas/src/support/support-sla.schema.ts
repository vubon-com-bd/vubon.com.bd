/**
 * Support SLA Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-sla.constants থেকে।
 */

import { z } from 'zod';
import { SUPPORT_SLA_STATUS, SUPPORT_SLA_METRIC } from '@vubon/shared-constants/support';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { TicketPrioritySchema } from './ticket-priority.schema';

export const SupportSlaStatusSchema = z.enum(
  Object.values(SUPPORT_SLA_STATUS) as [string, ...string[]]
);

export const SupportSlaMetricSchema = z.enum(
  Object.values(SUPPORT_SLA_METRIC) as [string, ...string[]]
);

export const SupportSlaSchema = z.object({
  ticketId: UuidSchema,
  metric: SupportSlaMetricSchema,
  targetMinutes: z.number().int().positive(),
  actualMinutes: z.number().int().nonnegative().optional(),
  status: SupportSlaStatusSchema,
  dueAt: z.string().datetime(),
  metAt: z.string().datetime().optional(),
  breachedAt: z.string().datetime().optional(),
  remainingMinutes: z.number().int().optional(),
  warningThresholdPercent: z.number().min(0).max(100).optional(),
});

export const SupportSlaPolicySchema = z.object({
  priority: TicketPrioritySchema,
  firstResponseMinutes: z.number().int().positive(),
  resolutionMinutes: z.number().int().positive(),
  businessHoursOnly: z.boolean(),
  timezone: z.string().min(1).max(64),
  isActive: z.boolean(),
});

export const SupportSlaBreachSchema = z.object({
  ticketId: UuidSchema,
  metric: SupportSlaMetricSchema,
  targetMinutes: z.number().int().positive(),
  actualMinutes: z.number().int().nonnegative(),
  breachMinutes: z.number().int().nonnegative(),
  breachedAt: z.string().datetime(),
});

export type SupportSlaStatusSchemaType = z.infer<typeof SupportSlaStatusSchema>;
export type SupportSlaMetricSchemaType = z.infer<typeof SupportSlaMetricSchema>;
export type SupportSlaSchemaType = z.infer<typeof SupportSlaSchema>;
export type SupportSlaPolicySchemaType = z.infer<typeof SupportSlaPolicySchema>;
export type SupportSlaBreachSchemaType = z.infer<typeof SupportSlaBreachSchema>;
