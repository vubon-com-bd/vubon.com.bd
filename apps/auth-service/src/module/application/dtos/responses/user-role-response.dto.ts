import { z } from 'zod';
import { UserRoleListSchema } from '@vubon/shared-schemas/user';

export type UserRoleResponseDTO = z.infer<typeof UserRoleListSchema>;
