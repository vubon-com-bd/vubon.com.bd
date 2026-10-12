/**
 * Create Dashboard Request DTO
 * @module analytics-service/application/dtos/requests/dashboard
 */
import { z } from 'zod';
import { ANALYTICS_DASHBOARD_LAYOUT } from '@vubon/shared-constants/platform/analytics';

const LayoutEnum = z.enum(
  Object.values(ANALYTICS_DASHBOARD_LAYOUT) as [string, ...string[]]
);

export const CreateDashboardSchema = z.object({
  name: z.string().min(3).max(150),
  layout: LayoutEnum,
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false),
  tags: z.array(z.string().min(1).max(50)).max(20).optional(),
});

export type CreateDashboardDto = z.input<typeof CreateDashboardSchema>;
