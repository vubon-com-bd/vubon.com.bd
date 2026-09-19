import { z } from 'zod';
import { UserRoleSchema } from '@vubon/shared-schemas/user';

export const AssignRoleRequestSchema = z.object({
  userId: z.string().min(1),
  role: UserRoleSchema,
});

export type AssignRoleRequestDTO = z.infer<typeof AssignRoleRequestSchema>;
