import { z } from 'zod';
import { AccountLockoutSchema } from '@vubon/shared-schemas/auth';

export type AuthAccountLockResponseDTO = z.infer<typeof AccountLockoutSchema>;
