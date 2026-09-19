import { z } from 'zod';
import { UserPermissionSchema } from '@vubon/shared-schemas/user';

export const AssignPermissionRequestSchema = z.object({
  userId: z.string().min(1),
  permission: UserPermissionSchema,
});

export type AssignPermissionRequestDTO = z.infer<typeof AssignPermissionRequestSchema>;
