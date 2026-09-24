import { z } from 'zod';

const VALID_LAYOUTS = ['grid', 'masonry', 'flex', 'freeform'] as const;

export const CreateDashboardSchema = z
  .object({
    name: z.string().min(2).max(150),
    layout: z.enum(VALID_LAYOUTS).optional().default('grid'),
    ownerId: z.string().min(1).max(128),
  })
  .strict();

export type CreateDashboardDTO = z.infer<typeof CreateDashboardSchema>;
