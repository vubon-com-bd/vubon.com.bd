import { z } from 'zod';
import { UserPermissionListSchema } from '@vubon/shared-schemas/user';

export type UserPermissionResponseDTO = z.infer<typeof UserPermissionListSchema>;
