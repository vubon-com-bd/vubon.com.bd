import { z } from 'zod';
import { UserRoleSchema } from '@vubon/shared-schemas/user';

export const RevokeRoleRequestSchema = z.object({
  userId: z.string().min(1),
  role: UserRoleSchema,
});

export type RevokeRoleRequestDTO = z.infer<typeof RevokeRoleRequestSchema>;
