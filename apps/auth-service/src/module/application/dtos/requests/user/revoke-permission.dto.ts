import { z } from 'zod';
import { UserPermissionSchema } from '@vubon/shared-schemas/user';

export const RevokePermissionRequestSchema = z.object({
  userId: z.string().min(1),
  permission: UserPermissionSchema,
});

export type RevokePermissionRequestDTO = z.infer<typeof RevokePermissionRequestSchema>;
