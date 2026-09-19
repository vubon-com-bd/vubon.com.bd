import { z } from 'zod';

export const DeleteContactRequestSchema = z.object({
  contactId: z.string().min(1),
});

export type DeleteContactRequestDTO = z.infer<typeof DeleteContactRequestSchema>;
