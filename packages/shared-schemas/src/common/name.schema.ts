import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants';

export const NameSchema = z.object({
  firstName: z
    .string()
    .min(VALIDATION.NAME.MIN_LENGTH, 'First name is required')
    .max(VALIDATION.NAME.MAX_LENGTH, 'First name must not exceed 100 characters'),
  lastName: z
    .string()
    .min(VALIDATION.NAME.MIN_LENGTH, 'Last name is required')
    .max(VALIDATION.NAME.MAX_LENGTH, 'Last name must not exceed 100 characters'),
  middleName: z
    .string()
    .max(VALIDATION.NAME.MAX_LENGTH, 'Middle name must not exceed 100 characters')
    .optional(),
});
