import { z } from 'zod';

export const SetDefaultMethodRequestSchema = z.object({
  methodId: z.string().uuid(),
}).strict();

export type SetDefaultMethodRequestDTO = z.infer<typeof SetDefaultMethodRequestSchema>;
