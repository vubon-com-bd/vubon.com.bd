import { z } from 'zod';

export const FileComplaintRequestSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1).max(50),
  severity: z.string().min(1).max(50),
  content: z.string().min(1).max(5000),
});

export type FileComplaintRequestDTO = z.infer<typeof FileComplaintRequestSchema>;
