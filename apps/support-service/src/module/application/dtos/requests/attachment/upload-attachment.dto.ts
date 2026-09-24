import { z } from 'zod';

export const UploadAttachmentRequestSchema = z.object({
  ticketId: z.string().uuid().optional(),
  messageId: z.string().uuid().optional(),
  type: z.enum(['image', 'video', 'audio', 'document', 'archive', 'other']),
  url: z.string().url(),
  size: z.number().int().positive().max(100 * 1024 * 1024),
});

export type UploadAttachmentRequestDTO = z.infer<typeof UploadAttachmentRequestSchema>;
