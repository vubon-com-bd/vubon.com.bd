/**
 * Update Dashboard Request DTO
 * @module analytics-service/application/dtos/requests/dashboard
 */
import { z } from 'zod';
import { ANALYTICS_DASHBOARD_LAYOUT } from '@vubon/shared-constants/platform/analytics';

const LayoutEnum = z.enum(
  Object.values(ANALYTICS_DASHBOARD_LAYOUT) as [string, ...string[]]
);

export const UpdateDashboardSchema = z
  .object({
    name: z.string().min(3).max(150).optional(),
    layout: LayoutEnum.optional(),
    description: z.string().max(500).optional(),
    isPublic: z.boolean().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateDashboardDto = z.input<typeof UpdateDashboardSchema>;
