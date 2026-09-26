import { z } from 'zod';

export const TrackKeywordRequestSchema = z.object({
  pageUrl: z.string().url(),
  keyword: z.string().min(1).max(100),
});

export type TrackKeywordRequestDTO = z.infer<typeof TrackKeywordRequestSchema>;
