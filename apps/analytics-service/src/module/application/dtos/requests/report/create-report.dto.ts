import { z } from 'zod';

const VALID_TYPES = [
  'overview', 'traffic', 'engagement', 'conversion',
  'retention', 'revenue', 'cohort', 'funnel', 'attribution', 'custom',
] as const;

const VALID_FORMATS = ['json', 'csv', 'xlsx', 'pdf', 'html'] as const;

export const CreateReportSchema = z
  .object({
    type: z.enum(VALID_TYPES),
    format: z.enum(VALID_FORMATS),
    ownerId: z.string().min(1).max(128),
  })
  .strict();

export type CreateReportDTO = z.infer<typeof CreateReportSchema>;
