import { z } from 'zod';

const VALID_LAYOUTS = ['grid', 'masonry', 'flex', 'freeform'] as const;

export const UpdateDashboardSchema = z
  .object({
    dashboardId: z.string().min(1).max(128),
    name: z.string().min(2).max(150).optional(),
    layout: z.enum(VALID_LAYOUTS).optional(),
  })
  .strict()
  .refine((d) => d.name !== undefined || d.layout !== undefined, 'At least one field required');

export type UpdateDashboardDTO = z.infer<typeof UpdateDashboardSchema>;
