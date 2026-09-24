import { z } from 'zod';

export const AttachFileRequestSchema = z.object({
  messageId: z.string().uuid(),
  url: z.string().url(),
  type: z.enum(['image', 'video', 'audio', 'document', 'archive', 'other']),
  size: z.number().int().positive(),
});

export type AttachFileRequestDTO = z.infer<typeof AttachFileRequestSchema>;
