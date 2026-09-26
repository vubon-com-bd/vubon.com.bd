import { z } from 'zod';

export const SendDigestSchema = z.object({
  digestId: z.string().uuid(),
});

export type SendDigestRequestDTO = z.infer<typeof SendDigestSchema>;
