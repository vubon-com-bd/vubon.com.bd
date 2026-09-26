import { z } from 'zod';

export const GetSessionSchema = z
  .object({
    sessionId: z.string().min(1).max(128),
  })
  .strict();

export type GetSessionDTO = z.infer<typeof GetSessionSchema>;
